/* eslint-disable react/prop-types */
import bg2 from "/assets/bg2.webp";
const Head = ({ title }) => {
  return (
    <div className="w-full bg-gray-500 lg:h-80 relative h-40 overflow-hidden rounded-md ">
      <img src={bg2} alt="main bg 1" className="w-full h-full object-cover" />
      <div className="absolute lg:top-24 top-16 w-full flex justify-center items-center">
        <h1 className="text-xl lg:text-h1 font-bold text-white text-center">
          {title && title}
        </h1>
      </div>
    </div>
  );
};

export default Head;
