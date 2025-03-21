import axiosClient from "./axios";
// register user with API
const registerService = async (user) => {
  const { data } = await axiosClient.post("/users", user);
  if (data) {
    localStorage.setItem("userInfo", data.token);
  }
  return data;
};

// logout user
const logoutService = () => {
  localStorage.removeItem("userInfo");
  return null;
};

// login user API call
const loginService = async (user) => {
  const { data } = await axiosClient.post("/users/login", user);
  if (data) {
    localStorage.setItem("userInfo", JSON.stringify(data));
  }
  return data;
};

// update profile
const updateUserProfile = async (user, token) => {
  const { data } = await axiosClient.put("/users", user, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (data) {
    localStorage.setItem("userInfo", JSON.stringify(data));
  }
};
// delete profile
const deleteUserProfile = async (token) => {
  const { data } = await axiosClient.delete("/users", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (data) {
    localStorage.removeItem("userInfo");
  }
  return data;
};

// change password
const changeUserPassword = async (user) => {
  const token = JSON.parse(localStorage.getItem("userInfo"))?.token;
  if (!token) {
    throw new Error("No token found");
  }

  const { data } = await axiosClient.put("/users/password", user, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

// get all favorite movies
const getFavoriteMovies = async (token) => {
  const { data } = await axiosClient.get("/users/favorites", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};
// delete all favorite movies
const deleteAllFavoriteMovies = async (token) => {
  const { data } = await axiosClient.delete("/users/favorites", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

// like movie
const likeMovieService = async (movieId, token) => {
  const { data } = await axiosClient.post(`/users/favorites`, movieId, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

// get all users (admin)
const getAllUsersService = async (token) => {
  const { data } = await axiosClient.get("/users", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

// delete user(admin)
const deleteUserService = async (id, token) => {
  const { data } = await axiosClient.delete(`/users/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export {
  registerService,
  logoutService,
  loginService,
  updateUserProfile,
  deleteUserProfile,
  changeUserPassword,
  getFavoriteMovies,
  deleteAllFavoriteMovies,
  getAllUsersService,
  deleteUserService,
  likeMovieService,
};
