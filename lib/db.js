import { MongoClient, ServerApiVersion } from "mongodb";
/* fyi, credentials are read-only just for a specific db/collection */

export async function connectToDatabase() {
  const client = new MongoClient(process.env.MONGODB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverApi: ServerApiVersion.v1,
  });
  const connection = await client.connect();
  return connection;
}
