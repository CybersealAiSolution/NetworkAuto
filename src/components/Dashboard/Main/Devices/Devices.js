import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import Typography from "@mui/joy/Typography";
import { GrDocumentCsv } from "react-icons/gr";
import { saveAs } from 'file-saver'; // Import the saveAs function
import {
  DataGrid,
  GridPagination,
  useGridApiContext,
  GridToolbarContainer,
  GridToolbarExport,
} from "@mui/x-data-grid";
import LinearProgress from "@mui/material/LinearProgress";
import MuiPagination from "@mui/material/Pagination";
import CircularProgress from '@mui/joy/CircularProgress';
import { instance } from "Fetch";
import "./index.css";
import { Box } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
// import { border, borderBottom } from "@mui/system";
import AddButton from "./Button/index";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useSelector, useDispatch } from "react-redux";
import { setAlert } from "store/alertSlice/alertSlice";
import { useNavigate } from "react-router-dom";
import useMediaQuery from '@mui/material/useMediaQuery'
import { toast } from "react-toastify";
// import { getCurrentTenant } from "../../../../store/modules/tenantSlice/tenantDetailSlice"
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/MenuList";
import Popper from "@mui/material/Popper";
import Paper from "@mui/material/Paper";
import { ClickAwayListener } from "@mui/base/ClickAwayListener";

function AdminComponent(props) {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const anchorRef = useRef(null);
  const { roles } = useSelector((state) => state.users); // Use "state.users" here
  

//   const {  roles, tenantId } = useSelector((state) => state.users); // Use "state.users" here
  const searchInputRef = useRef(null);
  const [isLoading,setIsLoading] = useState(false);

  const [isLoadingForTenant,setIsLoadingForTenant] = useState(false);

  

  const [randomValue, setrandomValue] = useState(Math.random);
  const [searchQuery, setSearchQuery] = useState("");
  const [userList, setUserList] = useState([]);
  const [tenantDetails,setTenantDetails] = useState(null);
  const [rowCount, setRowCount] = useState(0); // Total number of rows from the backend
  const [selectedRowData,setSelectedRowData] = useState([]);
  const [paginationModel, setPaginationModel] = React.useState({
    pageSize: 25,
    page: 0,
  });


  
  const fetchData = async (paginationModel, searchQuery) => {
    setIsLoading(true);
    // const jsonString = JSON.stringify(filter);
    // const encodedFilter = encodeURIComponent(jsonString);

    try {
      const response = await instance.get(
        `/unSyncedDevices/?&page=${paginationModel.page + 1
        }&page_size=${paginationModel.pageSize
        }&search=${searchQuery}`
      );

      if (response.status === 200) {
      setUserList(response.data.data?.data ? response.data.data?.data : []); // Replacing instead of appending
      setRowCount(response.data.data?.total ? response.data.data?.total : 1); // Assuming the backend sends a 'total' field with total number of rows
     } else {
        console.error("Request failed with status:", response.status);
      }
    } catch (err) {
      console.error("Request failed to fetch tenants form data", err);
      toast.error(`${err.response.data.message}`);
      if (err.response && err.response.status === 401) {
        if (err.response.data.redirect) {
          toast.error(err.response.data.message);
          navigate('/');
        }
      } 
      else {
        toast.error('Failed to fetch tenant admins form data');
      }
    }

    setIsLoading(false);
  };

  
  useEffect(() => {
    // Define a function that you can call conditionally
    const doFetchData = () => {
      fetchData(paginationModel, searchQuery);
    };

    // Check the condition inside the effect
    if (searchQuery === "") {
    //   if (tenantId) {
        doFetchData();
    //   }
    } else {
      // Set up a delay for the fetchData call
      const timeoutId = setTimeout(() => {
        // if (tenantId) {
          doFetchData();
        // }
      }, 1500); // Adjust time as needed

      // Cleanup function to cancel the timeout if the component unmounts or any dependency changes
      return () => clearTimeout(timeoutId);
    }
    // Since you're referencing `searchQuery` inside useEffect, it should be included in the dependency array.
  }, [paginationModel, searchQuery, randomValue]);

  const fetchTenantDetail = async () => {
    setIsLoadingForTenant(true);
    try {
      const response = await instance.get(
        `alerts/tenantDetails`
      );

      if (response.status === 200) {
        setTenantDetails(response.data.data);
      } else {
        console.error("Request failed with status:", response.status);
      }
    } 
    catch (err) {
      console.error("Request failed to fetch tenants details", err);
      toast.error(`${err.response.data.message}`);
      if (err.response && err.response.status === 401) {
        if (err.response.data.redirect) {
          toast.error(err.response.data.message);
          navigate('/');
        }
      } 
      else {
        toast.error('Failed to fetch tenant Detail Data');
      }
    }
    finally{
      setIsLoadingForTenant(false);
    }

   
  };

  useEffect(()=> {
    fetchTenantDetail();
  },[]);

  const handleSearch = (event) => {
    event.preventDefault();
    console.log(searchQuery);
    setSearchQuery(event.target.value);
  };

  

  const handleCSVDownload = async () => {
    try {
      const response = await instance.get("/getunSyncedDeviceCSV/", {
        responseType: 'blob', // Set responseType to 'blob'
      });
      console.log('xxxxxxxxxxxx')
      if (response.data.err_msg) {
        alert(response.data.err_msg);
        return;
      }

      // Create a Blob from the response data
      const blob = new Blob([response.data], { type: 'text/csv' });

      // Use the FileSaver library to save the Blob as a file
      saveAs(blob, 'unsynced_devices.csv'); // Change the filename as needed

    } catch (error) {
      console.error("Error fetching devices:", error);
    }
  };


  const data =
      userList &&
      userList.map((user) => {
        return {
            id: user.id,
            // id: index,
            short_description: user.short_description,
            model_id: user.model_id ,
            ip_address: user.ip_address,
            BSSID: user.BSSID,
            ChassisID: user.ChassisID,
            msTeamsStatus: user.msTeamsStatus,
            location: user.location,
        };
      });

  
  const mediaQuery = useMediaQuery("(min-width: 1200px)")

  const columns = [
    
    {
      field: "short_description",
      headerName: "Description",
    //   flex: 1.5,
    width:400,
    
    },
    { field: "model_id", headerName: "Model ID", width:400, },
    { field: "ip_address", headerName: "Subnet", width:400, },
    { field: "BSSID", headerName: "BSSID", width:400, },
    { field: "ChassisID", headerName: "ChassisID", width:400, },
    { field: "location", headerName: "Location", width:400, },
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
        <GrDocumentCsv
            style={{ fontSize: "25px", marginTop: "5px", cursor: "pointer" }}
            onClick={handleCSVDownload}
        />
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

        
        {/* {isSliderOpen && (
          <div
            className="overlay"
            onClick={() => {
              setIsSliderOpen(false);
              setIsEdit(!isEdit);
            }}
          ></div>
        )} */}
        

        {/* <GridToolbarContainer>
          <GridToolbarExport />
        </GridToolbarContainer> */}

        

      </Box>
    );
  }

  const handleRowSelection = (e) => {
    // Assuming 'data' holds all the rows data you've fetched from your API
    
    console.log("selectedData",e);
    // console.log("selectedData",row);
    const selectedData = e.map((id) =>
      data.find((row) => row.id === id)
    );
    console.log("selectedData-1223",selectedData)
    setSelectedRowData(selectedData);
  };
  
  const handleChangePaginationModel = (params) => {
    setPaginationModel({
      pageSize: params.pageSize,
      page: params.page,
    });
  };
//   console.log('roles', roles)
  return (
    <Box sx={{
        width:"95%",
        height:"100%",
        margin:"auto",
        display:"flex",
        flexDirection:"column"
      }}>
        
        <Box sx={{
          display:"flex",
          justifyContent:"space-between",
          paddingTop:"2.3%",
          paddingBottom:"2.3%",
          width: "100%",
        }}>
        <Typography level="h1">Devices Inventory</Typography>
        {/* {(roles === "root" || roles === "admin") &&  ( */}
        {((roles === "root" || roles === "admin") && tenantDetails?.serviceNowCredentials) && (
          <AddButton 
              reload={() => fetchData(paginationModel, searchQuery)} selectedRowData={selectedRowData}
          />
        )}
        {/* )} */}
        </Box>

        {isLoadingForTenant ? (
          <Box sx={{
            height:"70vh",
            display:"flex",
            justifyContent:"center",
            alignItems:"center",
          }}>
            <CircularProgress variant="solid" size="lg"/>
          </Box>
        ) : 
          (tenantDetails?.serviceNowCredentials ? ( 
            <Box 
            className="tablediv"
        //     sx={{
        //     flexGrow:1,
        //     // height:"70%",
        //     height:"700px",
        //     overflowY:"auto",
        //     marginBottom:"15px",
            
        //   }}
          >
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
              loading={isLoading}
              checkboxSelection
              onRowSelectionModelChange={(e) => { handleRowSelection(e)}}
            //   onSelectionModelChange={() => handleRowSelection()}
              disableRowSelectionOnClick
              sx={{
                
                // height:"700px",
                borderRadius: "20px",
                overflow: "hidden",
                background: "white",
              }}
            />
            </Box>
          ) : (
            <Box sx={{
              height:"70vh",
              display:"flex",
              justifyContent:"center",
              alignItems:"center",
            }}>
              <Typography>
                Please fill the service Now credentials!!!
              </Typography>
            </Box>
          )
          )
        }
      
    </Box>
  );
}

const mapStateToprops = (states) => {
  return { userinfo: states.UserInfo };
};

export default connect(mapStateToprops)(AdminComponent);
