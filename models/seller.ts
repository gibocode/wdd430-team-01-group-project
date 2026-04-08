import getDatabase from "@/lib/mongodb";
import { Seller } from "@/types/seller";
import { validateId } from "@/lib/utils";

const COLLECTION = "sellers";

// Get database collection
const getCollection = async () => {
  const db = await getDatabase();
  return db.collection(COLLECTION);
};

// Get all sellers
export async function getAllSellers() {
  const collection = await getCollection();
  return collection.find({}).toArray();
}

// Get single seller by ID
export async function findSellerById(id: string) {
  const _id = validateId(id);
  const collection = await getCollection();
  return collection.findOne({ sellerId: _id });
}

// Create new seller
export async function createSeller(
  props: Omit<Seller, "createdAt" | "updatedAt">,
): Promise<Seller> {
  const seller: Seller = {
    ...props,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  const collection = await getCollection();
  await collection.insertOne(seller);
  return seller;
}

// Update seller info
export async function updateSellerInfo(
  id: string,
  props: Partial<Seller>,
): Promise<boolean> {
  const _id = validateId(id);
  const collection = await getCollection();
  const result = await collection.updateOne(
    { sellerId: _id },
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
  const _id = validateId(id);
  const collection = await getCollection();
  const result = await collection.deleteOne({ sellerId: _id });
  return result.deletedCount > 0;
}
