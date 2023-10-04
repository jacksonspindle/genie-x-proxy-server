const axios = require("axios");

exports.handler = async function (event, context) {
  try {
    const imageUrl = decodeURIComponent(event.queryStringParameters.imageUrl);
    const token = event.queryStringParameters.token; // Get the token parameter

    // Construct the image URL using the provided parameters
    const imageUrlWithToken = `${imageUrl}?alt=media&token=${token}`;

    console.log("Fetching image from:", imageUrlWithToken); // Log the URL being fetched

    const response = await axios.get(imageUrlWithToken, {
      responseType: "arraybuffer",
    });

    const base64Image = Buffer.from(response.data, "binary").toString("base64");
    const imageData = `data:${response.headers["content-type"]};base64,${base64Image}`;

    console.log("Image fetched successfully");

    return {
      statusCode: 200,
      body: JSON.stringify({ imageUrl: imageData }),
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*", // Allow cross-origin requests
      },
    };
  } catch (error) {
    console.error("Error fetching image:", error); // Log any errors

    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to download image" }),
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*", // Allow cross-origin requests
      },
    };
  }
};
