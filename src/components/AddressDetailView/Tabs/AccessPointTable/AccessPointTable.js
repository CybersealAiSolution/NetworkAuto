import React from "react";
import { useState,useEffect } from "react";
import "./index.css";
import { useParams } from "react-router-dom";
import {instance} from "../../../../Fetch"

const AccessPointTable = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [data, setData] = useState([]);
  const {id}= useParams();
  
  useEffect(() => {
    const getAccessPointData= async ()=>{
      const response = await instance.get(`/getlocationsdetail/accessPoints/${id}`)
      setData(response.data.accessPoints?response.data.accessPoints:[]);
    };
    getAccessPointData();
  },[])
  
  const filteredEmergencyAddresses = data.filter(item =>
    item.Description.toLowerCase().includes(searchTerm.toLowerCase()) || 
    item.BSSID.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.locationId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const TableColumn = () =>
      filteredEmergencyAddresses?.map((item) => (
      <tr key={item.id}>
        <td><input className="rowCheckbox" type="checkbox"></input></td>
        {/* <td><Link to={`/dashboard/location/address/${item.locationId}`}>{item.description}</Link></td> */}
        <td>{item.BSSID}</td>
        <td>{item.LocationId}</td>
        <td>{item.Description}</td>
      </tr>
    ));

    const addForm=()=>{
    }

  return (
    <div>
      <div className="tableHeader">
        {/* <Link className="addbtn" to="/dashboard/add-address">+ Add</Link> */}
        <span className="addbtn">+ Add</span>
        <div className="tableSearchContainer">
        <input 
            className="tableSearch" 
            placeholder="Search for Access Points" 
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
              <th>BSSID</th>
              <th>LocationId</th>
              <th>Description</th>
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

export default AccessPointTable;
