import getDbClient from '@/lib/mongodb';
import { ObjectId } from 'mongodb';
import { Review } from '@/types/review';

const COLLECTION = 'reviews';

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

// Get all reviews
export async function getAllReviews() {
    const collection = await getCollection();
    return collection.find({}).toArray();
}

// Get all reviews by product ID
export async function getAllReviewsByProductId(id: string) {
    const collection = await getCollection();
    return collection.find({ productId: new ObjectId(id) }).toArray();
}

// Get single review by ID
export async function findReviewById(id: string) {
    const collection = await getCollection();
    return collection.findOne({ _id: new ObjectId(id) });
}

// Create new review
export async function createReview(props: Omit<Review, '_id' | 'createdAt' | 'updatedAt'>): Promise<Review> {
    const review: Review = {
        ...props,
        createdAt: new Date(),
        updatedAt: new Date(),
    }
    const collection = await getCollection();
    const result = await collection.insertOne(review);
    return { _id: result.insertedId, ...review };
}

// Update review
export async function updateReview(id: string, props: Partial<Review>): Promise<boolean> {
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

// Delete review by ID
export async function deleteReviewById(id: string): Promise<boolean> {
    const collection = await getCollection();
    const result = await collection.deleteOne({ _id: new ObjectId(id) });
    return result.deletedCount > 0;
}
