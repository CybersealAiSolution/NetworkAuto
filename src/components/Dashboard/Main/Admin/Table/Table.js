import React from "react";
import { useEffect, useState, useRef } from "react";
import "./index.css";
import { instance } from "../../../../../Fetch";
// import { Link } from "react-router-dom";

const TableComponent = () => {
  // const [error, setError] = useState(null);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [adminEmail, setAdminEmail] = useState("");
  const [accessLevel, setAccessLevel] = useState("FullAccess");
  const [randomValue, setRandomValue] = useState(Math.random());
  const sidebarRef = useRef(null);
  const [data, setData] = useState([]);

  useEffect(() => {
    const getAllAdmins = async () => {
      try {
        const response = await instance.get("/getalladmins");

        // console.log("getAllAdmins", response.data);
        setData(response.data.data ? response.data.data : []);
        if (response.data.error) {
          alert(response.data.error);
          return;
        } else {
          // navigate("/");
          console.log("getalladmins success");
        }
      } catch (error) {
        // Handle any errors that may occur during the API call
        console.error("Error sending data:", error);
      }
    };
    getAllAdmins();
  }, [randomValue]);

  const submitForm = async (event) => {
    event.preventDefault();
    console.log("Admin Email:", adminEmail);
    console.log("Access Level:", accessLevel);
    const payload = {
      userName: adminEmail,
      roles: accessLevel,
    };
    const response = await instance.post("/addAdmin", payload);
    console.log("bbbbbbb", response.status);
    if (response.status === 201) {
      setRandomValue(Math.random());
    }
  };

  const TableColumn = () =>
    data.map((item) => (
      <tr key={item.id}>
        <td>
          <input className="rowCheckbox" type="checkbox"></input>
        </td>
        <td>{item.userName}</td>
        <td>{item.roles[0]}</td>
      </tr>
    ));

  return (
    <div className="tableComponent">
      <div className="tableHeader">
        {/* <Link className="addbtn" to="/dashboard/add-address">+ Add</Link> */}
        <div onClick={() => setSidebarOpen(!isSidebarOpen)} className="addbtn">
          + add
        </div>
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
              <h2>Add Admin</h2>
              <form className="addUserForm" onSubmit={submitForm}>
                <div>
                  <div className="adminEmailFormDivision adminFormElement">
                    <label for="adminEmail">Email</label>
                    <input
                      type="email"
                      name="adminEmail"
                      className="adminEmail"
                      value={adminEmail}
                      onChange={(e) => setAdminEmail(e.target.value)}
                    />
                  </div>
                  <div className="AccessLevelFormDivision adminFormElement">
                    <label for="accessLevel">Access level</label>
                    <select
                      type="text"
                      name="accessLevel"
                      className="accessLevel"
                      value={accessLevel}
                      onChange={(e) => setAccessLevel(e.target.value)}
                    >
                      <option id="FullAccess" value="admin">
                        Full Access
                      </option>
                      <option id="ReadOnly" value="ReadOnly">
                        Read Only
                      </option>
                      <option id="ReadAndWrite" value="ReadAndWrite">
                        Read And Write
                      </option>
                    </select>
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
            placeholder="Search for Admins"
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
