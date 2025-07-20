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
      return data.url;
    } else {
      console.error('Upload failed:', data.error);
      return Promise.reject(data);
    }
  } catch (err) {
    console.error('Error uploading file:', err);
  }
};

export default fileUpload