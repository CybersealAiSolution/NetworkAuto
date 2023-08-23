import axios from "axios";

const getCookie = (name) => {
  const cookieValue = document.cookie.match(
    "(^|;)\\s*" + name + "\\s*=\\s*([^;]+)"
  );
  return cookieValue ? cookieValue.pop() : "";
};
const csrftoken = getCookie("csrftoken");
// Set the CSRF token in the request headers
axios.defaults.headers.post["X-CSRFToken"] = csrftoken;

export const instance = axios.create({
  baseURL: "http://172.173.201.251:5000",
  withCredentials: true, // This ensures cookies (sessions) are sent with every request
});

