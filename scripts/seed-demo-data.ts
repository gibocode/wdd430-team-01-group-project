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

async function main() {
  const uri = process.env.MONGODB_URI;
  const dbName = process.env.MONGODB_DB;

  if (!uri) throw new Error("Missing MONGODB_URI");
  if (!dbName) throw new Error("Missing MONGODB_DB");

  const client = new MongoClient(uri);

  try {
    await client.connect();

    const db = client.db(dbName);
    const sellers = db.collection("sellers");
    const products = db.collection("products");
    const reviews = db.collection("reviews");

    const now = new Date();

    // Seller IDs (must match products)
    const aliceId = new ObjectId("69c2bf249937fc4d71971683");
    const davidId = new ObjectId("69c2bf249937fc4d71971684");
    const evaId = new ObjectId("69c2bf249937fc4d71971685");

    // Remove broken + legacy sellers
    await sellers.deleteMany({
      _id: {
        $in: [
          new ObjectId("69c2bf249937fc4d71971802"),
          new ObjectId("69c2bf249937fc4d71971801"),
          new ObjectId("69c2bf249937fc4d71971803"),
          new ObjectId("69c2bf249937fc4d71971804"),
          new ObjectId("69c2bf249937fc4d71971805"),
        ],
      },
    });

    // Remove any sellers using demo IDs
    await sellers.deleteMany({
      sellerId: { $in: [aliceId, davidId, evaId] },
    });

    // Insert clean demo sellers
    await sellers.insertMany([
      {
        sellerId: aliceId,
        sellerName: "Alice Handcrafts",
        shopName: "Alice Bamboo Creations",
        tagline: "Eco-friendly handcrafted bamboo products",
        story: "Handmade bamboo home goods.",
        profileUrl: "/placeholder.svg",
        isDemo: true,
        createdAt: now,
        updatedAt: now,
      },
      {
        sellerId: davidId,
        sellerName: "David Maker",
        shopName: "David's Woodworks",
        tagline: "Hand-carved wooden tools and decor",
        story: "Traditional handcrafted wood products.",
        profileUrl: "/placeholder.svg",
        isDemo: true,
        createdAt: now,
        updatedAt: now,
      },
      {
        sellerId: evaId,
        sellerName: "Eva Studio",
        shopName: "Eva Handmade Jewelry",
        tagline: "Unique handcrafted jewelry pieces",
        story: "Nature-inspired jewelry.",
        profileUrl: "/placeholder.svg",
        isDemo: true,
        createdAt: now,
        updatedAt: now,
      },
    ]);

    // Remove old demo products
    await products.deleteMany({
      _id: {
        $in: [
          new ObjectId("69c2bf249937fc4d71971690"),
          new ObjectId("69c2bf249937fc4d71971691"),
          new ObjectId("69c2bf249937fc4d71971692"),
          new ObjectId("69c2bf249937fc4d71971693"),
          new ObjectId("69c2bf249937fc4d71971694"),
          new ObjectId("69c2bf249937fc4d71971695"),
          new ObjectId("69c2bf249937fc4d71971696"),
          new ObjectId("69c2bf249937fc4d71971697"),
          new ObjectId("69c2bf249937fc4d71971698"),
          new ObjectId("69c2bf249937fc4d71971699"),
        ],
      },
    });

    // Insert products (ALL with real images)
    await products.insertMany([
      {
        _id: new ObjectId("69c2bf249937fc4d71971690"),
        sellerId: aliceId,
        title: "Handwoven Bamboo Basket",
        image:
          "https://azure-implicit-magpie-652.mypinata.cloud/ipfs/bafkreifav4ymxepimlnsah7wtwruav5ztyt2oawocsuw52jxibxgpcbj34",
        description: "Eco-friendly basket.",
        price: 25,
        createdAt: now,
        updatedAt: now,
      },
      {
        _id: new ObjectId("69c2bf249937fc4d71971691"),
        sellerId: davidId,
        title: "Handcrafted Ceramic Mug",
        image:
          "https://azure-implicit-magpie-652.mypinata.cloud/ipfs/bafkreihyaaualbwqzc7udu7wphopkfgnz37w7sayry6qngluln6i52gjia",
        description: "Handmade mug.",
        price: 18,
        createdAt: now,
        updatedAt: now,
      },
      {
        _id: new ObjectId("69c2bf249937fc4d71971692"),
        sellerId: evaId,
        title: "Handmade Leather Journal",
        image:
          "https://azure-implicit-magpie-652.mypinata.cloud/ipfs/bafkreigyzfraski4awixxqmn4ti57kqowt4cv53hvrancl7wjs3fm64lri",
        description: "Premium journal.",
        price: 35,
        createdAt: now,
        updatedAt: now,
      },
      {
        _id: new ObjectId("69c2bf249937fc4d71971693"),
        sellerId: aliceId,
        title: "Hand-knitted Wool Scarf",
        image:
          "https://azure-implicit-magpie-652.mypinata.cloud/ipfs/bafkreifs4zbyuzpprd77wnodi4dg5jktpsqcaeos2nxplhctdfn5snxb2u",
        description: "Warm scarf.",
        price: 22,
        createdAt: now,
        updatedAt: now,
      },
      {
        _id: new ObjectId("69c2bf249937fc4d71971694"),
        sellerId: davidId,
        title: "Hand-carved Wooden Spoon Set",
        image:
          "https://azure-implicit-magpie-652.mypinata.cloud/ipfs/bafkreicsec72atx7jhp7bg6senbdg7ia3dkw3qz7gawdgzcyq4ya6groqe",
        description: "Wooden spoons.",
        price: 15,
        createdAt: now,
        updatedAt: now,
      },
      {
        _id: new ObjectId("69c2bf249937fc4d71971695"),
        sellerId: evaId,
        title: "Hand-painted Ceramic Vase",
        image:
          "https://azure-implicit-magpie-652.mypinata.cloud/ipfs/bafkreicianawvdmbm3dxb6ztxjwdony7urnmpiploo5iofxvtax4vcgsvm",
        description: "Decorative vase.",
        price: 40,
        createdAt: now,
        updatedAt: now,
      },
      {
        _id: new ObjectId("69c2bf249937fc4d71971696"),
        sellerId: aliceId,
        title: "Handwoven Cotton Tote Bag",
        image:
          "https://azure-implicit-magpie-652.mypinata.cloud/ipfs/bafybeia2zdbuwebwd75nqxytyxnnybzkyotdfxg3ak2sxkxfki4tkwmrae",
        description: "Reusable tote.",
        price: 20,
        createdAt: now,
        updatedAt: now,
      },
      {
        _id: new ObjectId("69c2bf249937fc4d71971697"),
        sellerId: davidId,
        title: "Hand-poured Soy Candle",
        image:
          "https://azure-implicit-magpie-652.mypinata.cloud/ipfs/bafkreiavjxfqkgmxg4hw74hfjubw3y2z7inmj5la6dy53t6grypg6z7cwi",
        description: "Scented candle.",
        price: 16,
        createdAt: now,
        updatedAt: now,
      },
      {
        _id: new ObjectId("69c2bf249937fc4d71971698"),
        sellerId: evaId,
        title: "Handcrafted Beaded Necklace",
        image:
          "https://azure-implicit-magpie-652.mypinata.cloud/ipfs/bafybeigabn5pto7u2ran4cgkeimegvlidp6kywnh4nmstfkuqmtzrvwyga",
        description: "Elegant necklace.",
        price: 30,
        createdAt: now,
        updatedAt: now,
      },
      {
        _id: new ObjectId("69c2bf249937fc4d71971699"),
        sellerId: aliceId,
        title: "Hand-carved Wooden Jewelry Box",
        image:
          "https://azure-implicit-magpie-652.mypinata.cloud/ipfs/bafybeiazgv2clph37pcxmkt3sgnlvagkntardnq3tsosvxnh42hvjbwmdi",
        description: "Wooden box.",
        price: 55,
        createdAt: now,
        updatedAt: now,
      },
    ]);

    // Clear and insert demo reviews
    await reviews.deleteMany({});
    await reviews.insertMany([
      {
        productId: new ObjectId("69c2bf249937fc4d71971690"),
        reviewer: "Emma",
        rating: 5,
        comment: "Excellent quality.",
        createdAt: now,
        updatedAt: now,
      },
      {
        productId: new ObjectId("69c2bf249937fc4d71971691"),
        reviewer: "Noah",
        rating: 4,
        comment: "Nice craftsmanship.",
        createdAt: now,
        updatedAt: now,
      },
    ]);

    console.log("\n=== DEMO DATA SEEDED SUCCESSFULLY ===\n");
  } finally {
    await client.close();
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
