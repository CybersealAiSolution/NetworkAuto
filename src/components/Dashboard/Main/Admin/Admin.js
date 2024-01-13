import React, { useState, useEffect, useRef } from "react";
import TableComponent from "./Table/Table";
import "./index.css";
import SearchIcon from "@mui/icons-material/Search";
// import { border, borderBottom } from "@mui/system";
// import AddButton from "./Button/index";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import BasicModal from "./Modal/Modal";
// import Slider from "./Slider/slider";
import { useSelector, useDispatch } from "react-redux";
import AddButton from "./Button";
import { instance } from "Fetch";
import { useNavigate } from "react-router-dom";
import useMediaQuery from "@mui/material/useMediaQuery";
import Typography from "@mui/joy/Typography";
import { Box } from "@mui/material";
import {
  DataGrid,
  GridPagination,
  useGridApiContext,
  GridToolbarContainer,
  GridToolbarExport,
} from "@mui/x-data-grid";
import LinearProgress from "@mui/material/LinearProgress";
import MuiPagination from "@mui/material/Pagination";
// import Filter from "./filter/filter";
// import { instance } from "Fetch";

const Admin = () => {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const anchorRef = useRef(null);

  const { roles } = useSelector((state) => state.users); // Use "state.users" here
  const searchInputRef = useRef(null);
  const [filter, setFilter] = useState({
    SearchAccessLevel: "ReadOnly",
    departmentDelegation: [],
    countryDelegation: [],
  });
  const [isUserDelelteModelOpen, setIsUserDelelteModelOpen] =
    React.useState(false); //to open modal
  const [deleteSelectedUser, setdeleteSelectedUser] = useState(null);

  const [isEdit, setIsEdit] = useState(false);
  const [editSliderData, setEditSliderData] = useState({});
  const [randomValue, setrandomValue] = useState(Math.random);
  const [searchQuery, setSearchQuery] = useState("");
  const [userList, setUserList] = useState([]);
  const [rowCount, setRowCount] = useState(0); // Total number of rows from the backend
  const [loading, setLoading] = useState(false);
  const [paginationModel, setPaginationModel] = React.useState({
    pageSize: 25,
    page: 0,
  });
  const [isSliderOpen, setIsSliderOpen] = useState(false);
  const [popperOpen, setPopperOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  

  const fetchData = async (paginationModel, searchQuery, filter) => {
    setLoading(true);
    const jsonString = JSON.stringify(filter);
    const encodedFilter = encodeURIComponent(jsonString);
    const tenantId = "xyz";
    try {
      const response = await instance.get(
        `/tenants/searchInUsers/${tenantId}?search=""&page=${
          paginationModel.page + 1
        }&page_size=${
          paginationModel.pageSize
        }&search_query=${searchQuery}&filter=${encodedFilter}`
      );

      if (response.status === 200) {
        setUserList(response.data.users); // Replacing instead of appending
        setRowCount(response.data.users.length); // Assuming the backend sends a 'total' field with total number of rows
      } else {
        console.error("Request failed with status:", response.status);
      }
    } catch (err) {
      console.error("Request failed to fetch tenants form data", err);
      if (err.response && err.response.status === 401) {
        if (err.response.data.redirect) {
          //   dispatch(
          //     setAlert({
          //       msg: err.response.data.message,
          //       status: "Failed",
          //     })
          //   );
          navigate("/");
        }
      } else {
        // dispatch(
        //   setAlert({
        //     msg: "Failed to fetch tenant admins form data",
        //     status: "Failed",
        //   })
        // );
      }
    }

    setLoading(false);
  };
  const handleClose = () => setIsUserDelelteModelOpen(false);
  const mediaQuery = useMediaQuery("(min-width: 1200px)");

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
          {(roles === "root" || roles === "admin") && (
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
          )}

          {(roles === "root" || roles === "admin") && (
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
          )}
          {/* <BasicModal open={open} userObject={params.row} handleClose={handleClose} /> */}
        </Box>
      ),
    },
    { field: "roles", headerName: "Access Level", flex: 1 },
    { field: "delegation", headerName: "Delegation", flex: 1 },
  ];

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

  function CustomPagination(props) {
    return <GridPagination ActionsComponent={Pagination} {...props} />;
  }

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
  const handleSearch = (event) => {
    event.preventDefault();
    console.log(searchQuery);
    setSearchQuery(event.target.value);
  };

  //for filter slider close
  const handleCloseSlider = () => {
    setIsSliderOpen(false);
    // setRandomValue(Math.random());
  };

  //for filter
  const handleApplyFilters = (filters) => {
    setFilter(filters);
    console.log(filters);
  };

//   const data =
//     userList &&
//     userList.map((user) => {
//       return {
//         id: user.id,
//         userName: user.userName,
//         roles: user.roles[0],
//         delegation: user.delegation ? "✅" : "❌",
//         countryDelegations: user.countryDelegations,
//         departmentDelegations: user.departmentDelegations,
//         callQueueDelegations: user.callQueueDelegations,
//         autoAttendantDelegations: user.autoAttendantDelegations,
//         parentId: user.parentId,
//         licenseDelegation: user.licenseDelegation,
//       };
//     });

  const handleChangePaginationModel = (params) => {
    setPaginationModel({
      pageSize: params.pageSize,
      page: params.page,
    });
  };
  useEffect(()=>{

  },[randomValue])
  return (
    <div className="Component">
      <div className="ComponentHeader">
        <Typography level="h1">Admin</Typography>
        {(roles === "root" || roles === "admin") && (
          <AddButton
            reload={() => fetchData(paginationModel, searchQuery, filter)}
            setrandomValue={setrandomValue}
          />
        )}
      </div>

      {/* <div className="tablediv">
        <DataGrid
          className="userInventory"
          rows={data}
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
      </div> */}
      <BasicModal
        open={isUserDelelteModelOpen}
        userObject={deleteSelectedUser}
        handleClose={handleClose}
        setrandomValue={setrandomValue}
      />
      <TableComponent randomValueOut={randomValue} setrandomValueOut={setrandomValue}/>
    </div>
    // <div className="adminComponent">
    //     <div className="adminComponentHeader">
    //         <h1 className="TableComponentTitle">Admins</h1>
    //     </div>
    //     <div className='tableBox'>
    //         <TableComponent/>
    //     </div>
    // </div>
  );
};

export default Admin;
