import axios from "axios";
import toast from "react-hot-toast";

const uploadImageService = async (file, setLoading, setImageUrl) => {
  try {
    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "movie-app"); // Thay "your_preset" bằng preset của bạn

    const { data } = await axios.post(
      "https://api.cloudinary.com/v1_1/quangdat/image/upload",
      formData
    );

    setLoading(false);
    setImageUrl(data.secure_url); // Lưu URL ảnh
    toast.success("Upload image successfully");
  } catch (error) {
    setLoading(false);
    toast.error("Upload failed: " + error.message);
  }
};

export default uploadImageService;
