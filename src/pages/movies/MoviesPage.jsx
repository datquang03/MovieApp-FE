/* eslint-disable no-undef */
import Filters from "../../components/Filters";
import Layout from "../../components/layout/Layout";
import Movie from "../../components/Movie";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import Loader from "../../components/notifications/Loader";
import { RiMovie2Line } from "react-icons/ri";
import { getAllMoviesAction } from "../../../redux/action/movie.action";
import {
  languageData,
  rateData,
  timeData,
  yearData,
} from "../../../data/filters.db";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
const MoviesPage = () => {
  const { search } = useParams();
  const [category, setCategory] = useState({ title: "All Categories" });
  const [year, setYear] = useState(yearData[0]);
  const [rate, setRate] = useState(rateData[0]);
  const [time, setTime] = useState(timeData[0]);
  const [language, setLanguage] = useState(languageData[0]);

  const dispatch = useDispatch();
  // get all movies
  const { isLoading, isError, movies } = useSelector(
    (state) => state.getAllMovies
  );
  // get all categories
  const { categories } = useSelector((state) => state.getAllCategories);

  // queries
  const queries = useMemo(() => {
    const query = {
      category: category?.title === "All Categories" ? "" : category?.title,
      year: year?.title.replace(/\D/g, ""),
      rate: rate?.title.replace(/\D/g, ""),
      time: time?.title.replace(/\D/g, ""),
      language: language?.title === "Sort by language" ? "" : language?.title,
      search: search ? search : "",
    };
    return query;
  }, [category, year, rate, time, language, search]);

  useEffect(() => {
    if (isError) toast.error(isError);
    dispatch(getAllMoviesAction(queries));
  }, [dispatch, isError, queries]);

  const datas = {
    categories: categories,
    category: category,
    setCategory: setCategory,
    language: language,
    setLanguage: setLanguage,
    year: year,
    setYear: setYear,
    rate: rate,
    setRate: setRate,
    time: time,
    setTime: setTime,
  };
  return (
    <Layout>
      <div className="min-h-screen container mx-auto px-2 py-6">
        <Filters data={datas} />
        <p className="text-lg font-medium my-6">
          Total{" "}
          <span className="font-bold text-subMain">
            {movies ? movies?.length : 0} {""} items found
            {search && ` for "${search}"`}
          </span>
        </p>
        {isLoading ? (
          <div className="w-full gap-6 flex flex-col justify-center items-center min-h-screen">
            <Loader />
          </div>
        ) : movies?.length > 0 ? (
          <>
            {" "}
            <Swiper
              modules={[Navigation]}
              spaceBetween={20}
              slidesPerView={4} // Hiển thị 4 phim mỗi lần
              navigation
              loop
              pagination={{ clickable: true }}
              breakpoints={{
                320: { slidesPerView: 1 },
                640: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
                1280: { slidesPerView: 4 },
              }}
            >
              {movies?.map((movie, index) => (
                <SwiperSlide key={index}>
                  <Movie movie={movie} />
                </SwiperSlide>
              ))}
            </Swiper>
          </>
        ) : (
          <div className="w-full gap-6 flex flex-col justify-center items-center min-h-screen">
            <div className="w-24 h-24 p-5 rounded-full mb-4 bg-dry text-subMain text-4xl flex flex-col justify-center items-center">
              <RiMovie2Line />
            </div>
            <p className="text-border text-sm">No movies found</p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default MoviesPage;
