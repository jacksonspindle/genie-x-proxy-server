import axios from "axios";

exports.handler = async (event, context) => {
  const headers = {
    "Access-Control-Allow-Origin":
      "https://main--stirring-dusk-267740.netlify.app",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
  };

  console.log(event);

  if (event.httpMethod === "OPTIONS") {
    // Handle OPTIONS request by returning appropriate response headers
    return {
      statusCode: 200,
      headers,
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
  }
};
