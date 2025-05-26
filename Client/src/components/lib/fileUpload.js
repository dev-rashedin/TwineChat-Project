const fileUpload = async (file) => {
  if (!file) {
    console.error('No avatar file selected');
    return;
  }

  const formData = new FormData();
  formData.append('file', file); // 🔑 match the multer field name

  try {
    const res = await fetch(import.meta.env.VITE_API_URL, {
      method: 'POST',
      body: formData,
    });

    const data = await res.json();

    if (res.ok) {
      console.log('File uploaded:', data.url); // Use this Cloudinary URL as needed
    } else {
      console.error('Upload failed:', data.error);
    }
  } catch (err) {
    console.error('Error uploading file:', err);
  }
};

export default fileUpload