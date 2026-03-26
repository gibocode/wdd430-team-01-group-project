import getDatabase from "@/lib/mongodb";

// Test connection
export async function GET() {

    const database = await getDatabase();
    const db = database?.db('handcrafted_haven');
    const users = await db?.collection('users').find({}).toArray();

    return Response.json(users);
}
