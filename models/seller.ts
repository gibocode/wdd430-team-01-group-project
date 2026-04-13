import getDatabase from "@/lib/mongodb";
import { Seller } from "@/types/seller";
import { validateId } from "@/lib/utils";
import { Collection } from "mongodb";

const COLLECTION = "sellers";

// Get database collection
const getCollection = async (): Promise<Collection<Seller>> => {
  const db = await getDatabase();
  return db.collection<Seller>(COLLECTION);
};

// Get all sellers
export async function getAllSellers() {
  const collection = await getCollection();
  return collection.find({}).toArray();
}

// Get single seller by ID
export async function findSellerById(id: string) {
  const sellerId = validateId(id);
  const collection = await getCollection();
  return collection.findOne({ sellerId });
}

// Create new seller
export async function createSeller(
  props: Omit<Seller, "createdAt" | "updatedAt">,
) {
  const seller: Seller = {
    ...props,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const collection = await getCollection();
  const result = await collection.insertOne(seller);

  return { _id: result.insertedId, ...seller };
}

// Update seller info
export async function updateSellerInfo(
  id: string,
  props: Partial<Seller>,
): Promise<boolean> {
  const sellerId = validateId(id);
  const collection = await getCollection();
  const result = await collection.updateOne(
    { sellerId },
    {
      $set: {
        ...props,
        updatedAt: new Date(),
      },
    },
  );
  return result.modifiedCount > 0;
}

// Delete seller by ID
export async function deleteSellerById(id: string): Promise<boolean> {
  const sellerId = validateId(id);
  const collection = await getCollection();
  const result = await collection.deleteOne({ sellerId });
  return result.deletedCount > 0;
}
