const axios = require("axios");

exports.handler = async (event, context) => {
  if (event.httpMethod === "OPTIONS") {
    // Handle OPTIONS request by returning appropriate response headers
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin":
          "https://main--stirring-dusk-267740.netlify.app",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Methods": "POST",
      },
      body: "",
    };
  } else {
    // Handle other requests (POST) to save the image
    try {
      const requestBody = JSON.parse(event.body);
      const imageData = requestBody.imageData;

      // Process and save the image
      // ...

      return {
        statusCode: 200,
        body: JSON.stringify({ success: true }),
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: "Error while processing the image" }),
      };
    }
  }
};
