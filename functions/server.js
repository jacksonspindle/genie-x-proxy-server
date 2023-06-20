// import axios from "axios";
const fs = require("fs");

exports.handler = async (event, context) => {
  const headers = {
    "Access-Control-Allow-Origin":
      "https://main--stirring-dusk-267740.netlify.app",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
  };

  console.log(event);

  if (event.httpMethod === "OPTIONS") {
    // Handle OPTIONS request by returning appropriate response headers
    return {
      statusCode: 200,
      headers,
      body: "",
    };
  } else if (event.httpMethod === "POST") {
    // Handle POST request to save the image
    try {
      const requestBody = JSON.parse(event.body);
      const imageData = requestBody.imageData;

      // Process and save the image
      // ...

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ success: true, imageData }),
      };
    } catch (error) {
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: "Error while processing the image" }),
      };
    }
  } else if (event.httpMethod === "GET") {
    // Handle GET request to retrieve the image
    try {
      const imageFilePath = "path/to/your/saved/image.jpg"; // Replace with the actual file path
      const imageBuffer = fs.readFileSync(imageFilePath);
      const base64ImageData = imageBuffer.toString("base64");

      return {
        statusCode: 200,
        headers: { ...headers, "Content-Type": "image/jpeg" },
        body: base64ImageData,
        isBase64Encoded: true,
      };
    } catch (error) {
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: "Error while retrieving the image" }),
      };
    }
  }

  // Handle unsupported HTTP methods
  return {
    statusCode: 400,
    headers,
    body: JSON.stringify({ error: "Unsupported HTTP method" }),
  };
};
