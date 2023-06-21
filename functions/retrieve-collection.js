const axios = require("axios");

exports.handler = async function (event, context) {
  try {
    const { urls } = JSON.parse(event.body);

    const base64Images = [];

    for (const url of urls) {
      const response = await axios.get(url, {
        responseType: "arraybuffer",
      });

      const base64Image = Buffer.from(response.data, "binary").toString(
        "base64"
      );
      const imageData = `data:${response.headers["content-type"]};base64,${base64Image}`;

      base64Images.push(imageData);
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ base64Images }),
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "http://localhost:3000", // Replace with the URL of your local development environment
        "Access-Control-Allow-Methods": "POST",
      },
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to download images" }),
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "http://localhost:3000", // Replace with the URL of your local development environment
        "Access-Control-Allow-Methods": "POST",
      },
    };
  }
};
