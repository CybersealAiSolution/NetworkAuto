import React, { useState } from "react";
import "./index.css";
import axios from "axios";
import BingMapComponent from "../BingMap/BingMap";
// import { Link } from "react-router-dom";
// import TableComponent from "../Dashboard/Main/Admin/Table/Table";

const AddAddress = () => {
  // State variables to store form values
  const [description, setDescription] = useState("");
  const [houseNumber, sethouseNumber] = useState("");
  const [streetName, setstreetName] = useState("");
  const [city, setcity] = useState("");
  const [StateorProvince, setStateorProvince] = useState("");
  const [postalCode, setpostalCode] = useState("");
  const [latitude, setlatitude] = useState("");
  const [Longitude, setLongitude] = useState("");
  const [option, setOption] = useState("United States");

  // Handler for the text field change
  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  // Handler for the select option change
  const handleOptionChange = (e) => {
    setOption(e.target.value);
    console.log(option)
  };



  const instance = axios.create({
    baseURL: "http://localhost:5000",
    withCredentials: true, // This ensures cookies (sessions) are sent with every request
  });
  const getCookie = (name) => {
    const cookieValue = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
    return cookieValue ? cookieValue.pop() : '';
  }


  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log("description:", description);
    console.log("Option:", option);

    const data = {
       'description': description,
       'houseNumber': houseNumber,
       'streetName' :streetName,
       'city': city,
       'StateorProvince': StateorProvince,
       'postalCode':postalCode,
       'latitude':latitude,
       'Longitude':Longitude,
       'CountryOrRegion':option

    };
    try {
      const response = await instance.post("/addLisAddress", data, {
        headers: {
          "Content-Type": "application/json",
          'X-CSRFToken': getCookie('csrftoken'),
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
          <div>
            <label htmlFor="option">Description</label>
            <input type="text" value={description} onChange={handleDescriptionChange} className="description" name="description" />
          </div>
          <div style={{ marginTop: "10px"}}>
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
          <BingMapComponent />
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
              className="savebtn"
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
