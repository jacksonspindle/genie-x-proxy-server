const axios = require("axios");

exports.handler = async (event, context) => {
  try {
    // Retrieve image from DALLE API
    const response = await axios.get(event); // Use the event directly as the URL

    const headers = {
      "Content-Type": "image/jpeg",
      "Access-Control-Allow-Origin": "*", // Adjust the CORS policy as needed
      "Access-Control-Allow-Methods": "GET,OPTIONS", // Allow GET and OPTIONS requests
      "Access-Control-Allow-Headers": "Content-Type", // Allow the Content-Type header
    };

    // Download the image
    const imageData = response.data;

    // Send the image back to the frontend React app
    return {
      statusCode: 200,
      headers,
      body: imageData,
      isBase64Encoded: true,
    };
  } catch (error) {
    console.error("Error retrieving image:", error);
    return {
      statusCode: 500,
      body: "Internal Server Error",
      headers: {
        "Access-Control-Allow-Origin": "*", // Adjust the CORS policy as needed
        "Access-Control-Allow-Methods": "GET,OPTIONS", // Allow GET and OPTIONS requests
        "Access-Control-Allow-Headers": "Content-Type", // Allow the Content-Type header
      },
    };
  }
};
