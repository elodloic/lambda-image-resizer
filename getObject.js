const { S3Client, GetObjectCommand } = require("@aws-sdk/client-s3");
const { Readable } = require("stream");

const getObject = async (bucket, key, region) => {
  const s3Client = new S3Client({ region }); // Instantiate a new S3 client
  const getObjectParams = { Bucket: bucket, Key: key };

  const command = new GetObjectCommand(getObjectParams);
  const response = await s3Client.send(command);

  const chunks = [];
  for await (const chunk of Readable.from(response.Body)) {
    chunks.push(chunk);
  }

  return Buffer.concat(chunks);
};

module.exports = { getObject };
