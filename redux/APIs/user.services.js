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
export { registerService, logoutService, loginService };
