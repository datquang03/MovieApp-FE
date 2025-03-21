import { Link } from "react-router-dom";
import notfound from "/assets/notfound.jpg";
const NotFoundPage = () => {
  return (
    <div className="flex flex-col gap-8  justify-center items-center w-full min-h-screen text-white bg-main lg:py-20 py-10 px-6">
      <img src={notfound} alt="" className="w-full h-96 object-contain" />
      <h1 className="lg:text-4xl font-bold">ERROR ❌❌❌</h1>
      <p className="font-medium text-border italic leading-6">
        Sorry ! The page you are looking for does not exist 😔
      </p>
      <Link
        to={"/"}
        className="bg-subMain text-white font-medium py-2 px-4 rounded-md scale-100 hover:scale-110 transition duration-500 ease-in-out hover:text-main hover:bg-white"
      >
        Go back home ! 🏠{" "}
      </Link>
    </div>
  );
};

export default NotFoundPage;
