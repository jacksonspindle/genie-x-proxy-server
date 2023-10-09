const axios = require("axios");

exports.handler = async function (event, context) {
  try {
    const imageUrl = event.queryStringParameters.imageUrl;
    const token = event.queryStringParameters.token;

    // Construct the image URL using the provided parameters
    let imageUrlWithToken = imageUrl;
    if (token && token !== "undefined") {
      imageUrlWithToken += `&token=${token}`;
    }

    console.log(imageUrlWithToken);
    console.log("event:", event);
    console.log("event raw url:", event.rawUrl);
    console.log("imageUrl", imageUrl);

    console.log("Fetching image from:", imageUrlWithToken);

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
        "Access-Control-Allow-Origin": "*",
      },
    };
  } catch (error) {
    console.error("Error fetching image:", error);

    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to download image" }),
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    };
  }
};
