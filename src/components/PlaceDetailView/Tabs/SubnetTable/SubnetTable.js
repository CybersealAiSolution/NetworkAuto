import React from "react";
import { useState,useEffect,useRef } from "react";
import "./index.css";
import { useParams } from "react-router-dom";
import {instance} from "Fetch"
import { useSelector } from "react-redux";

const SubnetTable = () => {
  const { roles } = useSelector((state) => state.users); // Use "state.users" here
  const [searchTerm, setSearchTerm] = useState("");
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);
  const {id}= useParams();
  const [data, setData] = useState([]);
  const subnetRef = useRef(null);
  const descriptionRef = useRef(null);
  
  useEffect(() => {
    const getSubnetData= async ()=>{
      const response = await instance.get(`/getlocationsdetail/subnets/${id}`)
      setData(response.data.subnet?response.data.subnet:[]);
    };
    getSubnetData();
  },[])
  

  const filteredEmergencyAddresses = data.filter(item =>
    item.Description?.toLowerCase().includes(searchTerm?.toLowerCase()) || 
    item.Subnet?.toLowerCase().includes(searchTerm?.toLowerCase()) ||
    item.locationId?.toLowerCase().includes(searchTerm?.toLowerCase())
  );

  const TableColumn = () =>
      filteredEmergencyAddresses?.map((item) => (
      <tr key={item.id}>
        <td><input className="rowCheckbox" type="checkbox"></input></td>
        {/* <td><Link to={`/dashboard/location/address/${item.locationId}`}>{item.description}</Link></td> */}
        <td>{item.Subnet}</td>
        <td>{item.LocationId}</td>
        <td>{item.Description}</td>
      </tr>
    ));

  const handleSubmit = async (event) => {
    event.preventDefault();

    const subnet = subnetRef.current.value;
    const description = descriptionRef.current.value;

    const requestData = {
      subnet,
      description
    };

    try {
      const response = await instance.post(`/addSubnets/${id}`, requestData, {
        headers: {
          'Content-Type': 'application/json'
        },
      });

      // Handle the response as needed
    console.log("s", response.data);
    if (response?.data.error) {
      alert(response.data.error);
      return;
    } else {
      console.log("first");
    }
  } catch (error) {
    // Handle any errors that may occur during the API call
    console.error("Error sending data:", error);
  }
  console.log(requestData);
  setSidebarOpen(!isSidebarOpen)
  };


  return (
    <div>
      <div className="tableHeader">
        {/* <Link className="addbtn" to="/dashboard/add-address">+ Add</Link> */}
        {(roles==="root" || roles==="ReadAndWrite" || roles === 'admin') ? (<div onClick={() => setSidebarOpen(!isSidebarOpen)} className="addbtn">
          + Add
        </div>):<div></div>}
        {isSidebarOpen && 
              <>
                <div className="overlay"></div>
                <div className="sidebar2" ref={sidebarRef}>
                    <div className="closeSidebar2" onClick={() => setSidebarOpen(!isSidebarOpen)} >X</div>
                    <h2>Add Subnets</h2>
                    <form className="addUserForm" onSubmit={handleSubmit}>
                      <div>
                      <div className="adminEmailFormDivision adminFormElement">
                        <label for="subnet">Subnet</label>
                        <input type="text" name="subnet" className="subnet" placeholder="x.x.x.x or x.x.x.x.x.x.x.x" ref={subnetRef} required></input>
                      </div>
                      <div className="AccessLevelFormDivision adminFormElement">
                        <label for="Description">Description</label>
                        <input type="text" name="Description" className="Description" ref={descriptionRef} placeholder="Add a description so you know why it was created" required></input>
                      </div>
                      </div>
                      <input type="submit" className="addAdminFormSubmit" value="Submit"></input>
                    </form>
                </div>
              </>
            }
        <div className="tableSearchContainer">
        <input 
            className="tableSearch" 
            placeholder="Search for Subnets" 
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
              <th>Subnet</th>
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

export default SubnetTable;
