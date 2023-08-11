import React, { useState } from "react";
import "./index.css";
import axios from "axios";
import BingMapComponent from "../BingMap/BingMap";

const AddAddress = () => {
  // State variables to store form values
  const [description, setDescription] = useState("");
  const [houseNumber, sethouseNumber] = useState("444");
  const [streetName, setstreetName] = useState("");
  const [city, setcity] = useState("");
  const [StateorProvince, setStateorProvince] = useState("");
  const [postalCode, setpostalCode] = useState("");
  const [latitude, setlatitude] = useState("");
  const [Longitude, setLongitude] = useState("");
  const [option, setOption] = useState("US");

  // Handler for the text field change
  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  // Handler for the select option change
  const handleOptionChange = (e) => {
    setOption(e.target.value);
    console.log(option);
  };

  const instance = axios.create({
    baseURL: "http://172.173.201.251:5000",
    withCredentials: true, // This ensures cookies (sessions) are sent with every request
  });
  const getCookie = (name) => {
    const cookieValue = document.cookie.match(
      "(^|;)\\s*" + name + "\\s*=\\s*([^;]+)"
    );
    return cookieValue ? cookieValue.pop() : "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("description:", description);
    console.log("Option:", option);

    //separating houseNumber and streetName here

    const parts = streetName.split(" ", 2);
    let newHouseNumber = "444";
    let newStreetName = streetName;

    // Check if the first part is an integer
    if (!isNaN(parseInt(parts[0])) && isFinite(parts[0])) {
      newHouseNumber = parts[0];
      newStreetName = streetName.slice(parts[0].length).trim();
    }

    const data = {
      description: description,
      houseNumber: newHouseNumber,
      streetName: newStreetName,
      city: city,
      StateorProvince: StateorProvince,
      postalCode: postalCode,
      latitude: latitude,
      Longitude: Longitude,
      CountryOrRegion: option,
    };
    try {
      console.log(data);
      const response = await instance.post("/addLisAddress", data, {
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": getCookie("csrftoken"),
        },
      });

      console.log(response.data);
      if (response.data.error) {
        console.log(response.data.error);
        return;
      }
    } catch (error) {
      console.error("Error sending data:", error);
    }
  };

  return (
    <div className="adminComponent">
      <div className="adminComponentHeader">
        <h1 className="adminComponentTitle">Add Address</h1>
      </div>
      <div className="formBox">
        <form onSubmit={handleSubmit}>
          <div className="fieldFirst">
            <label htmlFor="option">Description</label>
            <input
              type="text"
              value={description}
              onChange={handleDescriptionChange}
              className="description"
              name="description"
            />
          </div>
          <div style={{ marginTop: "10px" }}>
            <label htmlFor="option">Country or Region</label>
            <select
              id="option"
              onChange={handleOptionChange}
              required
              value={option}
            >
              <option value="United States">United States</option>
              {/* <option value="Canada">Canada</option>
                <option value="United Kingdom">United Kingdom</option> */}
            </select>
          </div>
          <BingMapComponent
            setstreetName={setstreetName}
            setcity={setcity}
            setStateorProvince={setStateorProvince}
            setpostalCode={setpostalCode}
            setlatitude={setlatitude}
            setlongitude={setLongitude}
            setOption={setOption}
          />

          <div style={{ display: "flex" }}>
            <button
              className="savebtn"
              style={{ marginRight: "10px" }}
              type="submit"
              onSubmit={handleSubmit}
            >
              Submit
            </button>
            <button
              className="cancelbtn"
              style={{ backgroundColor: "grey" }}
              onClick={() => window.history.back()}
            >
              Cancel
            </button>
            {/* <Link className="savebtn" style={{ backgroundColor: "grey" }} to="/dashboard">Cancel</Link> */}
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddAddress;
