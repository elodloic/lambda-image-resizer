const { getObject } = require("./getObject");
const { putObject } = require("./putObject");
const { resizeImage } = require("./resizeImage");

exports.handler = async (event) => {
  try {
    // Read data from event object.
    const region = event.Records[0].awsRegion;
    const sourceBucket = event.Records[0].s3.bucket.name;
    const sourceKey = event.Records[0].s3.object.key;

    // Define the destination key
    const destinationKey = sourceKey.replace(
      "original-images/",
      "resized-images/"
    );

    // Retrieve the image from S3
    const imageBuffer = await getObject(sourceBucket, sourceKey, region);

    // Resize the image to 150x150 pixels
    const resizedImageBuffer = await resizeImage(imageBuffer, 150, 150);

    // Upload the resized image to the destination folder
    await putObject(sourceBucket, destinationKey, resizedImageBuffer, region);

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "Image resized successfully",
        key: destinationKey,
      }),
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Failed to resize image",
        error: error.message,
      }),
    };
  }
};
