const express = require('express');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Configure Multer
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Upload Route
app.post('/upload', upload.single('file'), async (req, res) => {
  try {
    const file = req.file;
    const result = await cloudinary.uploader
      .upload_stream({ resource_type: 'auto' }, (error, result) => {
        if (error) return res.status(500).json({ error: error.message });
        return res.status(200).json({ url: result.secure_url });
      })
      .end(file.buffer);
    
    console.log(result)
    
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
