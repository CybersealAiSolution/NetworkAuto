import React, { useEffect, useState } from "react";
import "./index.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import Tabs from "./Tabs/Tabs";

const AddressDetailView = () => {
  const [description, setDescription] = useState("");
  const [option, setOption] = useState("United States");
  const [data, setData] = useState({});
  const p = useParams();
  //   console.log('id',p['*']);
  const addressId = p["*"];

  const getCookie = (name) => {
    const cookieValue = document.cookie.match(
      "(^|;)\\s*" + name + "\\s*=\\s*([^;]+)"
    );
    return cookieValue ? cookieValue.pop() : "";
  };
  const csrftoken = getCookie("csrftoken");
  // Set the CSRF token in the request headers
  axios.defaults.headers.post["X-CSRFToken"] = csrftoken;

  const instance = axios.create({
    baseURL: "http://localhost:5000",
    withCredentials: true, // This ensures cookies (sessions) are sent with every request
  });
  //   const route = Ro
  useEffect(() => {
    const getEmergencyAddress = async () => {
      try {
        const response = await instance.get(
          `/getAddressDetailView/${addressId}`,
          {
            headers: {
              "Content-Type": "application/json",
              "X-CSRFToken": getCookie("csrftoken"),
            },
          }
        );

        const addressObject = JSON.parse(response.data.data)[0];
        setData(addressObject);
        // console.log("addressObject", JSON.parse(addressObject.data)[0]);
        console.log("addressListx", addressObject);
        if (response.data.error) {
          alert(response.data.error);
          return;
        } else {
          // navigate("/");
          console.log("first");
        }
      } catch (error) {
        // Handle any errors that may occur during the API call
        console.error("Error sending data:", error);
      }
    };
    getEmergencyAddress();
  }, []);
  // Handler for the text field change
  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  // Handler for the select option change
  const handleOptionChange = (e) => {
    setOption(e.target.value);
    console.log(option);
  };

  // Handler for form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Do something with the form data here (e.g., send it to a server)
    console.log("description:", description);
    console.log("Option:", option);
  };
  return (
    <div className="adminComponent">
      <div className="adminComponentHeader">
        <h1 className="adminComponentTitle">{data.description}</h1>
      </div>
      <div className="contain">
        <div className="one">
          <div className="onefirst">
            {data.fulladdress}
            <br />
            <br />
            Location ID: {data.locationId}
            <br />
            <br />
            Organization name: Contoso
          </div>
          <div className="onesec">
            <p style={{ margin: "26px 0" }}>Places 0</p>
            <p style={{ margin: "26px 0" }}>Voice users 1</p>
            <p style={{ margin: "26px 0" }}>Phone numbers 1</p>
          </div>
        </div>
        <div className="two">
          <div className="twofirst">
            <p style={{ textAlign: "center" }}>Location network summary</p>
            <hr style={{ margin: "20px" }} />
            <div style={{ textAlign: "left", marginLeft: "50px" }}>
              <p style={{ margin: "26px 0" }}>Subnets 1</p>
              <p style={{ margin: "26px 0" }}>Wi-Fi access points 1</p>
              <p style={{ margin: "26px 0" }}>Switches 1</p>
              <p style={{ margin: "26px 0" }}>Ports 1</p>
            </div>
          </div>
        </div>
      </div>
      <Tabs/>
    </div>
  );
};

export default AddressDetailView;
