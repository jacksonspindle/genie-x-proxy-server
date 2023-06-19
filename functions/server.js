const axios = require("axios");
const fs = require("fs");
const path = require("path");

exports.handler = async (event) => {
  const { imageUrl } = event.queryStringParameters;

  const imagesDirectory = path.join(__dirname, "src", "assets");
  if (!fs.existsSync(imagesDirectory)) {
    fs.mkdirSync(imagesDirectory);
  }

  try {
    const imageResponse = await axios.get(imageUrl, { responseType: "stream" });

    const fileName = "downloaded-image.jpg";
    const filePath = path.join(imagesDirectory, fileName);

    const writeStream = fs.createWriteStream(filePath);
    imageResponse.data.pipe(writeStream);

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*", // Allow requests from any origin
        "Access-Control-Allow-Headers":
          "Origin, X-Requested-With, Content-Type, Accept",
      },
      body: JSON.stringify({
        success: true,
        message: "Image downloaded successfully.",
      }),
    };
  } catch (error) {
    console.error("Error while downloading the image:", error);
    return {
      statusCode: 500,
      headers: {
        "Access-Control-Allow-Origin": "*", // Allow requests from any origin
        "Access-Control-Allow-Headers":
          "Origin, X-Requested-With, Content-Type, Accept",
      },
      body: JSON.stringify({
        success: false,
        message: "Failed to download the image.",
      }),
    };
  }
};
