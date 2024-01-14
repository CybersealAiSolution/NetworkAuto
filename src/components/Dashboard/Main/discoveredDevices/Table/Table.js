import React, { useEffect, useState, useRef } from "react";
import { instance } from "../../../../../Fetch";
import "./index.css"; // Assuming you want to use the same CSS
// import Pagination from "../../../../Pagination/Pagination";
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
import SearchIcon from "@mui/icons-material/Search";
import { MdInfo } from "react-icons/md";
import Chip from "@mui/joy/Chip";

const DeviceTableComponent = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [paginationModel, setPaginationModel] = React.useState({
    pageSize: 25,
    page: 0,
  });
  const [loading, setLoading] = useState(false);
  const searchInputRef = useRef(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [rowCount, setRowCount] = useState(0); // Total number of rows from the backend

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handlePageChange = (pageNumber) => {
    console.log("changing....", pageNumber);
    setCurrentPage(pageNumber);
  };

  function Pagination({ page, onPageChange, className }) {
    const apiRef = useGridApiContext();
    const pageCount = Math.ceil(totalPage / paginationModel.pageSize);

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

  const filteredData = data.filter((item) => {
    return (
      item.short_description
        ?.toLowerCase()
        .includes(searchQuery?.toLowerCase()) ||
      item.model_id?.toLowerCase().includes(searchQuery?.toLowerCase()) ||
      item.ip_address?.toLowerCase().includes(searchQuery?.toLowerCase()) ||
      item.BSSID?.toLowerCase().includes(searchQuery?.toLowerCase()) ||
      item.ChassisID?.toLowerCase().includes(searchQuery?.toLowerCase()) ||
      item.msTeamsStatus?.toLowerCase().includes("not synced") ||
      item.location?.toLowerCase().includes(searchQuery?.toLowerCase())
    );
  });

  useEffect(() => {
    const getDevices = async () => {
      try {
        const response = await instance.get(`/devices/?page=${currentPage}`);
        if (response.data.error) {
          alert(response.data.error);
          return;
        }
        setData(response.data.data ? response.data.data : []);
        setTotalPage(response.data.totalPages ? response.data.totalPages : 1);
      } catch (error) {
        console.error("Error fetching devices:", error);
      }
    };
    getDevices();
  }, [currentPage]);

  const DeviceTableColumn = () =>
    filteredData?.map((item, index) => (
      <tr key={index}>
        <td>
          <input className="rowCheckbox" type="checkbox"></input>
        </td>
        <td>{item.short_description}</td>
        <td>{item.model_id}</td>
        <td>{item.ip_address}</td>
        <td>{item.BSSID}</td>
        <td>{item.ChassisID}</td>
        <td
          style={{
            color: item.msTeamsStatus === "Synced" ? "green" : "red",
          }}
        >
          {item.msTeamsStatus}
        </td>
        <td>{item.location}</td>
      </tr>
    ));
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
            placeholder="Search for Discovered Device"
            value={searchQuery}
            onChange={handleSearch}
          />
        </Box>
      </Box>
    );
  }

  const columns = [
    {
      field: "short_description",
      headerName: "Short Description",
      flex: 2,
      minWidth: 300,
    },
    { field: "model_id", headerName: "Model Id", flex: 1, minWidth: 100 },
    { field: "ip_address", headerName: "IP Address", flex: 1, minWidth: 100 },
    { field: "BSSID", headerName: "BSSID", flex: 1, minWidth: 100 },
    { field: "ChassisID", headerName: "ChassisID", flex: 1, minWidth: 100 },
    {
      field: "msTeamsStatus",
      headerName: "MSTeams Status",
      flex: 1,
      minWidth: 100,
      renderCell: (params) => (
        <>
          <Chip color={params.value === "Synced" ? "success" : "danger"}>
            {params.value}
          </Chip>
        </>
      ),
    },
    { field: "location", headerName: "Location", flex: 3, minWidth: 500 },
  ];

  const rowData = data?.map((item, i) => {
    return {
      id: i,
      short_description: item.short_description,
      model_id: item.model_id,
      ip_address: item.ip_address,
      BSSID: item.BSSID,
      ChassisID: item.ChassisID,
      location: item.location,
      msTeamsStatus: item.msTeamsStatus,
    };
  });

  return (
    <>
      <div className="tablediv">
        <DataGrid
          className="userInventory"
          rows={rowData}
          columns={columns}
          rowCount={totalPage}
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
          <div></div>
          <div className="tableSearchContainer">
            <input
              className="tableSearch"
              placeholder="Search for Devices"
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
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
                <th>Description</th>
                <th>Model ID</th>
                <th>IP Address</th>
                <th>BSSID</th>
                <th>ChassisID</th>
                <th>MsTeams Status</th>
                <th>Location</th>
              </tr>
            </thead>
            <tbody>
              <DeviceTableColumn />
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

export default DeviceTableComponent;
