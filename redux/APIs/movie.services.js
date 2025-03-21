import axiosClient from "./axios";

// get all movies
const getAllMoviesService = async (
  category,
  language,
  year,
  time,
  rate,
  search,
  pageNumber
) => {
  const { data } = await axiosClient.get(
    `/movies?category=${category}&language=${language}&year=${year}&time=${time}&rate=${rate}&search=${search}&pageNumber=${pageNumber}`
  );
  return data;
};

// get random movies
const getRandomMoviesService = async () => {
  const { data } = await axiosClient.get("/movies/random/all");
  return data;
};

// get movie by id
const getMovieByIdService = async (id) => {
  const { data } = await axiosClient.get(`/movies/${id}`);
  return data;
};

// get top rated movies
const getTopRatedMoviesService = async () => {
  const { data } = await axiosClient.get("/movies/rated/top");
  return data;
};

// review movie
const reviewMovieService = async (token, id, review) => {
  const { data } = await axiosClient.post(`/movies/${id}/reviews`, review, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};
// delete movie
const deleteMovieService = async (id, token) => {
  const { data } = await axiosClient.delete(`/movies/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

// delete all movies
const deleteAllMoviesService = async (token) => {
  const { data } = await axiosClient.delete("/movies", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};
// create movie
const createMovieService = async (token, movie) => {
  const { data } = await axiosClient.post("/movies", movie, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};
// update movie
const updateMovieService = async (token, id, movie) => {
  const { data } = await axiosClient.put(`/movies/${id}`, movie, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};
export {
  getAllMoviesService,
  getRandomMoviesService,
  getMovieByIdService,
  getTopRatedMoviesService,
  reviewMovieService,
  deleteMovieService,
  deleteAllMoviesService,
  createMovieService,
  updateMovieService,
};
