// import React from "react";
// import "./index.css";
// import TableComponent from "./Table/Table";

// const Location = () => {
//   return (
//     <div className="locationComponent">
//       <div className="locationComponentHeader">
//         <h1 className="TableComponentTitle">Locations</h1>
//       </div>
//       <div className="tableBox">
//         <TableComponent />
//       </div>
//     </div>
//   );
// };

// export default Location;

import React, { useState, useEffect, useRef } from "react";
import { connect, useSelector, useDispatch } from "react-redux";
import Typography from "@mui/joy/Typography";
import {
  DataGrid,
  GridPagination,
  useGridApiContext,
  GridToolbarContainer,
  GridToolbarExport,
} from "@mui/x-data-grid";
import LinearProgress from "@mui/material/LinearProgress";
import MuiPagination from "@mui/material/Pagination";
import { instance } from "Fetch";
import "./index.css";
import { Box, styled,Button } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { setAlert } from "../../../../store/alertSlice/alertSlice";
import { Link ,useLocation} from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import Tabs from '@mui/joy/Tabs';
import TabList from '@mui/joy/TabList';
import Tab, { tabClasses } from '@mui/joy/Tab';


// Initially, hide the copy icon for all rows
const HiddenIconStyle = styled(ContentCopyIcon)({
  display: "none",
});

// Show the copy icon when its row is hovered
const HoverableRowStyle = styled(Box)({
  "&:hover .onHover": {
    display: "inline-block", // or 'block', depending on your requirements
  },
});

function LocationComponent(props) {
  const dispatch = useDispatch();
  let navigate = useNavigate();  
  const location = useLocation();
  const { roles } = useSelector((state) => state.users);

  // Accessing state properties from the Redux store
  const adminDetails = useSelector((state) => state.tenants);

  console.log("object1", adminDetails);

  const searchInputRef = useRef(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [userList, setUserList] = useState([]);
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
        `/getEmergencyAddresses?search=${searchQuery}&page=${
          paginationModel.page + 1
        }&page_size=${paginationModel.pageSize}`
      );

      console.log("data",response.data.data);
      setUserList(response.data.data.records || []);
      if (response.status === 200) {
        let data = response.data.data.records || [];

      // // Check if the data is coming from cache and needs parsing
      // if(response.data.messageStatus === "Cached"){
      //   data = JSON.parse(data);
      // }
        setUserList(data);
        setRowCount(data.total);
      } else {
        console.error("Request failed with status:", response.status);
      }
    } catch (err) {
      console.error("Request to fetch emergency addresses failed");
      toast.error(`${err.response.data.message}`);
      if (err.response && err.response.status === 401) {
        if (err.response.data.redirect) {
          navigate('/'); // Adjust this based on your frontend framework.
            
        }
      }
     
    }

    setLoading(false);
  };

  
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

  const copyLocationId = (locationId) => {
    navigator.clipboard.writeText(locationId);
  };

  console.log("data-123",userList)
  const data = userList.map((user, index) => {
    return {
      id: index,
      description: user.description,
      country:user.Country,
      address: user.fulladdress,
      locationId: user.locationId,
    };
  });

  const columns = [
    {
      field: "description",
      headerName: "Description",
      // flex: 1,
      width:300,
      renderCell: (params) => (
        <>
        {console.log("params.val",params.val)}
          <Link to={`/dashboard/location/address/${params.row.locationId}`}>
            {params.value}
          </Link>
        </>
      ),
    },
    { field: "country", headerName: "Country", width:150, },
    { field: "address", headerName: "Address", width:500,  },
    {
      field: "locationId",
      headerName: "Location ID",
      // flex: 1,
      width:350,
      renderCell: (params) => (
        <HoverableRowStyle className="centeredCell">
          {params.value}
          <HiddenIconStyle
            className="onHover"
            onClick={() => {
              copyLocationId(params.row.locationId);
              toast.success('Copied...');
            }}
            sx={{
              fontSize: "medium",
              marginLeft: "3px",
            }}
          >
            Copy
          </HiddenIconStyle>
        </HoverableRowStyle>
      ),
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
        <Typography level="h1">Location</Typography>
        {/* {(roles ==="root" || roles==="ReadAndWrite" || roles === 'admin') &&  ( */}
          
        {(roles === "root" || roles === "admin") && (
          <Button
            variant="contained"
            // disabled={adminDetails.roles === "ReadOnly"}
            disableElevation
            sx={{
              height: "50px",
              backgroundColor: "#000",
              color: "white",
              borderRadius: "7px",
              paddingX: "15px",
              "&:hover": {
                backgroundColor: "black",
                color: "white",
              },
            }}
            component={Link}
            to="/dashboard/location/add-address"
          >
            + Add Location
          </Button>
        )}
        {/* )} */}
      </Box>

      <Box 
        className="tablediv"
      //   sx={{
      //   flexGrow:1,
      //   height:"500px",
      //   overflowY:"auto",
      //   marginBottom:"15px",
      // }}
      >
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
            // height:"50%",

            background: "white",
          }}
        />
      </Box>
    </Box>
  );
}

const mapStateToProps = (states) => {
  return { userinfo: states.UserInfo };
};

export default connect(mapStateToProps)(LocationComponent);

