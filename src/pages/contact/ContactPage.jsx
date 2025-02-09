import { IoMail } from "react-icons/io5";
import { FaPhoneAlt } from "react-icons/fa";
import { FaLocationPin } from "react-icons/fa6";
import Head from "../../components/Head";
import Layout from "../../components/layout/layout";

const ContactPage = () => {
  const contactData = [
    {
      id: 1,
      title: "Email us",
      info: "Describe your issues so we can help you fix it",
      icon: IoMail,
      contact: "daoquangdat0103@gmail.com",
    },
    {
      id: 2,
      title: "Contact us",
      info: "Direct contact with hotline number to get support immediately",
      icon: FaPhoneAlt,
      contact: "+84 833 222 312",
    },
    {
      id: 3,
      title: "Location",
      info: "Our head-quarter is located here ",
      icon: FaLocationPin,
      contact: "FPT University",
    },
  ];
  return (
    <Layout>
      <div className="min-height-screen container mx-auto px-2 py-6">
        <Head title="Contact Us" />
        <div className="grid mg:grid-cols-2 gap-6 lg:my-20 my-10 lg:grid-cols-3 xl:gap-8 ">
          {contactData.map((item) => (
            <div
              key={item.id}
              className="border border-border flex justify-center items-center p-10 bg-dry rounded-lg text-center flex-col"
            >
              <span className="flex justify-center items-center mt-4 w-20 h-20 rounded-full bg-main text-subMain text-2xl">
                <item.icon />
              </span>
              <h5 className="text-xl font-semibold mb-2">{item.title}</h5>
              <a href={`email to: ${item.contact}`} className="text-blue-600">
                {item.contact}
              </a>
              <p className="mb-0 text-sm text-text leading-7">{item.info}</p>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default ContactPage;
