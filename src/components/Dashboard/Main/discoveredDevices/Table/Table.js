import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./index.css";  // Assuming you want to use the same CSS

const DeviceTableComponent = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [data, setData] = useState([]);

  const getCookie = (name) => {
    const cookieValue = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
    return cookieValue ? cookieValue.pop() : '';
  }

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  }


  const filteredData = data.filter((item) => {
    return (
      item.short_description
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      item.model_id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.ip_address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.BSSID.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.ChassisID.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.msTeamsStatus.toLowerCase().includes("not synced") ||
      item.location.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });



  
  const instance = axios.create({
    baseURL: "http://localhost:5000",
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
      'X-CSRFToken': getCookie('csrftoken'),
    }
  });

  useEffect(() => {
    const getDevices = async () => {
      try {
        const response = await instance.get("/devices/");
        if (response.data.error) {
          alert(response.data.error);
          return;
        }
        setData(response.data);
      } catch (error) {
        console.error("Error fetching devices:", error);
      }
    }
    getDevices();
  }, []);

  const DeviceTableColumn = () => 
      filteredData?.map((item, index) => (
      <tr key={index}>
        <td><input className="rowCheckbox" type="checkbox"></input></td>
        <td>{item.short_description}</td>
        <td>{item.model_id}</td>
        <td>{item.ip_address}</td>
        <td>{item.BSSID}</td>
        <td>{item.ChassisID}</td>
        <td
        style={{
          color: item.msTeamsStatus === 'Synced' ? 'green' : 'red',
        }}
      >{item.msTeamsStatus}</td>
        <td>{item.location}</td>
      </tr>
    ));

  return (
    <div className="tableComponent">
      <div className="tableHeader">
        <div className="tableSearchContainer">
        <input 
            className="tableSearch" 
            placeholder="Search for Devices" 
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>
      </div>
      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th><input className="headerCheckbox" type="checkbox"></input></th>
              <th>Description</th>
              <th>Model ID</th>
              <th>IP Address</th>
              <th>BSSID</th>
              <th>ChassisID</th>         
              <th>MsTeams Status</th>
              <th>Location</th>

            </tr>
          </thead>
          <tbody>
            <DeviceTableColumn />
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DeviceTableComponent;
