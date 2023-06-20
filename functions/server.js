const axios = require("axios");

exports.handler = async (event) => {
  try {
    console.log(event);
    const { imageData } = JSON.parse(event.body);
    const { imageUrl } = imageData;

    console.log("test");
    console.log(imageUrl);

    const imageResponse = await axios.get(imageUrl, { responseType: "stream" });

    // Process the image response and return it as a base64 string
    const imageBuffer = await new Promise((resolve, reject) => {
      const chunks = [];
      imageResponse.data.on("data", (chunk) => chunks.push(chunk));
      imageResponse.data.on("end", () => resolve(Buffer.concat(chunks)));
      imageResponse.data.on("error", (error) => reject(error));
    });

    const base64Image = imageBuffer.toString("base64");

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        success: true,
        image: base64Image,
      }),
    };
  } catch (error) {
    console.error("Error while processing the image:", error);
    return {
      statusCode: 500,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        success: false,
        message: "Failed to process the image.",
      }),
    };
  }
};
