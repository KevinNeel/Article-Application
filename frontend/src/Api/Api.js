import axios from "axios";
import Swal from "sweetalert2";

const baseURL = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL || "http://localhost:8000/user",
});


baseURL.interceptors.request.use(
  (config) => {
    const mytoken = JSON.parse(localStorage.getItem("access_token"));
    if (mytoken) {
      config.headers["Authorization"] = `${mytoken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


baseURL.interceptors.response.use(
  (response) => response,
  async (error) => {
    console.log(error, "error here")
    // Check if the error is due to an expired token
    if (error.response && (error.response.status === 401 || error.response.status === 498 || error.response.status === 404)) {
      const errorMessage = error.response.data.message;

      if (errorMessage.includes("Token Expired")) {
        const result = await Swal.fire({
          icon: "error",
          title: "Session Timeout",
          text: "Your session has expired. Please log in again.",
          confirmButtonText: "OK",
          cancelButtonText: "Cancel",
          allowOutsideClick: false,
        });

        if (result.isConfirmed) {
          localStorage.removeItem("user");
          localStorage.removeItem("welcomeAlertShown");
          window.location.href = "/auth/login";
        }
      }
    }
    return Promise.reject(error);
  }
)

export default baseURL;