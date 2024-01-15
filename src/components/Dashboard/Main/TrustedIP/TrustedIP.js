// import React from "react";
// import "./index.css";
// // import TableComponent from './Table/Table'
// import TableComponent from "./Table/Table";

// const TrustedIP = () => {
//   return (
//     <div className="activityComponent">
//       <div className="activityComponentHeader">
//         <h1 className="TableComponentTitle">Trusted IPs</h1>
//       </div>

//       <div className="tableBox">
//         <TableComponent />
//       </div>
//     </div>
//   );
// };

// export default TrustedIP;

import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import Typography from "@mui/joy/Typography";
import {
  DataGrid,
  gridPageCountSelector,
  GridToolbar,
  GridPagination,
  useGridApiContext,
  useGridSelector,
  GridToolbarContainer,
  GridToolbarExport,
} from "@mui/x-data-grid";
import LinearProgress from "@mui/material/LinearProgress";
import MuiPagination from "@mui/material/Pagination";
import { instance } from "Fetch";
// import "./index.css";
import { Box } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { border, borderBottom } from "@mui/system";
// import Button from "./Button/index";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import Tabs from '@mui/joy/Tabs';
import TabList from '@mui/joy/TabList';
import Tab, { tabClasses } from '@mui/joy/Tab';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { setAlert } from "../../../../store/alertSlice/alertSlice";
import AddButton from "./Button/index";

function TrustedIp() {
    const dispatch = useDispatch();
    let navigate = useNavigate();  
    const location = useLocation();
    const { roles } = useSelector((state) => state.users); // Use "state.users" here
  
  
    // Accessing state properties from the Redux store
    // const adminDetails = useSelector((state) => state.tenants);
  
    // console.log("object1", adminDetails);
  
    const searchInputRef = useRef(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [trustedIp, setTrustedIp] = useState([]);
    const [rowCount, setRowCount] = useState(0); // Total number of rows from the backend
    const [loading, setLoading] = useState(false);
    const [paginationModel, setPaginationModel] = React.useState({
      pageSize: 25,
      page: 0,
    });
  
    
    const fetchData = async (paginationModel, searchQuery) => {
      setLoading(true);
  
      try {
        const response = await instance.get(
          `/getTrustedIPs?search=${searchQuery}&page=${
            paginationModel.page + 1
          }&page_size=${paginationModel.pageSize}`
        );
  
        console.log(response.data.data);
        setTrustedIp(response.data.data);
        if (response.status === 200) {
          let data = response.data.data;

      // // Check if the data is coming from cache and needs parsing
      // if(response.data.messageStatus === "Cached"){
      //   data = JSON.parse(data);
      // }
          setTrustedIp(data.records);
          setRowCount(data.total);
        } else {
          console.error("Request failed with status:", response.status);
        }
      } catch (err) {
        console.error("Request to fetch Trusted IPs failed");
        toast.error(`${err.response.data.message}`);
        if (err.response && err.response.status === 401) {
          if (err.response.data.redirect) {
            // dispatch(
            //   setAlert({
            //     msg: err.response.data.message,
            //     status: err.response.data.messageStatus,
            //   })
            // );
              // Redirect the user to the homepage or login page. This depends on your routing library.
              navigate('/'); // Adjust this based on your frontend framework.
              
          }
      }
      // else{
      //   dispatch(
      //     setAlert({
      //       msg: err.response.data.message,
      //       status: err.response.data.messageStatus,
      //     })
      //   );
      // }   
      }
  
      setLoading(false);
    };
  
    // useEffect(() => {
    //   fetchData(paginationModel, searchQuery);
    // }, [paginationModel, searchQuery,dispatch]);

    useEffect(() => {
      // Define a function that you can call conditionally
      const doFetchData = () => {
        fetchData(paginationModel, searchQuery);
      };
  
      // Check the condition inside the effect
      if (searchQuery === "") {
        doFetchData();
      } else {
        // Set up a delay for the fetchData call
        const timeoutId = setTimeout(() => {
          doFetchData();
        }, 1500); // Adjust time as needed
  
        // Cleanup function to cancel the timeout if the component unmounts or any dependency changes
        return () => clearTimeout(timeoutId);
      }
      // Since you're referencing `searchQuery` inside useEffect, it should be included in the dependency array.
      // dispatch(getCurrentTenant());
    }, [paginationModel, searchQuery, dispatch]);
  
    const handleSearch = (event) => {
      event.preventDefault();
      setSearchQuery(event.target.value);
    };
  
    const data = trustedIp.map((user, index) => {
      return {
        id: index,
        Description: user.Description,
        IPAddress: user.IPAddress,
        MaskBits: user.MaskBits,
      };
    });
  
    const columns = [
      { field: "IPAddress", headerName: "IPAddress", width: 300 },
      { field: "MaskBits", headerName: "MaskBits", width: 300 },
      {
        field: "Description",
        headerName: "Description",
        width: 600,
      },
      
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
              ref={searchInputRef}
              style={{
                border: "none",
                backgroundColor: "var(--grey-100, #F8F9FA)",
                outline: "none",
              }}
              placeholder="Search for Location"
              value={searchQuery}
              onChange={handleSearch}
            />
          </Box>
  
          <GridToolbarContainer>
            <GridToolbarExport />
          </GridToolbarContainer>
        </Box>
      );
    }
  
    const handleChangePaginationModel = (params) => {
      setPaginationModel({
        pageSize: params.pageSize,
        page: params.page,
      });
    };
  
    function getRowClassName(params) {
      return "data-row";
    }
  
    return (
      <div className="Component">
        
        <div className="ComponentHeader">
          <Typography level="h1">Trusted IPs</Typography>
          {/* {roles !== 'ReadOnly' &&  */}
          {(roles === "root" || roles === "admin") && (
          <AddButton />
          )}
          {/*  } */}

        </div>
  
        <div className="tablediv">
          <DataGrid
            className="userInventory"
            rowClassName={getRowClassName}
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
        </div>
      </div>
    );
}

const mapStateToProps = (states) => {
    return { userinfo: states.UserInfo };
  };
  
export default connect(mapStateToProps)(TrustedIp);
  

