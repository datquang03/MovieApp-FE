/* eslint-disable react/prop-types */
import mainBg from "/assets/mainbg.png";
export const ImageMoviePreview = ({ image, name }) => {
  return (
    <div className="w-32 mt-2 h-32 p-2 bg-main border border-border rounded">
      <img
        src={image || mainBg}
        className="w-full h-full object-cover rounded"
        alt={name}
      />
    </div>
  );
};
