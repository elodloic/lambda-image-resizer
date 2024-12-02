const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");

const putObject = async (bucket, key, body, region) => {
  const s3Client = new S3Client({ region });
  const putObjectParams = {
    Bucket: bucket,
    Key: key,
    Body: body,
    ContentType: "image/png", // Assuming PNG for the resized image
  };

  await s3Client.send(new PutObjectCommand(putObjectParams));
};

module.exports = { putObject };
