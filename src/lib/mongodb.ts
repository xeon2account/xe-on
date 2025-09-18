import { MongoClient, ServerApiVersion } from 'mongodb';

if (!process.env.MONGODB_URI) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
}
if (!process.env.DB_NAME) {
  throw new Error('Invalid/Missing environment variable: "DB_NAME"');
}

const uri = process.env.MONGODB_URI;
const dbName = process.env.DB_NAME;

let client: MongoClient;

export async function connectToDatabase() {
    if (client) {
        return { client, db: client.db(dbName) };
    }
    client = new MongoClient(uri, {
        serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
        }
    });
    await client.connect();
    return { client, db: client.db(dbName) };
}
