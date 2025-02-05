import {FiUser} from "react-icons/fi"
import mobile from "/assets/mobile.webp"
const Promos = () => {
  return (
    <div className="my-20 py-10 md:px-20 px-8 bg-dry">
      <div className="lg:grid lg:grid-cols-2 lg:gap-10 items-center">
        <div className="flex lg:gap-10 gap-6 flex-col">
          <h1 className="xl-text-3xl text-xl capitalize font-sans font-medium leading-loose">Download and watch your very own movies <br /> <span className="text-subMain">FOR FREE</span></h1>
          <p className="text-text text-sm xl:text-base leading-6 xl:leading-8">
            No where you can find and download movies for free. <br />
            But here you can find and download movies for free.
          </p>
          <div className="flex gap-4 md:text-lg text-sm">
            <div className="flex justify-center items-center bg-black text-subMain px-6 py-3 rounded-md font-bold">
              4K HD
            </div>
            <div className="flex justify-center items-center bg-black lg:gap-4 gap-3 text-subMain px-6 py-3 rounded-md font-bold">
              <FiUser />2K
            </div>
          </div>
        </div>
        <div>
          <img src={mobile} alt="mobile image" className="w-full object-contain rounded lg:mt-0 mt-10"/>
        </div>
      </div>
    </div>
  )
}

export default Promos
