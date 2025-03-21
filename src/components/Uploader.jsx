import { useDropzone } from "react-dropzone";
import Loader from "./notifications/Loader";
import { FiUploadCloud } from "react-icons/fi";
import { useCallback, useState } from "react";

// eslint-disable-next-line react/prop-types
const Uploader = ({ setImageUrl }) => {
  const [loading, setLoading] = useState(false);

  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await fetch("http://localhost:5000/api/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      return data.imageUrl; // Trả về URL ảnh từ server
    } catch (error) {
      console.error("Upload failed:", error);
      return null;
    }
  };

  const onDrop = useCallback(
    async (acceptedFiles) => {
      const file = acceptedFiles[0];

      if (file) {
        setLoading(true);
        const imageUrl = await uploadImage(file);
        if (imageUrl) {
          setImageUrl(imageUrl); // Lưu URL ảnh vào state
        }
        setLoading(false);
      }
    },
    [setImageUrl]
  );

  const { getRootProps, getInputProps, isDragActive, isDragReject } =
    useDropzone({
      multiple: false,
      onDrop,
      accept: "image/*",
    });

  return (
    <div className="w-full text-center flex flex-col items-center justify-center gap-6">
      {loading ? (
        <div className="px-6 w-full py-8 border-2 border-border border-dashed bg-main rounded-md cursor-pointer">
          <Loader />
        </div>
      ) : (
        <div
          {...getRootProps()}
          className="px-6 w-full pt-5 pb-6 border-3 border-border border-dashed bg-main rounded-md cursor-pointer"
        >
          <input {...getInputProps()} />
          <span className="mx-auto flex flex-col items-center justify-center text-subMain">
            <FiUploadCloud className="size-6" />
          </span>
          <p className="text-sm mt-2">Drag your image here:</p>
          <em className="text-xs text-border">
            {isDragActive
              ? "Drop the files here..."
              : isDragReject
              ? "Only png and jpg are accepted"
              : "images only"}
          </em>
        </div>
      )}
    </div>
  );
};

export default Uploader;
