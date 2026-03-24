import getDbClient from '@/lib/mongodb';
import { ObjectId } from 'mongodb';
import { Product } from '@/types/product';

const COLLECTION = 'products';

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

// Get all products
export async function getAllProducts() {
    const collection = await getCollection();
    return collection.find({}).toArray();
}

// Get all products by seller ID
export async function getAllProductsBySellerId(id: string) {
    const collection = await getCollection();
    return collection.find({ sellerId: new ObjectId(id) }).toArray();
}

// Get single product by ID
export async function findProductById(id: string) {
    const collection = await getCollection();
    return collection.findOne({ _id: new ObjectId(id) });
}

// Create new product
export async function createProduct(props: Omit<Product, '_id' | 'createdAt' | 'updatedAt'>): Promise<Product> {
    const product: Product = {
        ...props,
        createdAt: new Date(),
        updatedAt: new Date(),
    }
    const collection = await getCollection();
    const result = await collection.insertOne(product);
    return { _id: result.insertedId, ...product };
}

// Update product
export async function updateProduct(id: string, props: Partial<Product>): Promise<boolean> {
    const collection = await getCollection();
    const result = await collection.updateOne(
        { _id: new ObjectId(id) },
        {
            $set: {
                ...props,
                updatedAt: new Date(),
            }
        }
    )
    return result.modifiedCount > 0;
}

// Delete product by ID
export async function deleteProductById(id: string): Promise<boolean> {
    const collection = await getCollection();
    const result = await collection.deleteOne({ _id: new ObjectId(id) });
    return result.deletedCount > 0;
}
