import Navbar from "../../components/navbar/Navbar";
import mainbg2 from "../../../assets/mainbg2.png";
const HomePage = () => {
  return (
    <div className="h-full max-w-full">
      <img src={mainbg2} alt="image" className="object-cover w-full h-full" />
      <Navbar />
    </div>
  );
};

export default HomePage;
