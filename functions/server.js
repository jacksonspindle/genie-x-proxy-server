const multer = require("multer");
const fs = require("fs");
const path = require("path");

// Create a storage engine for multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Set the destination folder for storing the uploaded files
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    // Generate a unique filename for the uploaded file
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

// Create the multer instance
const upload = multer({ storage });

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
    try {
      // Use the upload middleware to process the file upload
      await upload.single("image")(event, context);

      // Get the uploaded file object
      const uploadedFile = event.file;

      // Get the file path of the uploaded file
      const filePath = uploadedFile.path;

      // Read the uploaded file data
      const fileData = fs.readFileSync(filePath);

      // Remove the uploaded file from the server
      fs.unlinkSync(filePath);

      // Return the file data in the response
      return {
        statusCode: 200,
        headers: { ...headers, "Content-Type": "image/jpeg" },
        body: fileData.toString("base64"),
        isBase64Encoded: true,
      };
    } catch (error) {
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: "Error while processing the image" }),
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
