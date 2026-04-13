import fs from "fs";
import path from "path";
import { MongoClient, ObjectId } from "mongodb";

function loadEnvFile() {
  const envPath = path.resolve(process.cwd(), ".env");

  if (!fs.existsSync(envPath)) {
    throw new Error(`.env file not found at ${envPath}`);
  }

  const envText = fs.readFileSync(envPath, "utf8");

  for (const rawLine of envText.split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line || line.startsWith("#")) continue;

    const eqIndex = line.indexOf("=");
    if (eqIndex === -1) continue;

    const key = line.slice(0, eqIndex).trim();
    const value = line.slice(eqIndex + 1).trim();

    if (!(key in process.env)) {
      process.env[key] = value;
    }
  }
}

loadEnvFile();

type UserDoc = {
  _id: ObjectId;
  name?: string;
  email?: string;
  password?: string;
  createdAt?: Date;
  updatedAt?: Date;
};

type SellerDoc = {
  _id: ObjectId;
  sellerId?: ObjectId;
  sellerName?: string;
  shopName?: string;
  tagline?: string;
  story?: string;
  profileUrl?: string;
  isDemo?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
};

type ProductDoc = {
  _id: ObjectId;
  sellerId?: ObjectId;
  title?: string;
  image?: string;
  description?: string;
  price?: number;
  createdAt?: Date;
  updatedAt?: Date;
};

type ReviewDoc = {
  _id: ObjectId;
  productId?: ObjectId;
  reviewer?: string;
  rating?: number;
  comment?: string;
  createdAt?: Date;
  updatedAt?: Date;
};

function isBlank(value: unknown): boolean {
  return typeof value !== "string" || value.trim() === "";
}

function isValidDate(value: unknown): boolean {
  return value instanceof Date && !Number.isNaN(value.getTime());
}

async function main() {
  const uri = process.env.MONGODB_URI;
  const dbName = process.env.MONGODB_DB;

  if (!uri) throw new Error("Missing MONGODB_URI in environment.");
  if (!dbName) throw new Error("Missing MONGODB_DB in environment.");

  const client = new MongoClient(uri);

  try {
    await client.connect();

    const db = client.db(dbName);
    const users = db.collection<UserDoc>("users");
    const sellers = db.collection<SellerDoc>("sellers");
    const products = db.collection<ProductDoc>("products");
    const reviews = db.collection<ReviewDoc>("reviews");

    const userDocs = await users.find({}).toArray();
    const sellerDocs = await sellers.find({}).toArray();
    const productDocs = await products.find({}).toArray();
    const reviewDocs = await reviews.find({}).toArray();

    const userIdSet = new Set(userDocs.map((u) => u._id.toString()));
    const sellerIdSet = new Set(
      sellerDocs
        .filter((s) => s.sellerId instanceof ObjectId)
        .map((s) => s.sellerId!.toString()),
    );
    const productIdSet = new Set(productDocs.map((p) => p._id.toString()));

    console.log("\n================ USERS AUDIT ================\n");

    const usersMissingFields = userDocs
      .map((user) => {
        const missing: string[] = [];

        if (isBlank(user.name)) missing.push("name");
        if (isBlank(user.email)) missing.push("email");
        if (isBlank(user.password)) missing.push("password");
        if (!isValidDate(user.createdAt)) missing.push("createdAt");
        if (!isValidDate(user.updatedAt)) missing.push("updatedAt");

        return missing.length > 0
          ? {
              _id: user._id.toString(),
              email: user.email,
              missing,
            }
          : null;
      })
      .filter(Boolean);

    console.log("Users with missing/invalid required fields:");
    if (usersMissingFields.length === 0) {
      console.log("None found.");
    } else {
      console.log(usersMissingFields);
    }

    const emailCounts = new Map<string, string[]>();
    for (const user of userDocs) {
      if (!isBlank(user.email)) {
        const email = user.email!.trim().toLowerCase();
        const existing = emailCounts.get(email) ?? [];
        existing.push(user._id.toString());
        emailCounts.set(email, existing);
      }
    }

    const duplicateEmails = [...emailCounts.entries()]
      .filter(([, ids]) => ids.length > 1)
      .map(([email, ids]) => ({ email, ids }));

    console.log("\nUsers with duplicate emails:");
    if (duplicateEmails.length === 0) {
      console.log("None found.");
    } else {
      console.log(duplicateEmails);
    }

    console.log("\n================ SELLERS AUDIT ================\n");

    const sellersMissingFields = sellerDocs
      .map((seller) => {
        const missing: string[] = [];

        if (!(seller.sellerId instanceof ObjectId)) missing.push("sellerId");
        if (isBlank(seller.sellerName)) missing.push("sellerName");
        if (isBlank(seller.shopName)) missing.push("shopName");
        if (isBlank(seller.tagline)) missing.push("tagline");
        if (isBlank(seller.story)) missing.push("story");
        if (isBlank(seller.profileUrl)) missing.push("profileUrl");
        if (!isValidDate(seller.createdAt)) missing.push("createdAt");
        if (!isValidDate(seller.updatedAt)) missing.push("updatedAt");

        return missing.length > 0
          ? {
              _id: seller._id.toString(),
              sellerId: seller.sellerId?.toString(),
              sellerName: seller.sellerName,
              shopName: seller.shopName,
              missing,
            }
          : null;
      })
      .filter(Boolean);

    console.log("Sellers with missing/invalid required fields:");
    if (sellersMissingFields.length === 0) {
      console.log("None found.");
    } else {
      console.log(sellersMissingFields);
    }

    const sellerIdCounts = new Map<string, string[]>();
    for (const seller of sellerDocs) {
      if (seller.sellerId instanceof ObjectId) {
        const key = seller.sellerId.toString();
        const existing = sellerIdCounts.get(key) ?? [];
        existing.push(seller._id.toString());
        sellerIdCounts.set(key, existing);
      }
    }

    const duplicateSellerIds = [...sellerIdCounts.entries()]
      .filter(([, ids]) => ids.length > 1)
      .map(([sellerId, ids]) => ({
        sellerId,
        ids,
      }));

    console.log("\nSellers with duplicate sellerId:");
    if (duplicateSellerIds.length === 0) {
      console.log("None found.");
    } else {
      console.log(duplicateSellerIds);
    }

    const sellersWithoutMatchingUser = sellerDocs
      .filter((seller) => seller.sellerId instanceof ObjectId)
      .filter((seller) => !seller.isDemo)
      .filter((seller) => !userIdSet.has(seller.sellerId!.toString()))
      .map((seller) => ({
        _id: seller._id.toString(),
        sellerId: seller.sellerId!.toString(),
        sellerName: seller.sellerName,
        shopName: seller.shopName,
        isDemo: seller.isDemo ?? false,
      }));

    console.log("\nSellers with sellerId not found in users:");
    if (sellersWithoutMatchingUser.length === 0) {
      console.log("None found.");
    } else {
      console.log(sellersWithoutMatchingUser);
    }

    console.log("\n================ PRODUCTS AUDIT ================\n");

    const productsMissingFields = productDocs
      .map((product) => {
        const missing: string[] = [];

        if (!(product.sellerId instanceof ObjectId)) missing.push("sellerId");
        if (isBlank(product.title)) missing.push("title");
        if (isBlank(product.image)) missing.push("image");
        if (typeof product.price !== "number") missing.push("price");
        if (!isValidDate(product.createdAt)) missing.push("createdAt");
        if (!isValidDate(product.updatedAt)) missing.push("updatedAt");

        return missing.length > 0
          ? {
              _id: product._id.toString(),
              sellerId: product.sellerId?.toString(),
              title: product.title,
              missing,
            }
          : null;
      })
      .filter(Boolean);

    console.log("Products with missing/invalid required fields:");
    if (productsMissingFields.length === 0) {
      console.log("None found.");
    } else {
      console.log(productsMissingFields);
    }

    const productsWithBadPrice = productDocs
      .filter((product) => typeof product.price === "number")
      .filter((product) => product.price! < 0)
      .map((product) => ({
        _id: product._id.toString(),
        title: product.title,
        price: product.price,
      }));

    console.log("\nProducts with negative price:");
    if (productsWithBadPrice.length === 0) {
      console.log("None found.");
    } else {
      console.log(productsWithBadPrice);
    }

    const productsWithoutMatchingSeller = productDocs
      .filter((product) => product.sellerId instanceof ObjectId)
      .filter((product) => !sellerIdSet.has(product.sellerId!.toString()))
      .map((product) => ({
        _id: product._id.toString(),
        sellerId: product.sellerId!.toString(),
        title: product.title,
      }));

    console.log("\nProducts with sellerId not found in sellers.sellerId:");
    if (productsWithoutMatchingSeller.length === 0) {
      console.log("None found.");
    } else {
      console.log(productsWithoutMatchingSeller);
    }

    console.log("\n================ REVIEWS AUDIT ================\n");

    const reviewsMissingFields = reviewDocs
      .map((review) => {
        const missing: string[] = [];

        if (!(review.productId instanceof ObjectId)) missing.push("productId");
        if (typeof review.rating !== "number") missing.push("rating");
        if (isBlank(review.comment)) missing.push("comment");
        if (isBlank(review.reviewer)) missing.push("reviewer");
        if (!isValidDate(review.createdAt)) missing.push("createdAt");
        if (!isValidDate(review.updatedAt)) missing.push("updatedAt");

        return missing.length > 0
          ? {
              _id: review._id.toString(),
              productId: review.productId?.toString(),
              reviewer: review.reviewer,
              missing,
            }
          : null;
      })
      .filter(Boolean);

    console.log("Reviews with missing/invalid required fields:");
    if (reviewsMissingFields.length === 0) {
      console.log("None found.");
    } else {
      console.log(reviewsMissingFields);
    }

    const reviewsWithBadRating = reviewDocs
      .filter((review) => typeof review.rating === "number")
      .filter((review) => review.rating! < 1 || review.rating! > 5)
      .map((review) => ({
        _id: review._id.toString(),
        productId: review.productId?.toString(),
        reviewer: review.reviewer,
        rating: review.rating,
      }));

    console.log("\nReviews with rating outside 1-5:");
    if (reviewsWithBadRating.length === 0) {
      console.log("None found.");
    } else {
      console.log(reviewsWithBadRating);
    }

    const reviewsWithoutMatchingProduct = reviewDocs
      .filter((review) => review.productId instanceof ObjectId)
      .filter((review) => !productIdSet.has(review.productId!.toString()))
      .map((review) => ({
        _id: review._id.toString(),
        productId: review.productId!.toString(),
        reviewer: review.reviewer,
        rating: review.rating,
      }));

    console.log("\nReviews with productId not found in products:");
    if (reviewsWithoutMatchingProduct.length === 0) {
      console.log("None found.");
    } else {
      console.log(reviewsWithoutMatchingProduct);
    }

    console.log("\n================ AUDIT COMPLETE ================\n");
  } finally {
    await client.close();
  }
}

main().catch((error) => {
  console.error("Script failed:", error);
  process.exit(1);
});