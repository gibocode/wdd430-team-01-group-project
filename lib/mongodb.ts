import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI || '';

let client: MongoClient;
let dbClient: Promise<MongoClient> | null = null;

export default function getDbClient() {

    if (!dbClient) {
        client = new MongoClient(uri);
        dbClient = client.connect();

        console.log('Database connected.');
    }

    return dbClient;
}
