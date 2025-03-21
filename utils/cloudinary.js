export const uploadToCloudinary = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "movie-app");

  try {
    const response = await fetch(
      "https://api.cloudinary.com/v1_1/quangdat/image/upload",
      {
        method: "POST",
        body: formData,
      }
    );
    const data = await response.json();
    return data.secure_url; // Trả về link ảnh
  } catch (error) {
    console.error("Upload failed:", error);
    return null;
  }
};
