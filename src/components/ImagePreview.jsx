// eslint-disable-next-line react/prop-types
const ImagePreview = ({ image, name }) => {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="w-40 h-40 rounded-full p-2 flex items-center justify-center bg-gray-800 border border-gray-500">
        {image ? (
          <img
            src={image}
            alt={name}
            className="w-full h-full rounded-full object-cover"
          />
        ) : null}
      </div>
      <p className="mt-2 text-white">{name}</p>
    </div>
  );
};

export default ImagePreview;
