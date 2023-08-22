import React from "react";
import { useEffect, useState, useRef } from "react";
import "./index.css";
import { instance } from "../../../../../Fetch";
import { toast } from "react-toastify";
// import { Link } from "react-router-dom";
import { Multiselect } from "multiselect-react-dropdown";
import Pagination from "../../../../Pagination/Pagination";
import { FiEdit2 } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
// import { getCurrentUser } from "./store/userSlice/userDetailSlice";
import { getCurrentUser } from "./../../../../../store/modules/userSlice/userDetailSlice";

const TableComponent = () => {
  const { id, roles, delegations } = useSelector((state) => state.users); // Use "state.users" here
  const dispatch = useDispatch();

  // const [error, setError] = useState(null);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [adminEmail, setAdminEmail] = useState("");
  const [accessLevel, setAccessLevel] = useState("admin");
  // const [delegation, setDelegation] = useState([]);
  const [locationId, setLocationId] = useState([]);
  const [preSelected, setPreSelected] = useState([]);
  const [randomValue, setRandomValue] = useState(Math.random());
  const [addresses, setAddresses] = useState([]);
  const sidebarRef = useRef(null);
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [updating, Setupdating] = useState(false);

  useEffect(() => {
    // let res;
    dispatch(getCurrentUser());
    const getAllAdmins = async () => {
      try {
        const response = await instance.get(
          `/getalladmins?page=${currentPage}`
        );
        // res = await instance.get("/getCurrentUser");
        // dispatch(getCurrentUser());
        // localStorage.setItem("level", JSON.stringify(res.data.data.roles));
        // localStorage.setItem("currUser", JSON.stringify(res.data.data));

        // console.log("getAllAdmins", response.data);
        // console.log("res", res.data.data);
        // console.log(localStorage.getItem("level"));

        // console.log("getAllAdmins", response.data);
        setData(response.data.data ? response.data.data : []);
        setTotalPage(response.data.totalPages ? response.data.totalPages : 1);
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
    const getAddresses = async () => {
      try {
        const response = await instance.get("/getEmergencyAddresses");
        // const res = await instance.get("/getCurrentUser");
        if (response.data.error) {
          alert(response.data.error);
          return;
        }

        //this condition is for checking root
        if (delegations[0] === "0") {
          setAddresses(
            response.data.data
              ? [{ fulladdress: "All", locationId: "0" }, ...response.data.data]
              : []
          );
          console.log(addresses, "addresses");
        } else {
          setAddresses(response.data.data ? response.data.data : []);
        }
      } catch (error) {
        console.error("Error fetching devices:", error);
      }
    };

    getAddresses();
    getAllAdmins();
  }, [randomValue, currentPage, dispatch]);

  const handlePageChange = (pageNumber) => {
    console.log("changing....", pageNumber);
    setCurrentPage(pageNumber);
  };

  const handleEditAdmin = ({ userName, roles, delegations }) => {
    console.log("item", userName, roles, delegations);
    setSidebarOpen(!isSidebarOpen);
    setAdminEmail(userName);
    setAccessLevel(roles[0]);
    setLocationId(delegations);
    const filteredAddresses = addresses.filter((address) =>
      delegations.includes(address.locationId)
    );
    const actualFilteredValue = filteredAddresses?.map((i) => ({
      name: i.fulladdress,
      id: i.locationId,
    }));
    setPreSelected(actualFilteredValue);
    Setupdating(true);
  };

  const submitForm = async (event) => {
    event.preventDefault();
    const payload = {
      userName: adminEmail,
      roles: accessLevel,
      locationId: locationId,
      parentId: id,
    };
    console.log("payload", payload);
    try {
      if (!updating) {
        const response = await instance.post("/addAdmin", payload);
        if (response.status === 201) {
          toast.success("Successfully Added User!!");
        } else {
          toast.error("Failed to Add User");
        }
      } else {
        const response = await instance.post("/updateAdmin", payload);
        if (response.status === 201) {
          toast.success("Successfully Updated User!!");
        } else {
          toast.error("Failed to Update User");
        }
      }
    } catch (error) {
      console.error("Error sending data:", error);
      toast.error("An error occurred");
    }
    setRandomValue(Math.random());
    setSidebarOpen(!isSidebarOpen);
  };

  const TableColumn = () =>
    data.map((item) => (
      <tr key={item.id}>
        <td>
          <input className="rowCheckbox" type="checkbox"></input>
        </td>
        <td>
          {item.userName}{" "}
          {(roles === "root" || roles === "admin") &&
            item.parentId !== "1234" &&
            (item.parentId === id || roles === "root") && (
              <FiEdit2
                style={{ cursor: "pointer" }}
                onClick={() => handleEditAdmin(item)}
              />
            )}
        </td>
        <td>{item.delegations.includes("0") ? "❌ " : "✅"}</td>
        <td>{item.roles[0]}</td>
      </tr>
    ));

  return (
    <div className="tableComponent">
      <div className="tableHeader">
        {/* <Link className="addbtn" to="/dashboard/add-address">+ Add</Link> */}
        {(roles === "root" || roles === "admin") && (
          <div
            onClick={() => setSidebarOpen(!isSidebarOpen)}
            className="addbtn"
          >
            + Add
          </div>
        )}
        {isSidebarOpen && (
          <>
            <div className="overlay"></div>
            <div className="sidebar2" ref={sidebarRef}>
              <div
                className="closeSidebar2"
                onClick={() => {
                  setSidebarOpen(!isSidebarOpen);
                  setAdminEmail("");
                  setAccessLevel("");
                  setLocationId([]);
                  setPreSelected([]);
                }}
              >
                X
              </div>
              <h2>Add Admin</h2>
              <form className="addUserForm" onSubmit={submitForm}>
                <div>
                  <div className="adminEmailFormDivision adminFormElement">
                    <label htmlFor="adminEmail">Email</label>
                    <input
                      type="email"
                      name="adminEmail"
                      className="adminEmail"
                      value={adminEmail}
                      onChange={(e) => setAdminEmail(e.target.value)}
                    />
                  </div>
                  <div className="AccessLevelFormDivision adminFormElement">
                    <label htmlFor="accessLevel">Access level</label>
                    <select
                      type="text"
                      name="accessLevel"
                      className="accessLevel"
                      value={accessLevel}
                      onChange={(e) => setAccessLevel(e.target.value)}
                    >
                      <option id="admin" value="admin">
                        Admin
                      </option>
                      <option id="ReadOnly" value="ReadOnly">
                        Read Only
                      </option>
                      <option id="ReadAndWrite" value="ReadAndWrite">
                        Read And Write
                      </option>
                    </select>
                  </div>
                  <div className="AccessLevelFormDivision adminFormElement">
                    <label htmlFor="delegaton">Delegation by Location</label>
                    {/* <select
                      multiple
                      type="text"
                      name="locationId"
                      className="delegation"
                      value={locationId}
                      onChange={(e) => {
                        const selectedValues = Array.from(
                          e.target.selectedOptions
                        ).map((option) => option.value);
                        setLocationId(selectedValues);
                      }}
                      required
                    >
                     <option value="" >
                        All
                      </option> }
                      {addresses.map((i) => {
                        return (
                          <option key={i.locationId} value={i.locationId}>
                            {i.fulladdress}
                          </option>
                        );
                      })}
                    </select> */}
                    <Multiselect
                      options={addresses.map((i) => ({
                        name: i.fulladdress,
                        id: i.locationId,
                      }))}
                      displayValue="name"
                      onSelect={(selectedList, selectedItem) => {
                        setLocationId(selectedList.map((item) => item.id));
                      }}
                      onRemove={(selectedList, selectedItem) => {
                        setLocationId(selectedList.map((item) => item.id));
                      }}
                      selectedValues={preSelected}
                    />
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
              <th>Delegated</th>
              <th>Access Level</th>
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
