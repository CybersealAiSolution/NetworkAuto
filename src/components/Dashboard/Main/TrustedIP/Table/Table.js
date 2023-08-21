import React from "react";
import { useEffect, useState, useRef } from "react";
// import axios from "axios";
import "./index.css";
import { instance ,level } from "./../../../../../Fetch";
import { toast } from "react-toastify";
import Pagination from "../../../../Pagination/Pagination";

const TableComponent = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [data, setData] = useState([]);
  const ipRef = useRef(null);
  const descriptionRef = useRef(null);
  const MaskBitsRef = useRef(null);

  
  const handlePageChange = (pageNumber) => {
    console.log("changing....",pageNumber);
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    const getTrustedIPs = async () => {
      try {
        const response = await instance.get(`/getTrustedIPs?page=${currentPage}`);

        console.log("getTrustedIPs", response.data);

        if (response.data.error) {
          alert(response.data.error);
          return;
        } else {
          // navigate("/");
          console.log("first");
          setData(response.data.data ? response.data.data : []);
          setTotalPage(response.data.totalPages?response.data.totalPages:1);
        }
      } catch (error) {
        // Handle any errors that may occur during the API call
        console.error("Error sending data:", error);
      }
    };
    getTrustedIPs();
  }, [currentPage]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const IPAddress = ipRef.current.value;
    const Description = descriptionRef.current.value;
    const MaskBits = MaskBitsRef.current.value;
    if (MaskBits < 0 || MaskBits > 32) {
      toast.error("Put in a number between 0-32");
      return;
    }
    const requestData = {
      IPAddress,
      Description,
      MaskBits,
    };

    try {
      const response = await instance.post(`/addTrustedIP`, requestData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      // Handle the response as needed
      console.log("s", response.data);
      if (response?.data.error) {
        alert(response.data.error);
        return;
      } else {
        toast.success('Request Accepted, Please wait few minutes!!')
        console.log("first");
      }
    } catch (error) {
      // Handle any errors that may occur during the API call
      console.error("Error sending data:", error);
    }
    console.log(requestData);
    setSidebarOpen(!isSidebarOpen);
  };

  const TableColumn = () =>
    data.map((item) => (
      <tr key={item.id}>
        <td>
          <input className="rowCheckbox" type="checkbox"></input>
        </td>
        <td>{item.IPAddress}</td>
        <td>{item.Description}</td>
        <td>{item.MaskBits}</td>
      </tr>
    ));

  return (
    <div className="tableComponent">
      <div className="tableHeader">
        {(level==="root" || level==="ReadAndWrite") && (<div onClick={() => setSidebarOpen(!isSidebarOpen)} className="addbtn">
          + Add
        </div>)}
        {isSidebarOpen && (
          <>
            <div className="overlay"></div>
            <div className="sidebar2" ref={sidebarRef}>
              <div
                className="closeSidebar2"
                onClick={() => setSidebarOpen(!isSidebarOpen)}
              >
                X
              </div>
              <h2>Add trusted IP address</h2>
              <p>
                Enter the number of bits that are used to determine the network
                range or ID.You can also figure out the number of bits needed
                here if you have the subnet mask.
              </p>
              <form className="addUserForm" onSubmit={handleSubmit}>
                <div>
                  <div className="adminEmailFormDivision adminFormElement">
                    <label for="bbsid">IP Address</label>
                    <input
                      type="text"
                      name="bbsid"
                      className="bbsid"
                      placeholder="x.x.x.x or x.x.x.x.x.x"
                      ref={ipRef}
                      required
                    ></input>
                  </div>
                  <div className="AccessLevelFormDivision adminFormElement">
                    <label for="Description">Description</label>
                    <input
                      type="text"
                      name="Description"
                      className="Description"
                      ref={descriptionRef}
                      placeholder="Add a description so you know why it was created"
                      required
                    ></input>
                  </div>
                  <div className="AccessLevelFormDivision adminFormElement">
                    <label for="Description">MaskBits</label>
                    <input
                      type="number"
                      name="MaskBits"
                      className="Description"
                      ref={MaskBitsRef}
                      placeholder="Put in a number between 0-32"
                      required
                    ></input>
                  </div>
                </div>
                <input
                  type="submit"
                  className="addAdminFormSubmit"
                  value="Submit"
                ></input>
              </form>
            </div>
          </>
        )}
        <div className="tableSearchContainer">
          <input
            className="tableSearch"
            placeholder="Search for IPs"
            type="text"
          />
        </div>
      </div>
      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>
                <input className="headerCheckbox" type="checkbox"></input>
              </th>
              <th>IPAddress</th>
              <th>Description</th>
              <th>MaskBits</th>
            </tr>
          </thead>
          <tbody>
            <TableColumn />
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
