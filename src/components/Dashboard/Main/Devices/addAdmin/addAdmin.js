import React, { useState, useEffect } from "react";
import { Box, Stack, Typography } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import FormLabel from "@mui/joy/FormLabel";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import FormControl from "@mui/joy/FormControl";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { instance } from "Fetch";
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Button from "@mui/material/Button";
import { Button as ButtonJoy,Autocomplete as JoyAutocomplete } from "@mui/joy";
import { setAlert } from "store/alertSlice/alertSlice";
import { useDispatch, useSelector } from "react-redux";
import Switch from '@mui/material/Switch';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import Fade from '@mui/material/Fade';
import { styled } from '@mui/material/styles';
import { ToastContainer,toast } from "react-toastify";
// import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
// import { getCurrentTenant } from "store/modules/tenantSlice/tenantDetailSlice";

// import "./filter.css";

const AddAdmin = ({open,closeSlider,fetchData,selectedRowData}) => {
  // const { id, tenantId , roles} = useSelector((state) => state.users); // Use "state.users" here
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const [isLoading,setIsLoading] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const [choosenAddress,setChoosenAddress] = useState(null);
  const [placeList,setPlaceList] = useState([]);
  const [choosenPlace,setChoosenPlace] = useState(null);
  const [typeList, setTypeList] = useState(["Subnet","Switch","Access Points"]);
  const [choosenType, setChoosenType] = useState("");
  
  const getAddresses = async () => {
    try {
      const response = await instance.get(`/getEmergencyAddresses`);
      if (response.data.error) {
        alert(response.data.error);
        return;
      }
      setAddresses(response.data.data.records || []);
    } catch (error) {
      console.error("Error fetching devices:", error);
    }
  };

  const getPlaces = async (parentLocationID) => {
    try {
      const response = await instance.get(
        `/getlocationsdetail/places/${parentLocationID}`
      );
      if (response.data.error) {
        alert(response.data.error);
        return;
      }
      console.log("response.data", response.data);
      setPlaceList(response.data.data.places ? response.data.data.places : []);
    } catch (error) {
      console.error("Error fetching devices:", error);
    }
  };

  

  const CustomWidthTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} placement="right" />
  ))({
    [`& .${tooltipClasses.tooltip}`]: {
      maxWidth: 200,
    },
  });

  
  
  useEffect(() => {
    if (open) {
      getAddresses();
    }
  }, [open]);





  const handleFilterClick = (e) => {
    e.stopPropagation();
    
  };

  const handleCloseClick = (e) => {
    e.stopPropagation();
    setChoosenAddress(null);
    setChoosenPlace(null);
    setChoosenType("");
    closeSlider();
    
  };






  const handleAddressChange = (event, newValue) => {
    console.log("newval:", newValue);
    setChoosenAddress(newValue);
    if(newValue)getPlaces(newValue.locationId);
    else {setChoosenPlace(null);setChoosenType("");}

  };

  const handlePlaceChange = (e,newValue) => {
    console.log("newval123:", newValue);
    setChoosenPlace(newValue);
    if(!newValue)setChoosenType("");
  }

  const handleTypeChange = (event, newValue) => {
    console.log("newval12345:", newValue);
    setChoosenType(newValue);
  };

  

  
  const handleApplyClick = async (event) => {
    event.preventDefault();
    if (selectedRowData.length === 0) {
      toast.error("Please Select a device!!");
      closeSlider();
      return;
    }
    setIsLoading(true);
    const deviceValue = selectedRowData.map((item) => {
      if (choosenType === "Subnet") {
        return item.ip_address;
      } else if (choosenType === "Switch") {
        return item.ChassisID;
      } else if (choosenType === "Access Points") {
        return item.BSSID;
      } else {
        return "";
      }
    });

    

    const payload = {
      locationId: choosenPlace.LocationId,
      deviceType: choosenType,
      description: selectedRowData.map((item) => {
        return item.short_description;
      }),
      deviceValue: deviceValue,
    };

    try {
      const response = await instance.post(`/addbulkdevice`, payload, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      // Handle the response as needed
      if (response?.data.error) {
        alert(response.data.error);
        return;
      } else {
        toast.success("Request Accepted, Please wait few minutes!!");
      }
    } catch (error) {
      // Handle any errors that may occur during the API call
      console.error("Error sending data:", error);
      toast.error(`${error.response.data.message}`);
    }

    
    setIsLoading(false);
    closeSlider();
  };

  

  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;

  return (
    <Box
      className={`slider ${open ? "open" : ""}`}
      onClick={handleFilterClick}
      sx={{
        '&::-webkit-scrollbar': {
          width: '5px',
        },
        '&::-webkit-scrollbar-track': {
          boxShadow: 'inset 0 0 5px grey',
          borderRadius: '10px',
        },
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: 'rgba(0, 0, 0, .5)',
          borderRadius: '10px',
        },
        '&::-webkit-scrollbar-thumb:hover': {
          backgroundColor: 'rgba(0, 0, 0, .8)',
        },
        scrollbarWidth: 'thin',
        scrollbarColor: 'rgba(0, 0, 0, .5) grey',
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
              // fontFamily: "Libre Franklin",
              fontFamily: '"Roboto","Helvetica","Arial","sans-serif"',
              fontSize: "24px",
              fontStyle: "normal",
              fontWeight: "700",
              lineHeight: "24px",
            }}
          >
            Assign Device
          </Box>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            onClick={handleCloseClick}
            className="close-icon"
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

        <Stack
          spacing={2}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: "10px",
            width: "380px",
            height: "100%",
          }}
        >
          <Typography>Selected Device</Typography>
          {/* <Box> */}
            {selectedRowData.map((item) => (
              <Box sx={{
                display:"flex",
                gap:"12px"
              }}>
                <FiberManualRecordIcon sx={{fontSize:"small", color:"blue"}}/>
                <Typography>
                  {item.short_description}
                </Typography>
              </Box>
            ))}
          {/* </Box> */}
          <FormControl>
            <FormLabel>Choose Address</FormLabel>

            <JoyAutocomplete
              
              id="checkboxes-tags-demo"
              options={addresses}
              // disableCloseOnSelect
              getOptionLabel={(option) => option.description}
              isOptionEqualToValue={(option, value) =>
                option.locationId === value.locationId
              }
              
              style={{ width: "380px" }}
              
              value={choosenAddress}
              onChange={handleAddressChange}
            />
          </FormControl>

          {placeList.length > 0 && (
            <FormControl>
            <FormLabel>Choose a Place</FormLabel>

            <JoyAutocomplete
              
              id="checkboxes-tags-demo"
              options={placeList}
              // disableCloseOnSelect
              getOptionLabel={(option) => option.Description}
              isOptionEqualToValue={(option, value) =>
                option.LocationId === value.LocationId
              }
              
              style={{ width: "380px" }}
              
              value={choosenPlace}
              onChange={handlePlaceChange}
            />
          </FormControl>
          )}
          
          <FormControl>
            <FormLabel>Select the Type</FormLabel>
            <JoyAutocomplete
              
              id="checkboxes-tags-demo"
              options={typeList}
              // disableCloseOnSelect
              getOptionLabel={(option) => option}
              isOptionEqualToValue={(option, value) =>
                option === value
              }
              
              style={{ width: "380px" }}
              
              value={choosenType}
              onChange={handleTypeChange}
            />
          </FormControl>
          
            

          
        </Stack>
      </Box>

      <Box
        className="buttn"
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
          Submit
        </ButtonJoy>
      </Box>
    </Box>
  );
};

export default AddAdmin;