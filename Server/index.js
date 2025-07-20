const express = require('express');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const cors = require('cors');
const { StatusCodes } = require('http-status-toolkit');
const { notFoundHandler, globalErrorHandler } = require('express-error-toolkit');
require('dotenv').config();

console.log(process.env.BASE_URL);

// setErrorOptions({
//   introLine: 'Error Happens: Even the best code can have issues.',
// })

// // setErrorOptions({
// //   introLine: false
// // })


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
app.post('/api/v1/upload', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(StatusCodes.BAD_REQUEST).json({ error: 'No file received' });
    }

    const fileBuffer = req.file.buffer;

    const stream = cloudinary.uploader.upload_stream(
      {
        resource_type: 'auto',
        folder: 'twineChat_firebase',
      },
      (error, result) => {
        if (error) {
          console.error('Cloudinary error:', error);
          return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Upload failed' });
        }
        return res.status(StatusCodes.OK).json({ url: result.secure_url });
      }
    );

    stream.end(fileBuffer);
  
    
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/', (req, res) => { 
  res.status(StatusCodes.OK).send(
    '<h1 style="display: flex; justify-content: center; align-items: center; min-height: 90vh">Welcome to the File Upload API</h1>'
  );
})

app.use(notFoundHandler);
app.use(globalErrorHandler)

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
