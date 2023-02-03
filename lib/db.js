import { MongoClient, ServerApiVersion } from "mongodb";
import { createClient } from "contentful";

export async function connectToContentful() {
  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
  });

  const response = await client.getEntries({
    content_type: "user",
  });

  return response.items;
}

export async function connectToMongoDB() {
  const client = new MongoClient(process.env.MONGODB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverApi: ServerApiVersion.v1,
  });
  const connection = await client.connect();
  return connection;
}
