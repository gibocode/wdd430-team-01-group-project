import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;

let client: MongoClient;
let dbClient: Promise<MongoClient> | null = null;

const getDbClient = () => {
    if (!uri) {
        throw new Error('Database URI not set.');
    }
    if (!dbClient) {
        client = new MongoClient(uri);
        dbClient = client.connect();
        console.log('Database connected.');
    }
    return dbClient;
}

// Get database client
export default async function getDatabase() {
    const client = await getDbClient();
    const dbName = process.env.MONGODB_DB;
    if (!dbName) {
        throw new Error('Database not set.');
    }
    return client.db(dbName);
}
