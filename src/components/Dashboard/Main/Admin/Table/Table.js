import React from "react";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import "./index.css";
// import { Link } from "react-router-dom";

const TableComponent = () => {
  // const [error, setError] = useState(null);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);
  const [data, setData] = useState([
    {
      Admin: "CSA_Global@MODERNCOMMS450672.onmicrosoft.com",
      AccessLevel: "Full Access",
    },
    
  ]);
  const getCookie = (name) => {
    const cookieValue = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
    return cookieValue ? cookieValue.pop() : '';
  }
  const csrftoken = getCookie('csrftoken');
  // Set the CSRF token in the request headers
  axios.defaults.headers.post["X-CSRFToken"] = csrftoken;

  const instance = axios.create({
    baseURL: "http://localhost:5000",
    withCredentials: true, // This ensures cookies (sessions) are sent with every request
  });
//   const route = Ro
  useEffect(()=>{
    // document.addEventListener('click', handleClickOutside);
        

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

    // return () => {
    //   document.removeEventListener('click', handleClickOutside);
    //   };

  },[]);


//   const handleClickOutside = event => {
//     if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
//         setSidebarOpen(false);
//     }
// };

 
  const TableColumn = () =>
    data.map((item) => (
      <tr key={item.id}>
        <td><input className="rowCheckbox" type="checkbox"></input></td>
        <td>{item.Admin}</td>
        <td>{item.AccessLevel}</td>
      </tr>
    ));

  return (
    <div className="tableComponent">
      <div className="tableHeader">

        {/* <Link className="addbtn" to="/dashboard/add-address">+ Add</Link> */}
        <div onClick={() => setSidebarOpen(!isSidebarOpen)} className="addbtn">+ add</div>
        {isSidebarOpen && 
              <>
                <div className="overlay"></div>
                <div className="sidebar2" ref={sidebarRef}>
                    <div className="closeSidebar2" onClick={() => setSidebarOpen(!isSidebarOpen)} >X</div>
                    <h2>Add Admin</h2>
                    <form className="">
                      
                      
                    </form>
                </div>
              </>
            }

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
              <th>Admin</th>
              <th>Access Level</th>
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
