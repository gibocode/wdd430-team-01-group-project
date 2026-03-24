import getDbClient from '@/lib/mongodb';
import { ObjectId } from 'mongodb';
import { User } from '@/types/user';

const COLLECTION = 'users';

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

// Get all users
export async function getAllUsers() {
    const collection = await getCollection();
    return collection.find({}).toArray();
}

// Get single user by ID
export async function findUserById(id: string) {
    const collection = await getCollection();
    return collection.findOne({ _id: new ObjectId(id) });
}

// Get single user by email
export async function findUserByEmail(email: string) {
    const collection = await getCollection();
    return collection.findOne({ email: email });
}

// Create new user
export async function createUser(props: Omit<User, '_id' | 'createdAt' | 'updatedAt'>): Promise<User> {
    const user: User = {
        ...props,
        createdAt: new Date(),
        updatedAt: new Date(),
    }
    const collection = await getCollection();
    const result = await collection.insertOne(user);
    return { _id: result.insertedId, ...user };
}

// Update user
export async function updateUser(id: string, props: Partial<User>): Promise<boolean> {
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

// Delete user by ID
export async function deleteUserById(id: string): Promise<boolean> {
    const collection = await getCollection();
    const result = await collection.deleteOne({ _id: new ObjectId(id) });
    return result.deletedCount > 0;
}
