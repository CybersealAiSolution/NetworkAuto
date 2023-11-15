import axios from "axios";

const getCookie = (name) => {
  const cookieValue = document.cookie.match(
    "(^|;)\\s*" + name + "\\s*=\\s*([^;]+)"
  );
  return cookieValue ? cookieValue.pop() : "";
};
const csrftoken = getCookie("csrftoken");
// Set the CSRF token in the request headers
// axios.defaults.headers.post["X-CSRFToken"] = csrftoken;
console.log("csrf-token:-", csrftoken);

var baseURL =''

if(process.env.REACT_APP_SERVER_PROTOCOL && process.env.REACT_APP_SERVER_IP_ADDRESS && process.env.REACT_APP_SERVER_PORT){
  baseURL = `${process.env.REACT_APP_SERVER_PROTOCOL}://${process.env.REACT_APP_SERVER_IP_ADDRESS}:${process.env.REACT_APP_SERVER_PORT}`
}
else{
  baseURL ="http://localhost:5000"
}


if(process.env.REACT_APP_DEBUG_MODE == 'false'){
  baseURL = `${baseURL}/backend`
}

export const instance = axios.create({
  baseURL: baseURL,
  csrf_token: csrftoken,
  withCredentials: true, // This ensures cookies (sessions) are sent with every request
});

// Now, set the CSRF token in the default header for POST requests
// It is important that this header matches the name expected by your backend framework. Django, for example, expects "X-CSRFToken".
instance.defaults.headers.post['X-CSRFToken'] = csrftoken;


