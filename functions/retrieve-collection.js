const axios = require("axios");

exports.handler = async function (event, context) {
  console.log(event);
  // Handle preflight request
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 204,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Methods": "POST",
      },
    };
  }

  try {
    console.log("request made");
    const { urls } = JSON.parse(event.body);

    const base64Images = [];
    console.log(urls);

    for (const url of urls) {
      console.log("test");
      const response = await axios.get(url, {
        responseType: "arraybuffer",
      });

      const base64Image = Buffer.from(response.data, "binary").toString(
        "base64"
      );
      const imageData = `data:${response.headers["content-type"]};base64,${base64Image}`;

      base64Images.push(imageData);
    }

    console.log(base64Images);

    return {
      statusCode: 200,
      body: JSON.stringify({ base64Images }),
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST",
      },
    };
  } catch (error) {
    console.log("failed");
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to download images" }),
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST",
      },
    };
  }
};
