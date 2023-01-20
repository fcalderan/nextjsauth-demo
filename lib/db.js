import { MongoClient, ServerApiVersion } from "mongodb";
/* fyi, credentials are read-only just for a specific db/collection */

export async function connectToDatabase() {
  const client = new MongoClient(
    "mongodb+srv://nextjs:nextjs@cluster0.tcembrn.mongodb.net/",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverApi: ServerApiVersion.v1,
    }
  );
  const connection = await client.connect();
  return connection;
}
