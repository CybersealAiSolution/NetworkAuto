// import React, { useState, useEffect } from "react";
import { Box, Stack } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import FormLabel from "@mui/joy/FormLabel";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import FormControl from "@mui/joy/FormControl";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Button from "@mui/material/Button";
import { Button as ButtonJoy, Typography } from "@mui/joy";
// import { setAlert } from "store/modules/alertSlice/alertSlice";
import Switch from "@mui/material/Switch";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import Fade from "@mui/material/Fade";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import { toast } from "react-toastify";
import React from "react";
import { useEffect, useState, useRef } from "react";
// import { instance } from "Fetch";
// import { Link } from "react-router-dom";
import { Multiselect } from "multiselect-react-dropdown";
import Pagination from "../../../../Pagination/Pagination";
import { FiEdit2 } from "react-icons/fi";
import { AiOutlineDelete } from "react-icons/ai";
import ReactModal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
// import { getCurrentUser } from "./store/userSlice/userDetailSlice";
import { getCurrentUser } from "../../../../../store/modules/userSlice/userDetailSlice";
import { instance } from "Fetch";

// import { getCurrentTenant } from "store/modules/tenantSlice/tenantDetailSlice";

// import "./filter.css";

const EditAdmin = (props) => {
  const { id, roles, delegations } = useSelector((state) => state.users); // Use "state.users" here
  const [loadingCountries, setLoadingCountries] = useState(false);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState(null);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [adminEmail, setAdminEmail] = useState(
    props.editSliderData.userName || ""
  );
  const [accessLevel, setAccessLevel] = useState(
    props.editSliderData.roles || "admin"
  );
  // const [delegation, setDelegation] = useState([]);
  const [locationId, setLocationId] = useState(props.locationId || []);
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

  useEffect(() => {
    setSidebarOpen(props.open);
    setAccessLevel(props.editSliderData.roles)
    setAdminEmail(props.editSliderData.userName)
    // setLocationId(props.locationId)
    if(props.open===false){
      setPreSelected([]);
    }
    // let res;
    // dispatch(getCurrentUser());
    // const getAllAdmins = async () => {
    //   try {
    //     const response = await instance.get(
    //       `/getalladmins?page=${currentPage}`
    //     );
    //     // res = await instance.get("/getCurrentUser");
    //     // dispatch(getCurrentUser());
    //     // localStorage.setItem("level", JSON.stringify(res.data.data.roles));
    //     // localStorage.setItem("currUser", JSON.stringify(res.data.data));

    //     // console.log("getAllAdmins", response.data);
    //     // console.log("res", res.data.data);
    //     // console.log(localStorage.getItem("level"));

    //     // console.log("getAllAdmins", response.data);
    //     setData(response.data.data ? response.data.data : []);
    //     setTotalPage(response.data.totalPages ? response.data.totalPages : 1);
    //     if (response.data.error) {
    //       alert(response.data.error);
    //       return;
    //     } else {
    //       // navigate("/");
    //       console.log("getalladmins success");
    //     }
    //   } catch (error) {
    //     // Handle any errors that may occur during the API call
    //     console.error("Error sending data:", error);
    //   }
    // };
    const getAddresses = async () => {
      try {
        setLoadingCountries(true);
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
              ? [{ fulladdress: "All", locationId: "0" }, ...response.data.data.records]
              : []
          );
          console.log(addresses, "addresses");
        } else {
          setAddresses(response.data.data.records || []);
        }
        setLoadingCountries(false);
      } catch (error) {
        console.error("Error fetching devices:", error);
      }
    };
    if(props.open===true){
      getAddresses();
    }
    // getAllAdmins();
  }, [randomValue, currentPage, dispatch,props.editSliderData]);

  const handlePageChange = (pageNumber) => {
    console.log("changing....", pageNumber);
    setCurrentPage(pageNumber);
  };

  // const handleEditAdmin = ({ userName, roles, delegations }) => {
  //   console.log("item", userName, roles, delegations);
  //   setSidebarOpen(!isSidebarOpen);
  //   setAdminEmail(userName);
  //   setAccessLevel(roles[0]);
  //   setLocationId(delegations);
  //   const filteredAddresses = addresses.filter((address) =>
  //     delegations.includes(address.locationId)
  //   );
  //   const actualFilteredValue = filteredAddresses?.map((i) => ({
  //     name: i.fulladdress,
  //     id: i.locationId,
  //   }));
  //   setPreSelected(actualFilteredValue);
  //   Setupdating(true);
  // };

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

  const CustomWidthTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} placement="right" />
  ))({
    [`& .${tooltipClasses.tooltip}`]: {
      maxWidth: 200,
    },
  });

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

  const handleFilterClick = (e) => {
    e.stopPropagation();
  };

  const handleCloseClick = (e) => {
    e.stopPropagation();
    setAdminEmail("");
    setAccessLevel("admin");
    setLocationId([]);
    setPreSelected([]);
    // setIsLicenseDelegation(false);
    // setSelectFilterData(defaultFilterData);
    props.closeSlider();
  };

  const handleApplyClick = async (e) => {
    e.preventDefault();
    if (!adminEmail) {
      toast.error("Please Enter Email Address!!");
      return;
    }
    if (locationId.length === 0) {
      toast.error("Please Select Location!!");
      return;
    }
    const payload = {
      userName: adminEmail,
      roles: accessLevel,
      locationId: locationId,
      parentId: id,
    };
    console.log("payload", payload);
    try {
      // if (!updating) {
      //   const response = await instance.post("/addAdmin", payload);
      //   if (response.status === 201) {
      //     toast.success("Successfully Added User!!");
      //   } else {
      //     toast.error("Failed to Add User");
      //   }
      // } else {
        const response = await instance.post("/updateAdmin", payload);
        if (response.status === 201) {
          toast.success("Successfully Updated User!!");
          props.setRandomValue(Math.random());
          props.closeSlider();
          setLocationId([]);
        } else {
          toast.error("Failed to Update User");
        }
      // }
    } catch (error) {
      console.error("Error sending data:", error);
      toast.error("An error occurred");
    }
    setRandomValue(Math.random());
    setSidebarOpen(!isSidebarOpen);
  };

  const handleCountryChange = (event, newValue) => {
    console.log("newval:", newValue);

    setPreSelected(newValue);
    setLocationId(newValue?.map((i) => i.locationId));
  };
  console.log("xxx", props.editSliderData);
  return (
    <Box
      className={`slider ${props.open ? "open" : ""}`}
      onClick={handleFilterClick}
      sx={{
        "&::-webkit-scrollbar": {
          width: "5px",
        },
        "&::-webkit-scrollbar-track": {
          boxShadow: "inset 0 0 5px grey",
          borderRadius: "10px",
        },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: "rgba(0, 0, 0, .5)",
          borderRadius: "10px",
        },
        "&::-webkit-scrollbar-thumb:hover": {
          backgroundColor: "rgba(0, 0, 0, .8)",
        },
        scrollbarWidth: "thin",
        scrollbarColor: "rgba(0, 0, 0, .5) grey",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          gap: "48px",
          alignSelf: "stretch",
        }}
      >
        <Box
          className="top"
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            alignSelf: "stretch",
          }}
        >
          <Box
            sx={{
              color: "var(--grey-800, #404B5A)",
              marginLeft: "6%",
            }}
          >
            <Typography level="h2">Update Admin</Typography>
          </Box>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            onClick={handleCloseClick}
            className="close-icon"
            style={{ cursor: "pointer" }}
          >
            <mask
              id="mask0_420_1046"
              style={{ maskType: "alpha" }}
              maskUnits="userSpaceOnUse"
              x="0"
              y="0"
              width="24"
              height="24"
            >
              <rect width="24" height="24" fill="#D9D9D9" />
            </mask>
            <g mask="url(#mask0_420_1046)">
              <path
                d="M6.40002 18.6534L5.34619 17.5995L10.9462 11.9995L5.34619 6.39953L6.40002 5.3457L12 10.9457L17.6 5.3457L18.6538 6.39953L13.0538 11.9995L18.6538 17.5995L17.6 18.6534L12 13.0534L6.40002 18.6534Z"
                fill="#404B5A"
              />
            </g>
          </svg>
        </Box>

        {/* <form className="addUserForm" onSubmit={submitForm}>
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
        </form> */}

        <Stack
          spacing={2}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: "10px",
            width: "380px",
            height: "100%",
            marginLeft: "7%",
          }}
        >
          <FormControl>
            <FormLabel>Email</FormLabel>

            <TextField
              id="outlined-basic"
              // label="Admin"

              rows={1} // You can adjust the number of rows as per your requirements
              variant="outlined"
              value={adminEmail}
              onChange={(e) => setAdminEmail(e.target.value)}
              style={{ width: "380px" }}
            />
          </FormControl>

          <FormControl>
            <FormLabel>
              Select Access Level
              <CustomWidthTooltip
                title="Only Full Access level users can add other admin in the tenant"
                placement="right"
                arrow
                TransitionComponent={Fade}
                TransitionProps={{ timeout: 600 }}
              >
                <HelpOutlineIcon fontSize="small" sx={{ mx: "5px" }} />
              </CustomWidthTooltip>
            </FormLabel>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="ReadOnly"
              name="radio-buttons-group"
              value={accessLevel}
              onChange={(e) => setAccessLevel(e.target.value)}
            >
              <FormControlLabel
                value="ReadOnly"
                control={<Radio />}
                label="Read Only"
              />
              <FormControlLabel
                value="ReadAndWrite"
                control={<Radio />}
                label="Read & Write"
              />
              <FormControlLabel
                value="admin"
                control={<Radio />}
                label="Full Access"
              />
            </RadioGroup>
          </FormControl>

          <FormControl>
            <FormLabel>Delegation by Location</FormLabel>
            <Autocomplete
              multiple
              id="checkboxes-tags-demo"
              options={addresses}
              isLoading={loadingCountries}
              loadingText="Loading..." // This prop sets the text displayed during loading
              disableCloseOnSelect
              getOptionLabel={(option) => option.fulladdress}
              isOptionEqualToValue={
                (option, value) => option.locationId === value.locationId // Corrected to compare by id
              }
              // onInputChange={handleCountryInputChange} // Added this prop
              renderOption={(props, option, { selected }) => (
                <li {...props}>
                  <Checkbox
                    icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                    checkedIcon={<CheckBoxIcon fontSize="small" />}
                    style={{ marginRight: 8 }}
                    checked={selected}
                  />
                  {option.fulladdress}
                </li>
              )}
              style={{ width: "380px" }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  // Add the loading prop to TextField as well to show a progress indicator
                  InputProps={{
                    ...params.InputProps,
                    endAdornment: (
                      <>
                        {loadingCountries ? (
                          <CircularProgress color="inherit" size={20} />
                        ) : null}
                        {params.InputProps.endAdornment}
                      </>
                    ),
                  }}
                />
              )}
              value={preSelected}
              onChange={handleCountryChange}
            />
            {/* <Multiselect
              options={addresses.map((i) => ({
                name: i.fulladdress,
                id: i.locationId,
              }))}
              style={{ width: "100%" }}
              displayValue="name"
              onSelect={(selectedList, selectedItem) => {
                setLocationId(selectedList.map((item) => item.id));
              }}
              onRemove={(selectedList, selectedItem) => {
                setLocationId(selectedList.map((item) => item.id));
              }}
              selectedValues={preSelected}
            /> */}
          </FormControl>
        </Stack>
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "flex-end",
          width: "100%",
          gap: "10px",
        }}
      >
        <ButtonJoy
          variant="outlined"
          type="button"
          sx={{
            backgroundColor: "#fff",
            color: "#000",
            border: "1px solid black",
            "&:hover": {
              border: "1px solid black",
            },
          }}
          onClick={handleCloseClick}
        >
          Cancel
        </ButtonJoy>
        <ButtonJoy
          type="button"
          //className="btn btn-dark"
          variant="outlined"
          sx={{
            backgroundColor: "#000",
            color: "white",
            "&:hover": {
              backgroundColor: "black",
              color: "white",
            },
          }}
          onClick={handleApplyClick}
          loading={isLoading}
          loadingPosition="start"
        >
          Update
        </ButtonJoy>
      </Box>
    </Box>
  );
};

export default EditAdmin;
