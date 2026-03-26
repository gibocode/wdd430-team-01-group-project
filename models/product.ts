import getDatabase from '@/lib/mongodb';
import { Product } from '@/types/product';
import { validateId } from '@/lib/utils';

const COLLECTION = 'products';

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
    const sellerId = validateId(id);
    const collection = await getCollection();
    return collection.find({ sellerId: sellerId }).toArray();
}

// Get single product by ID
export async function findProductById(id: string) {
    const _id = validateId(id);
    const collection = await getCollection();
    return collection.findOne({ _id: _id });
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
export async function updateProduct(id: string, props: Omit<Product, '_id' | 'createdAt' | 'updatedAt'>): Promise<boolean> {
    const _id = validateId(id);
    const collection = await getCollection();
    const result = await collection.updateOne(
        { _id: _id },
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
    const _id = validateId(id);
    const collection = await getCollection();
    const result = await collection.deleteOne({ _id: _id });
    return result.deletedCount > 0;
}
