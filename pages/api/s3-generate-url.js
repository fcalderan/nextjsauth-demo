import { generateTemporaryUrl } from "next-s3-upload";

export default async function GenerateTemporaryUrlHandler(req, res) {
  const key = req.query.key;
  const S3TempUrl = await generateTemporaryUrl(key);

  res.status(200).json({ S3TempUrl });
}
