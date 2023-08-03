import React, { useState } from "react";
import "./index.css";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const CreateDefaultTenant = () => {
  let navigate = useNavigate();
  const csrftoken = Cookies.get("csrftoken"); // Read the CSRF token from cookies

  // Set the CSRF token in the request headers
  axios.defaults.headers.post["X-CSRFToken"] = csrftoken;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [country, setcountry] = useState(false);
  const [city, setcity] = useState(false);
  const [street, setstreet] = useState(false);

  const instance = axios.create({
    baseURL: "http://localhost:8000",
    withCredentials: true, // This ensures cookies (sessions) are sent with every request
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      name: name,
      userName: email,
      populateCountries: country,
      populateCities: city,
      populateStreetSuffix: street,
    };
    try {
      const response = await instance.post("/createdefaulttenant", data, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      
      console.log("s", response.data);
      if (response.data.error) {
        alert(response.data.error);
        return;
      } else {
        navigate("/");
        console.log("first");
      }
    } catch (error) {
      // Handle any errors that may occur during the API call
      console.error("Error sending data:", error);
    }
    console.log({ name, email, country, city, street });
  };

  return (
    <div className="form-container">
      <span className="heading">Create Default Tenant</span>
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label htmlFor="name">Default Tenant Name*</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Default Admin/Root User*</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <div className="inputAlignment">
            <input
              type="checkbox"
              checked={country}
              onChange={() => setcountry(!country)}
              id="country"
            />
            <label htmlFor="country">Populate Countries</label>
          </div>
          <div className="inputAlignment">
            <input
              type="checkbox"
              checked={city}
              onChange={() => setcity(!city)}
              id="city"
            />
            <label htmlFor="city">Populate Cities</label>
          </div>
          <div className="inputAlignment">
            <input
              type="checkbox"
              checked={street}
              onChange={() => setstreet(!street)}
              id="street"
            />
            <label htmlFor="street">Populate Street Suffix</label>
          </div>
        </div>
        <div className="createBtn">
          <button type="submit">Create</button>
        </div>
      </form>
    </div>
  );
};

export default CreateDefaultTenant;
