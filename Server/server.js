const express = require('express');
const cors = require('cors');
require('dotenv').config();
const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors());


// basic route to check server status
app.get('/', (req, res) => {
  res.send(
    '<h1 style="display: flex; justify-content: center; align-items: center; min-height: 90vh">Welcome to the File Upload API</h1>'
  );
});


// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
