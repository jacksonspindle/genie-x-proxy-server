const axios = require("axios");

exports.handler = async (event, context) => {
  try {
    const response = await axios.get(event); // Replace with the actual DALLE API endpoint

    const headers = {
      "Content-Type": "image/jpeg",
      "Access-Control-Allow-Origin": "*", // Adjust the CORS policy as needed
    };

    return {
      statusCode: 200,
      headers,
      body: response.data,
    };
  } catch (error) {
    console.error("Error retrieving image:", error);
    return {
      statusCode: 500,
      body: "Internal Server Error",
      headers: {
        "Access-Control-Allow-Origin": "*", // Adjust the CORS policy as needed
      },
    };
  }
};
