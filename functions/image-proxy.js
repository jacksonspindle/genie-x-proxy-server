const express = require("express");
const axios = require("axios");

const app = express();

app.get("/download-image", async (req, res) => {
  const imageUrl = req.query.imageUrl;

  try {
    const response = await axios.get(imageUrl, { responseType: "arraybuffer" });
    const imageBuffer = Buffer.from(response.data, "binary");
    res.set("Content-Type", "image/jpeg");
    res.send(imageBuffer);
  } catch (error) {
    console.error("Error while downloading the image:", error);
    res.status(500).send("Error while downloading the image");
  }
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
