import { instance } from "Fetch";
import "./index.css";
import ReactModal from "react-modal";
import { MdInfo } from "react-icons/md";
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
// import ReactModal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
// import { getCurrentUser } from "./store/userSlice/userDetailSlice";
import { getCurrentUser } from "./../../../../../store/modules/userSlice/userDetailSlice";
// import { instance } from "Fetch";
// import EditAdmin from "../editAdmin/editAdmin";
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

const TableComponent = () => {
  const [data, setData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDetails, setSelectedDetails] = useState([]);
  const [isJson, setIsJson] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [paginationModel, setPaginationModel] = React.useState({
    pageSize: 25,
    page: 0,
  });
  const [loading, setLoading] = useState(false);
  const filteredActivity = data.filter(
    (item) =>
      item.description?.toLowerCase().includes(searchTerm?.toLowerCase()) ||
      item.summary?.toLowerCase().includes(searchTerm?.toLowerCase()) ||
      item.userName?.toLowerCase().includes(searchTerm?.toLowerCase())
  );
  const searchInputRef = useRef(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [deleteSelectedUser, setdeleteSelectedUser] = useState(null);
  const [rowCount, setRowCount] = useState(0); // Total number of rows from the backend
  useEffect(() => {
    const geteventlogs = async () => {
      try {
        const response = await instance.get(
          `/eventlogs/getevents?page=${currentPage}`
        );
        if (response.data.error) {
          alert(response.data.error);
          return;
        } else {
          setData(response.data.data ? response.data.data : []);
          setTotalPage(response.data.totalPages ? response.data.totalPages : 1);
        }
      } catch (error) {
        // Handle any errors that may occur during the API call
        console.error("Error sending data:", error);
      }
    };
    geteventlogs();
  }, []);

  const transformAndOpenModal = (details) => {
    try {
      const parsedDetails = JSON.parse(details.replace(/'/g, '"')); //replacing " by ' this was throwing error without this logic and parsing it in json
      console.log(parsedDetails);
      setSelectedDetails(parsedDetails);
      setIsJson(true);
    } catch (error) {
      //it will be catched when details is in string format
      setSelectedDetails(details);
      setIsJson(false);
    }
    setIsModalOpen(true);
  };
  console.log("selectedDetails", selectedDetails);

  const handleSearch = (event) => {
    event.preventDefault();
    console.log(searchQuery);
    setSearchQuery(event.target.value);
  };
  const handlePageChange = (pageNumber) => {
    console.log("changing....", pageNumber);
    setCurrentPage(pageNumber);
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
            placeholder="Search for Activity"
            value={searchQuery}
            onChange={handleSearch}
          />
        </Box>
      </Box>
    );
  }
  const columns = [
    {
      field: "level",
      headerName: "Level",
      flex: 1,
      minWidth: 100,
      cellClassName: (params) => `log-level-${params.row.level.toLowerCase()}`,
      renderCell: (params) => (
        <>
          {params.row.level}
          {params.row.details ? (
            <MdInfo
              onClick={() => transformAndOpenModal(params.row.details)}
              style={{ color: "#007bff", cursor: "pointer", marginLeft: "5px" }}
            />
          ) : null}
        </>
      ),
    },
    {
      field: "userName",
      headerName: "User",
      flex: 3,
      minWidth: 300,
    },
    { field: "description", headerName: "Description", flex: 3, minWidth: 500 },
    { field: "summary", headerName: "Summary", flex: 3, minWidth: 500 },
    { field: "created", headerName: "TimeStamp", flex: 2, minWidth: 200 },
  ];
  const rowData = data?.map((item, i) => {
    return {
      id: i,
      userName: item.userName,
      level: item.level,
      description: item.description,
      summary: item.summary,
      created: item.created,
      details: item.details,
    };
  });

  return (
    <>
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
      <ReactModal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        contentLabel="Details Modal"
        className="modal-content"
        overlayClassName="modal-overlay"
      >
        <div className="modal-header">
          <h3>Event Details</h3>
          <span className="close-button" onClick={() => setIsModalOpen(false)}>
            X
          </span>
        </div>
        <div className="modal-body">
          {isJson ? (
            <div>
              {selectedDetails.map((detail, index) => (
                <div key={index}>
                  <strong>Description:</strong> {detail.description}
                  <br />
                  <strong>Location ID:</strong> {detail.locationId}
                  <br />
                  <strong>Device Type:</strong> {detail.deviceType}
                  <br />
                  <strong>Device Value:</strong> {detail.deviceValue}
                  <br />
                  <br />
                </div>
              ))}
            </div>
          ) : (
            <div>
              {typeof selectedDetails === "string" ? (
                <div>
                  {selectedDetails.split("\n").map((line, index) => (
                    <div key={index}>{line}</div>
                  ))}
                </div>
              ) : (
                <div>{selectedDetails}</div>
              )}
            </div>
          )}
        </div>
      </ReactModal>
    </>
  );
};

export default TableComponent;
