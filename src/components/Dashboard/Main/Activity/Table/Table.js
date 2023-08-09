import React from "react";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import "./index.css";
import { Link } from "react-router-dom";

const TableComponent = () => {
  const [error, setError] = useState(null);
  const [data, setData] = useState([
    {
      description: "Synced with serviceNow",
      admin: "CSA_Global@MODERNCOMMS450672.onmicrosoft.com",
      eventType: "Full Access",
      timing: "Full Access",
    },
    {
      description: "Synced with Juniper Mist",
      admin: "CSA_Global@MODERNCOMMS450672.onmicrosoft.com",
      eventType: "Full Access",
      timing: "Full Access",
    },
    
  ]);
  const getCookie = (name) => {
    const cookieValue = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
    return cookieValue ? cookieValue.pop() : '';
  }
  const csrftoken = getCookie('csrftoken');
  axios.defaults.headers.post["X-CSRFToken"] = csrftoken;

  const instance = axios.create({
    baseURL: "http://localhost:5000",
    withCredentials: true, 
  });

  useEffect(()=>{
    const getEmergencyAddress = async () => {
      try {
        const response = await instance.get("/getEmergencyAddresses", {
          headers: {
            "Content-Type": "application/json",
            'X-CSRFToken': getCookie('csrftoken'),
          },
        });
    
        
        console.log("s", response.data);

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
      }
    getEmergencyAddress();
  }
    );

 
  const TableColumn = () =>
    data.map((item) => (
      <tr key={item.id}>
        <td><input className="rowCheckbox" type="checkbox"></input></td>
        <td>{item.description}</td>
        <td>{item.admin}</td>
        <td>{item.eventType}</td>
        <td>{item.timing}</td>
      </tr>
    ));


  return (
    <div className="tableComponent">
      <div className="tableHeader">
        <div className="tableSearchContainer">
          <input
            className="tableSearch"
            placeholder="Search for Admins"
            type="text"
          />
        </div>
      </div>
      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
            <th><input className="headerCheckbox" type="checkbox"></input></th>
              <th>Description</th>
              <th>Admin</th>
              <th>Event Type</th>
              <th>Timing</th>
            </tr>
          </thead>
          <tbody>
            <TableColumn />
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableComponent;
