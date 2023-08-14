import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import "./index.css";
import { Link } from "react-router-dom";

const TableComponent = () => {
  const [searchTerm, setSearchTerm] = useState("");
  // const [error, setError] = useState(null);
  const [data, setData] = useState([]);
  const getCookie = (name) => {
    const cookieValue = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
    return cookieValue ? cookieValue.pop() : '';
  }
  const csrftoken = getCookie('csrftoken');
  // Set the CSRF token in the request headers
  axios.defaults.headers.post["X-CSRFToken"] = csrftoken;

  const instance = axios.create({
    baseURL: "http://172.173.201.251:5000",
    withCredentials: true, // This ensures cookies (sessions) are sent with every request
  });


  const filteredEmergencyAddresses = data.filter(item =>
    item.description.toLowerCase().includes(searchTerm.toLowerCase()) || 
    item.Country.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.fulladdress.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.locationId.toLowerCase().includes(searchTerm.toLowerCase())
  );



  useEffect(()=>{
    const getEmergencyAddress = async () => {
      try {
        const response = await instance.get("/getEmergencyAddresses", {
          headers: {
            "Content-Type": "application/json",
            'X-CSRFToken': getCookie('csrftoken'),
          },
        });
    
        const addressList=response.data.data;
        setData(addressList);
        if (response.data.error) {
          alert(response.data.error);
          return;
        } else {
          // navigate("/");
          console.log("first");
        }
      } catch (error) {
        console.error("Error sending data:", error);
      }
      }
    getEmergencyAddress();
  },[]);

 
  const TableColumn = () =>
      filteredEmergencyAddresses?.map((item) => (
      <tr key={item.id}>
        <td><input className="rowCheckbox" type="checkbox"></input></td>
        <td><Link to={`/dashboard/location/address/${item.locationId}`}>{item.description}</Link></td>
        <td>{item.Country}</td>
        <td>{item.fulladdress}</td>
      </tr>
    ));


    
  return (
    <div className="tableComponent">
      <div className="tableHeader">
        <Link className="addbtn" to="/dashboard/add-address">+ Add</Link>
        <div className="tableSearchContainer">
        <input 
            className="tableSearch" 
            placeholder="Search for Admins" 
            type="text"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
        />

        </div>
      </div>
      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
            <th><input className="headerCheckbox" type="checkbox"></input></th>
              <th>Description</th>
              <th>Country</th>
              <th>Address</th>
            </tr>
          </thead>
          <tbody>
            <TableColumn  />
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableComponent;
