/* eslint-disable react/prop-types */
import {
  FaFacebookF,
  FaPinterest,
  FaTelegram,
  FaTwitter,
  FaWhatsapp,
} from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import MainModal from "./MainModal";
import {
  EmailShareButton,
  FacebookShareButton,
  PinterestShareButton,
  TelegramShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share";

const ShareModal = ({ modalOpen, setModalOpen, movie }) => {
  const shareData = [
    {
      icon: FaFacebookF,
      shareButton: FacebookShareButton,
    },
    {
      icon: FaTwitter,
      shareButton: TwitterShareButton,
    },
    {
      icon: FaTelegram,
      shareButton: TelegramShareButton,
    },
    {
      icon: FaWhatsapp,
      shareButton: WhatsappShareButton,
    },
    {
      icon: FaPinterest,
      shareButton: PinterestShareButton,
    },
    {
      icon: MdEmail,
      shareButton: EmailShareButton,
    },
  ];
  const url = `${window.location.protocol}//${window.location.host}/movie/${movie?._id}`;
  return (
    <MainModal modalOpen={modalOpen} setModalOpen={setModalOpen}>
      <div className="w-full flex flex-col text-white">
        <h2 className="text-2xl mb-6 text-center">
          Share <span className="text-xl font-bold">`{movie?.name}`</span>
        </h2>
        <form className="flex flex-row justify-center items-center flex-wrap gap-6 mt-6">
          {shareData.map((data, index) => (
            <data.shareButton key={index} url={url} quote={movie?.name}>
              <div className="w-12 transition duration-500 ease-in-out hover:bg-subMain flex flex-col justify-center items-center text-lg h-12 bg-white rounded bg-opacity-30">
                <data.icon className="size-6" />
              </div>
            </data.shareButton>
          ))}
        </form>
      </div>
    </MainModal>
  );
};

export default ShareModal;
