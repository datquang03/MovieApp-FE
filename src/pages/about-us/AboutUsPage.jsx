import Head from "../../components/Head";
import Layout from "../../components/layout/Layout";
import bg1 from "/assets/bg1.jpg";
const AboutUsPage = () => {
  return (
    <Layout>
      <div className="min-h-screen container mx-auto px-2 py-6">
        <Head title="About Us" />
        <div className="xl:py-20 py-10 px-4">
          <div className="grid grid-flow-row xl:grid-cols-2 gap-4 xl:gap-16 items-center">
            <div>
              <h3 className="text-xl lg:text-3xl mb-4 font-semibold">
                Welcome to Movie House
              </h3>
              <div className="mt-3 text-sm leading-8 text-text">
                <p>
                  Movie House is the ultimate destination for movie lovers. With
                  a wide selection of films, you can watch and download the
                  latest and most exciting movies. Discover amazing cinematic
                  experiences today at Movie House, where entertainment meets
                  convenience!
                </p>
              </div>
              <div className="grid md:grid-cols-2 gap-6 mt-8 cursor-pointer">
                <div
                  className="p-8 bg-dry rounded-lg bg-gradient-to-r from-blue-900 via-black-500 to-red-900 
    transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg hover:shadow-white/50 
    hover:brightness-125"
                >
                  <span className="text-3xl block font-extrabold mt-4">
                    20K
                  </span>
                  <h4 className="text-lg font-bold mt-1">Users</h4>
                  <p className="mb-0 text-text leading-7 text-sm text-start">
                    Over 20000 Users are using our website
                  </p>
                </div>
                <div
                  className="p-8 bg-dry rounded-lg bg-gradient-to-r from-red-900 via-black-500 to-blue-900
    transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg hover:shadow-white/50
    hover:brightness-125"
                >
                  <span className="text-3xl block font-extrabold mt-4">
                    0 $
                  </span>
                  <h4 className="text-lg font-bold mt-1">
                    Free Movies and Download
                  </h4>
                  <p className="mb-0 text-text leading-7 text-sm text-start">
                    All resources are free
                  </p>
                </div>
                <div
                  className="p-8 bg-dry rounded-lg bg-gradient-to-r from-blue-900 via-black-500 to-red-900 
    transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg hover:shadow-white/50
    hover:brightness-125"
                >
                  <span className="text-3xl block font-extrabold mt-4">
                    4K & HD
                  </span>
                  <h4 className="text-lg font-bold mt-1">Quality</h4>
                  <p className="mb-0 text-text leading-7 text-sm text-start">
                    High quality movies
                  </p>
                </div>
                <div
                  className="p-8 bg-dry rounded-lg bg-gradient-to-r from-red-900 via-black-500 to-blue-900 
    transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg hover:shadow-white/50
    hover:brightness-125"
                >
                  <span className="text-3xl block font-extrabold mt-4">
                    10K
                  </span>
                  <h4 className="text-lg font-bold mt-1">Listed Movies</h4>
                  <p className="mb-0 text-text leading-7 text-sm text-start">
                    Over 10000 Movies are listed on our website
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-10 lg:mt-0">
              <img
                src={bg1}
                alt="bg1 image"
                className="w-full h-full object-cover rounded-lg xl:block hidden"
              />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AboutUsPage;
