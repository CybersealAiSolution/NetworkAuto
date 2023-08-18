import React from "react";
import { useState,useEffect,useRef } from "react";
import "./index.css";
import { Link, useParams } from "react-router-dom";
import {instance} from "../../../../Fetch"

const PlaceTable = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const sidebarRef = useRef(null);
    const {id}= useParams();
    const [data, setData] = useState([]);
    const placeRef = useRef(null);
    
    useEffect(() => {
      const getPlaceData= async ()=>{
        const response = await instance.get(`/getlocationsdetail/places/${id}`)
        setData(response.data.places?response.data.places:[]);
      };
      getPlaceData();
    },[])
    
  
    const filterPlaceAddresses = data.filter(item =>
      item.Description.toLowerCase().includes(searchTerm.toLowerCase()) || 
      item.Subnet.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.locationId.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // const filterPlaceAddresses = [
    //     {
    //       "Name": "Name 1",
    //       "LocationId": "Location B",
    //       "Description": "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    //     },
    //     {
    //       "Name": "Name 2",
    //       "LocationId": "Location A",
    //       "Description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
    //     },
    //     {
    //       "Name": "Name 3",
    //       "LocationId": "Location D",
    //       "Description": "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
    //     },
    //     {
    //       "Name": "Name 4",
    //       "LocationId": "Location C",
    //       "Description": "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
    //     },
    //     {
    //       "Name": "Name 5",
    //       "LocationId": "Location B",
    //       "Description": "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    //     },
    //     {
    //       "Name": "Name 6",
    //       "LocationId": "Location A",
    //       "Description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
    //     },
    //     {
    //       "Name": "Name 7",
    //       "LocationId": "Location C",
    //       "Description": "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
    //     },
    //     {
    //       "Name": "Name 8",
    //       "LocationId": "Location D",
    //       "Description": "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
    //     },
    //     {
    //       "Name": "Name 9",
    //       "LocationId": "Location A",
    //       "Description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
    //     },
    //     {
    //       "Name": "Name 10",
    //       "LocationId": "Location C",
    //       "Description": "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
    //     }
    //   ]
      
        
    const TableColumn = () =>
        filterPlaceAddresses?.map((item) => (
        <tr key={item.id}>
          <td><input className="rowCheckbox" type="checkbox"></input></td>
          <td><Link to={`/dashboard/location/place/${item.LocationId}`}>{item.Description}</Link></td>
          {/* <td>{item.Name}</td> */}
          <td>{item.LocationId}</td>
          <td>{item.Address}</td>
        </tr>
      ));
  
    const handleSubmit = async (event) => {
      event.preventDefault();
  
      const placeName = placeRef.current.value;
      // const description = descriptionRef.current.value;
  
      const requestData = {
        placeName,
        // description
      };
  
      try {
        const response = await instance.post(`/addPlaces/${id}`, requestData, {
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
          <div onClick={() => setSidebarOpen(!isSidebarOpen)} className="addbtn">+ Add</div>
          {isSidebarOpen && 
                <>
                  <div className="overlay"></div>
                  <div className="sidebar2" ref={sidebarRef}>
                      <div className="closeSidebar2" onClick={() => setSidebarOpen(!isSidebarOpen)} >X</div>
                      <h2>Add Place</h2>
                      <form className="addUserForm" onSubmit={handleSubmit}>
                        <div>
                        <div className="adminEmailFormDivision adminFormElement">
                          <label for="placeName">Name</label>
                          <input type="text" name="placeName" className="placeName" placeholder="Enter Description" ref={placeRef} required></input>
                        </div>
                        {/* <div className="AccessLevelFormDivision adminFormElement">
                          <label for="Description">Description</label>
                          <input type="text" name="Description" className="Description" ref={descriptionRef} placeholder="Add a description so you know why it was created" required></input>
                        </div> */}
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
                <th>Name</th>
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

export default PlaceTable