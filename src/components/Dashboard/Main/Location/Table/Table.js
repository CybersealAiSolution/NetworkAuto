import React from "react";
import { useEffect, useState } from "react";
// import axios from "axios";
import "./index.css";
import { Link } from "react-router-dom";
import { instance ,level} from "../../../../../Fetch";
import Pagination from "../../../../Pagination/Pagination";

const TableComponent = () => {
  const [searchTerm, setSearchTerm] = useState("");
  // const [error, setError] = useState(null);
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  // const itemsPerPage = 10; // You can adjust this value as needed.
  // const lastItemIndex = currentPage * itemsPerPage;
  // const firstItemIndex = lastItemIndex - itemsPerPage;
  // const currentData = data.slice(firstItemIndex, lastItemIndex);


  const filteredEmergencyAddresses = data.filter(item =>
    item.description?.toLowerCase().includes(searchTerm?.toLowerCase()) || 
    item.Country?.toLowerCase().includes(searchTerm?.toLowerCase()) ||
    item.fulladdress?.toLowerCase().includes(searchTerm?.toLowerCase()) ||
    item.locationId?.toLowerCase().includes(searchTerm?.toLowerCase())
  );


  const handlePageChange = (pageNumber) => {
    console.log("changing....",pageNumber);
    setCurrentPage(pageNumber);
  };


  useEffect(()=>{
    const getEmergencyAddress = async () => {
      try {
        const response = await instance.get(`/getEmergencyAddresses?page=${currentPage}`);
    
        setData(response.data.data ? response.data.data : []);
        setTotalPage(response.data.totalPages?response.data.totalPages:1);
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
  },[currentPage]);

 
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
      {(level==="root" || level==="ReadAndWrite") && (<Link className="addbtn" to="/dashboard/add-address">+ Add</Link>)}
        
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
      <Pagination
        currentPage={currentPage}
        totalPages={totalPage}
        onPageChange={handlePageChange} // Pass the function reference
      />
    </div>
  );
};

export default TableComponent;
