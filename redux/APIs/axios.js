import axios from "axios";
const axiosClient = axios.create({
  baseURL: "https://movie-app-be-lac.vercel.app/api",
  headers: {
    "Content-Type": "application/json",
  },
});
export default axiosClient;
