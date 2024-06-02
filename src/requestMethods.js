import axios from "axios";

// Determine the environment
const __DEV__ = window.location.hostname === "localhost";

// Set the base URL based on the environment
const BASE_URL = __DEV__
  ? "http://localhost:8000/"
  : "https://api.devtechsm.live/api/";

// Create an axios instance for public requests
export const publicRequest = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // Send cookies with requests
});

// Create an axios instance for user requests
export const userRequest = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // Send cookies with requests
});


