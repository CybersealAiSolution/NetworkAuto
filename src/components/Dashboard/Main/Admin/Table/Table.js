import React from "react";
import { useEffect, useState, useRef } from "react";
import "./index.css";
// import { instance } from "Fetch";
import { toast } from "react-toastify";
// import { Link } from "react-router-dom";
import { Multiselect } from "multiselect-react-dropdown";
import Pagination from "../../../../Pagination/Pagination";
import { FiEdit2 } from "react-icons/fi";
import { AiOutlineDelete } from "react-icons/ai";
import ReactModal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
// import { getCurrentUser } from "./store/userSlice/userDetailSlice";
import { getCurrentUser } from "./../../../../../store/modules/userSlice/userDetailSlice";
import { instance } from "Fetch";
import EditAdmin from "../editAdmin/editAdmin";
import LinearProgress from "@mui/material/LinearProgress";
import MuiPagination from "@mui/material/Pagination";
import {
  DataGrid,
  GridPagination,
  useGridApiContext,
  GridToolbarContainer,
  GridToolbarExport,
} from "@mui/x-data-grid";
import { Box } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";
const TableComponent = ({randomValueOut}) => {
  const { id, roles, delegations } = useSelector((state) => state.users); // Use "state.users" here
  const dispatch = useDispatch();
  const [isEdit, setIsEdit] = useState(false);
  const mediaQuery = useMediaQuery("(min-width: 1200px)");
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
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isSliderOpen, setIsSliderOpen] = useState(false);
  const [editSliderData, setEditSliderData] = useState({});
  const [isUserDelelteModelOpen, setIsUserDelelteModelOpen] = useState(false); //to open modal
  const [paginationModel, setPaginationModel] = React.useState({
    pageSize: 25,
    page: 0,
  });
  const searchInputRef = useRef(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [deleteSelectedUser, setdeleteSelectedUser] = useState(null);
  const [rowCount, setRowCount] = useState(0); // Total number of rows from the backend
  
  // useEffect(() => {
  //   dispatch(getCurrentUser());
  // }, [dispatch]);
  
  useEffect(() => {
    // let res;
    // dispatch(getCurrentUser());
    const getAllAdmins = async () => {
      try {
        const response = await instance.get(
          `/getalladmins?page=${currentPage}&search_query=${searchQuery}`
        );
        // res = await instance.get("/getCurrentUser");
        // dispatch(getCurrentUser());
        // localStorage.setItem("level", JSON.stringify(res.data.data.roles));
        // localStorage.setItem("currUser", JSON.stringify(res.data.data));

        // console.log("getAllAdmins", response.data);
        // console.log("res", res.data.data);
        // console.log(localStorage.getItem("level"));

        // console.log("getAllAdmins", response.data);
        setData(response.data.data ? response.data.data.records : []);
        setRowCount(response.data.totalPages ? response.data.totalPages : 1);
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

    // getAddresses();
    getAllAdmins();
  }, [randomValue, currentPage, dispatch,randomValueOut,searchQuery]);

  const handlePageChange = (pageNumber) => {
    console.log("changing....", pageNumber);
    setCurrentPage(pageNumber);
  };
  const columns = [
    // { field: 'id', headerName: 'Identity', flex:, headerClassName: "grey" },
    {
      field: "userName",
      headerName: "User",
      flex: 1.5,
      renderCell: (params) => (
        <Box
          className="centeredCell"
          sx={{
            width: "100%",
            display: "flex",
            gap: "5px",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          <Box
            sx={{
              whiteSpace: "pre-wrap",
              maxWidth: mediaQuery ? "90%" : "60%",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {params.value}
          </Box>
          {/* {(roles === "root" || roles === "admin") && (
            <EditIcon
              className="onHover"
              onClick={() => {
                setIsEdit(true);
                setIsSliderOpen(!isSliderOpen);
                setEditSliderData(params.row);
                console.log("xyz:", params.row);
              }}
              sx={{
                fontSize: "medium",
                marginLeft: "3px",
              }}
            />
          )} */}
          {(roles === "root" || roles === "admin") &&
            params.row.parentId !== "1234" &&
            (params.row.parentId === id || roles === "root") && (
              <FiEdit2
                style={{ cursor: "pointer" }}
                onClick={() => handleEditAdmin(params.row)}
              />
            )}

          {/* {(roles === "root" || roles === "admin") && (
            <DeleteIcon
              //className="onHover"
              onClick={() => {
                setIsUserDelelteModelOpen(true);
                setdeleteSelectedUser(params.row);
              }}
              sx={{
                fontSize: "medium",
                marginLeft: "3px",
              }}
            />
          )} */}
          {(roles === "root" || roles === "admin") &&
            params.row.parentId !== "1234" &&
            (params.row.parentId === id || roles === "root") && (
              <>
                <DeleteIcon
                  style={{
                    cursor: "pointer",
                    marginRight: "10px",
                    fontSize: "medium",
                    marginLeft: "3px",
                  }}
                  onClick={() => {
                    setItemToDelete(params.row);
                    setShowDeleteModal(true);
                  }}
                />
                <ReactModal
            isOpen={showDeleteModal}
            onRequestClose={() => setShowDeleteModal(false)}
            contentLabel="Delete Confirmation Modal"
            style={{
              overlay: {
                backgroundColor: "rgba(0, 0, 0, 0.1)", // Overlay background color
              },
              content: {
                width: "350px", // Set the width of the modal
                height: "200px",
                margin: "auto", // Center the modal horizontally
                borderRadius: "8px", // Rounded corners
                padding: "20px", // Add some padding
              },
            }}
          >
            <div style={{ textAlign: "center" }}>
              <p>Are you sure you want to delete?</p>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-evenly",
                  marginTop: "50px",
                }}
              >
                <button
                  style={{ backgroundColor: "red" }}
                  onClick={() => handleDelete(params.row)}
                >
                  Yes
                </button>
                <button
                  style={{
                    backgroundColor: "gray",
                  }}
                  onClick={() => setShowDeleteModal(false)}
                >
                  No
                </button>
              </div>
            </div>
          </ReactModal>
              </>
            )}
          {/* <BasicModal open={open} userObject={params.row} handleClose={handleClose} /> */}
        </Box>
      ),
    },
    { field: "roles", headerName: "Access Level", flex: 1 },
    { field: "delegation", headerName: "Delegation", flex: 1 },
  ];
  const handleEditAdmin = (data) => {
    setEditSliderData(data);

    // console.log("item", userName, roles, delegation);
    // setAdminEmail(userName);
    // setAccessLevel(roles[0]);
    // setLocationId(delegation);
    // const filteredAddresses = addresses.filter((address) =>
    //   delegation.includes(address.locationId)
    // );
    // const actualFilteredValue = filteredAddresses?.map((i) => ({
    //   name: i.fulladdress,
    //   id: i.locationId,
    // }));
    // setPreSelected(actualFilteredValue);
    // Setupdating(true);
    setSidebarOpen(!isSidebarOpen);
  };
  function Pagination({ page, onPageChange, className }) {
    const apiRef = useGridApiContext();
    const pageCount = Math.ceil(rowCount / paginationModel.pageSize);

    return (
      <MuiPagination
        color="primary"
        className={className}
        count={pageCount}
        page={page + 1}
        onChange={(event, newPage) => {
          onPageChange(event, newPage - 1);
        }}
      />
    );
  }
  const handleSearch = (event) => {
    event.preventDefault();
    console.log(searchQuery);
    setSearchQuery(event.target.value);
    
  };
  function CustomPagination(props) {
    return <GridPagination ActionsComponent={Pagination} {...props} />;
  }
  const handleChangePaginationModel = (params) => {
    setPaginationModel({
      pageSize: params.pageSize,
      page: params.page,
    });
  };
  const rowData = data?.map((user, i) => {
    return {
      id: i,
      userName: user.userName,
      roles: user.roles[0],
      delegation: user.delegations[0] !== "0" ? "✅" : "❌",
      parentId: user.parentId,
    };
  });
  function CustomGridToolbar(props) {
    useEffect(() => {
      if (searchInputRef.current) {
        searchInputRef.current.focus();
      }
    }, []);
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          gap: "20px",
          padding: "18px 24px",
          alignSelf: "stretch",
          height: "55px",
          borderBottom: "1px solid var(--grey-500, #E0E0E0)",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            width: "320px",
            height: "40px",
            padding: "12px 24px 12px 18px",
            gap: "12px",
            borderRadius: "36px",
            border: "1px solid var(--grey-500, #E0E0E0)",
            background: "var(--grey-100, #F8F9FA)",
          }}
        >
          <SearchIcon></SearchIcon>

          <input
            // key="search-input"
            ref={searchInputRef}
            style={{
              border: "none",
              backgroundColor: "var(--grey-100, #F8F9FA)",
              outline: "none",
            }}
            placeholder="Search for Admin"
            value={searchQuery}
            onChange={handleSearch}
          />
        </Box>

        {/* {roles !== "ReadOnly" && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                className="close-icon"
                onClick={() => {
                  setIsSliderOpen(!isSliderOpen);
                  setIsEdit(false);
                }}
              >
                <mask
                  id="mask0_150_283"
                  style={{ maskType: "alpha" }}
                  maskUnits="userSpaceOnUse"
                  x="0"
                  y="0"
                  width="24"
                  height="24"
                >
                  <rect width="24" height="24" fill="#D9D9D9" />
                </mask>
                <g mask="url(#mask0_150_283)">
                  <path
                    d="M10.25 17.7498V16.2499H13.75V17.7498H10.25ZM6.25 12.5575V11.0576H17.75V12.5575H6.25ZM3.25 7.36521V5.86523H20.75V7.36521H3.25Z"
                    fill="#1C1B1F"
                  />
                </g>
              </svg>
              )} */}
        {isSliderOpen && (
          <div
            className="overlay"
            onClick={() => {
              setIsSliderOpen(false);
              setIsEdit(!isEdit);
            }}
          ></div>
        )}
        {/* <Filter
              // setRandomValue={setRandomV}
              editSliderData={editSliderData}
              isEdit={isEdit}
              setIsEdit={setIsEdit}
              open={isSliderOpen}
              closeSlider={handleCloseSlider}
              onApplyFilters={handleApplyFilters}
              setrandomValue={setrandomValue}
            /> */}

        <GridToolbarContainer>
          <GridToolbarExport />
        </GridToolbarContainer>

        {/* <Box sx={{ gap: "15px" }}>
              <MoreVertOutlinedIcon
                cursor="pointer"
                        ref={anchorRef}
                onClick={() => setPopperOpen(prevState => !prevState)}
                    // sx={{py:'15px'}}
              />
                    
              <Popper
                open={popperOpen}
                anchorEl={anchorRef.current}
                placement="bottom-end"
                sx={{ bottom: "115px" }}
              >
                <Paper>
                  <Menu >
                    <MenuItem
                      disabled={
                        roles !== "ReadOnly"? false : true
                      }
                      onClick={() =>{
                        setModalOpen(true);
                        setPopperOpen(false);
                        //downloadAuditFileCsv(!props.isSliderOpen);
    
                      }}
                    >{" "}Edit Department{" "}
                    </MenuItem>
                  </Menu>
                </Paper>
              </Popper>
                    
            </Box>
    
            <ChangeDepartment 
              departmentModalOpen={modalOpen}
              setDepartmentModalOpen={setModalOpen}
            /> */}
      </Box>
    );
  }
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
    // setrandomValue(Math.random());
    setSidebarOpen(!isSidebarOpen);
  };

  const handleDelete = async (itemToDelete) => {
    try {
      // Perform API call to delete the item
      console.log("itemToDelete", itemToDelete);
      const response = await instance.delete(
        `deleteAdmin/${itemToDelete.userName}`
      );

      if (response.status === 204) {
        // Handle any additional UI updates after deletion, if needed
        setRandomValue(Math.random());
        toast.success(response.message);
        // Close the modal
        setShowDeleteModal(false);
      } else {
        console.error("Error deleting item. Server returned:", response);
        toast.error(response.message);
      }
    } catch (error) {
      // Handle error if the deletion fails
      console.error("Error deleting item:", error);
    }
  };

  // const DeleteConfirmationModal = ({ show, onClose, onDelete }) => {
  //   if (!show) {
  //     return null;
  //   }

  //   return (
  //     <div className="modal">
  //       <div className="modal-content">
  //         <p>Are you sure you want to delete?</p>
  //         <button onClick={onDelete}>Yes</button>
  //         <button onClick={onClose}>No</button>
  //       </div>
  //     </div>
  //   );
  // };

  const TableColumn = () =>
    data.map((item) => (
      <tr key={item.id}>
        <td>
          <input className="rowCheckbox" type="checkbox"></input>
        </td>
        <td>{item.userName} </td>
        <td>{item.delegations.includes("0") ? "❌ " : "✅"}</td>
        <td>{item.roles[0]}</td>
        <td>
          {(roles === "root" || roles === "admin") &&
            item.parentId !== "1234" &&
            (item.parentId === id || roles === "root") && (
              <FiEdit2
                style={{ cursor: "pointer" }}
                onClick={() => handleEditAdmin(item)}
              />
            )}
        </td>
        <td>
          {(roles === "root" || roles === "admin") &&
            item.parentId !== "1234" &&
            (item.parentId === id || roles === "root") && (
              <>
                <AiOutlineDelete
                  style={{ cursor: "pointer", marginRight: "10px" }}
                  onClick={() => {
                    setItemToDelete(item);
                    setShowDeleteModal(true);
                  }}
                />
              </>
            )}

          {/* Confirmation Modal */}
          <ReactModal
            isOpen={showDeleteModal}
            onRequestClose={() => setShowDeleteModal(false)}
            contentLabel="Delete Confirmation Modal"
            style={{
              overlay: {
                backgroundColor: "rgba(0, 0, 0, 0.1)", // Overlay background color
              },
              content: {
                width: "350px", // Set the width of the modal
                height: "200px",
                margin: "auto", // Center the modal horizontally
                borderRadius: "8px", // Rounded corners
                padding: "20px", // Add some padding
              },
            }}
          >
            <div style={{ textAlign: "center" }}>
              <p>Are you sure you want to delete?</p>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-evenly",
                  marginTop: "50px",
                }}
              >
                <button
                  style={{ backgroundColor: "red" }}
                  onClick={() => handleDelete(item)}
                >
                  Yes
                </button>
                <button
                  style={{
                    backgroundColor: "gray",
                  }}
                  onClick={() => setShowDeleteModal(false)}
                >
                  No
                </button>
              </div>
            </div>
          </ReactModal>
        </td>
      </tr>
    ));

  const handleCloseSlider = () => {
    setSidebarOpen(false);
  };

  // const handleApplyFilters = (filters) => {
  //   setaddAdmin(filters);
  //   console.log(filters);
  // };

  return (
    <>
      {isSidebarOpen && (
        <div
          className="overlay"
          onClick={() => {
            setSidebarOpen(false);
            setIsEdit(!isEdit);
          }}
        ></div>
      )}
      <EditAdmin
        open={isSidebarOpen}
        closeSlider={handleCloseSlider}
        editSliderData={editSliderData}
        setRandomValue={setRandomValue}
      />
      
      <div className="tablediv">
        <DataGrid
          className="userInventory"
          rows={rowData}
          columns={columns}
          rowCount={rowCount}
          paginationMode="server"
          paginationModel={paginationModel}
          onPaginationModelChange={handleChangePaginationModel}
          slots={{
            pagination: CustomPagination,
            toolbar: CustomGridToolbar,
            loadingOverlay: LinearProgress,
          }}
          loading={loading}
          checkboxSelection
          disableRowSelectionOnClick
          sx={{
            borderRadius: "20px",
            overflow: "hidden",
            background: "white",
          }}
        />
      </div>
      {/* <div className="tableComponent">
        <div className="tableHeader">
          {roles === "root" || roles === "admin" ? (
            <div
              onClick={() => setSidebarOpen(!isSidebarOpen)}
              className="addbtn"
            >
              + Add
            </div>
          ) : (
            <div></div>
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
          <EditAdmin
            open={isSidebarOpen}
            closeSlider={handleCloseSlider}
            locationId={locationId}
            accessLevel={accessLevel}
            adminEmail={adminEmail}
          />
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
                <th></th>
                <th></th>
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
      </div> */}
    </>
  );
};

export default TableComponent;
