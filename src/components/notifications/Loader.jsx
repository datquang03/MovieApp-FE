import { PuffLoader } from "react-spinners";
import { useState, useEffect } from "react";

// eslint-disable-next-line react/prop-types
const Loader = ({ minTime = 2000 }) => {
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoader(false);
    }, minTime);

    return () => clearTimeout(timer);
  }, [minTime]);

  return showLoader ? (
    <div className="w-full py-4 px-2 flex flex-col justify-center items-center">
      <PuffLoader color="#F20000" />
    </div>
  ) : null;
};

export default Loader;
