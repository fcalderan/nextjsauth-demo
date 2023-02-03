import { connectToMongoDB } from "../../../lib/db";
import { hashPassword } from "../../../lib/auth";

async function handler(req, res) {
  if (req.method !== "POST") {
    return;
  }

  const data = req.body;

  const { email, password, key } = data;

  if (!email || !email.includes("@") || !password) {
    res.status(422).json({
      message: "validation error",
    });
    return;
  }

  const client = await connectToMongoDB();
  const db = client.db("nextjs");

  const existingUser = await db.collection("users").findOne({
    email: { $eq: email },
  });
  if (existingUser) {
    client.close();
    res.status(422).json({ message: "User already exists" });
    return;
  }

  const hashedPassword = await hashPassword(password);
  const result = await db.collection("users").insertOne({
    email: email,
    password: hashedPassword,
    s3key: key,
    writepermission: "0",
  });

  client.close();

  res.status(201).json({ message: "User created" });
}

export default handler;
