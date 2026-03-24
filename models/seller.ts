import getDbClient from '@/lib/mongodb';
import { ObjectId } from 'mongodb';
import { Seller } from '@/types/seller';

const COLLECTION = 'sellers';

// Get database client
const getDatabase = async () => {
    const client = await getDbClient();
    return client.db(process.env.MONGODB_DB);
}

// Get database collection
const getCollection = async () => {
    const db = await getDatabase();
    return db.collection(COLLECTION);
}

// Get all sellers
export async function getAllSellers() {
    const collection = await getCollection();
    return collection.find({}).toArray();
}

// Get single seller by ID
export async function findSellerById(id: string) {
    const collection = await getCollection();
    return collection.findOne({ userId: new ObjectId(id) });
}

// Create new seller
export async function createSeller(props: Omit<Seller, 'createdAt' | 'updatedAt'>): Promise<Seller> {
    const seller: Seller = {
        ...props,
        createdAt: new Date(),
        updatedAt: new Date(),
    }
    const collection = await getCollection();
    await collection.insertOne(seller);
    return seller;
}

// Update seller info
export async function updateSellerInfo(id: string, props: Partial<Seller>): Promise<boolean> {
    const collection = await getCollection();
    const result = await collection.updateOne(
        { userId: new ObjectId(id) },
        {
            $set: {
                ...props,
                updatedAt: new Date(),
            }
        }
    )
    return result.modifiedCount > 0;
}

// Delete seller by ID
export async function deleteSellerById(id: string): Promise<boolean> {
    const collection = await getCollection();
    const result = await collection.deleteOne({ userId: new ObjectId(id) });
    return result.deletedCount > 0;
}
