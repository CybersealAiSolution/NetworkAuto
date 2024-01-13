import React, { useState } from "react";
import { Box, Stack } from "@mui/material";
import FormLabel from "@mui/joy/FormLabel";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/joy/FormControl";
import { instance } from "../../../../../Fetch";
import { Button as ButtonJoy } from "@mui/joy";
import { setAlert } from "../../../../../store/alertSlice/alertSlice";
import { useDispatch,useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';



const AddTrustedIp = (props) => {
  const { id, tenantId } = useSelector((state) => state.tenants); // Use "state.users" here
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setformdata] = useState({
    remark: "",
    description: "" 
  });



  const handleCloseClick = () => {
    setformdata({
      remark: "",
      description: "" })
    props.sliderController(false)
  };


  const handleApplyClick = async (event) => {
    
    if (formData.remark === "") {
      dispatch(setAlert({ msg: "Remark required", status: "Failed" }));
      props.closeSlider();
      return;
    }
    
    event.preventDefault();
    
    setIsLoading(true);
    const payload = {
      remark: formData.remark,
      description: formData.description
    };

    
    try {
      // if (!updating) {
        const response = await instance.post("manage_did/addRemark", payload);

        
        dispatch(
          setAlert({
            msg: response.data.message,
            status: response.data.messageStatus,
          })
        );
        if (response.data.messageStatus === "Successful") {
          props.fetchData({pageSize: 25, page: 0}, "", {
            numberType: [],
            department: [],
            domain: [],
            country: [],
          });
      }
    } catch (err) {
      console.error("Error sending data:", err);
      if (err?.response && err?.response?.status === 401) {
        if (err?.response?.data?.redirect) {
          dispatch(
            setAlert({
              msg: err?.response?.data?.message,
              status: err?.response?.data?.messageStatus,
            })
          );
          // Redirect the user to the homepage or login page. This depends on your routing library.
          navigate('/'); // Adjust this based on your frontend framework.
        }
    }
    else if(err?.response && err?.response?.status === 400){
      dispatch(
        setAlert({
          msg: err?.response?.data?.message,
          status: err?.response?.data?.messageStatus,
        })
      );
    } 
    else if(err?.response?.status === 403){
      dispatch(
        setAlert({
          msg: "missing CSRF Token",
          status: "Failed",
        })
      );
      navigate('/');
    }
    else{
      dispatch(
        setAlert({
          msg: err?.response?.data?.message,
          status: err?.response?.data?.messageStatus,
        })
      );
    } 
  }
    finally{
      setIsLoading(false);
      handleCloseClick();
    }


  };

  const handleFieldChange=(e)=>{
    const {id, value} = e.target
    setformdata((p)=> 
    {return { ...p, [id]:value} })
  }

  const handleFilterClick = (e) => {
    e.stopPropagation(); // Stop the click event from propagating up
  };


  return (
    <Box
      className={`slider ${props.open ? "open" : ""}`}
      onClick={handleFilterClick}
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
            Add Trusted IPs
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
          <form>
            <FormControl>
              <FormLabel>Remark</FormLabel>
              
              <TextField
                id="remark"
                // label="Admin"

                rows={1} // You can adjust the number of rows as per your requirements
                variant="outlined"
                value={formData.remark}
                onChange={(e) => handleFieldChange(e) }
                sx={{ width: "380px", marginBottom:'15px' }}
                required
              />
            </FormControl>

            <FormControl>
              <FormLabel>Description</FormLabel>
              
              <TextField
                id="description"

                rows={1} // You can adjust the number of rows as per your requirements
                variant="outlined"
                value={formData.description}
                onChange={(e) => handleFieldChange(e) }
                sx={{ width: "380px", marginBottom:'15px' }}
                required
              />
            </FormControl>
          </form>
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
          onClick={() =>handleCloseClick()}
        >
          Cancel
        </ButtonJoy>
        <ButtonJoy
          variant="contained"
          type="button"
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
          Apply
        </ButtonJoy>
      </Box>
    </Box>
  );
};

export default AddTrustedIp;
