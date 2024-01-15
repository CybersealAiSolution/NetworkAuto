import React, { useEffect, useState } from "react";
import { Box, Stack } from "@mui/material";
import FormLabel from "@mui/joy/FormLabel";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/joy/FormControl";
import Button from "@mui/material/Button";
import { useParams } from "react-router-dom";
import { instance } from "Fetch";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { setAlert } from "../../../../../store/alertSlice/alertSlice";
import { Button as ButtonJoy } from "@mui/joy";


const Slider = ({ open, setSliderIsOpen }) => {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const { id } = useParams();
  
  const [description, setDescription] = useState("");
  const [maskBits, setMaskBits] = useState("");
  const [IPAddress, setIPAddress] = useState("");
  const [isLoading,setIsLoading] = useState(false);

  useEffect(() => {}, [open]);

  const handleDescriptionInput = (e) => {
    setDescription(e.target.value);
  };
  
  const handleMaskBitsInput = (e) => {
    setMaskBits(e.target.value);
  };
  const handleIPAddressInput = (e) => {
    setIPAddress(e.target.value);
  };

  

  const handleAddTrustedIp = async () => {
    if (!maskBits || !description || !IPAddress) {
      dispatch(
        setAlert({
          msg: "Please fill all fields!",
          status: "Failed",
        })
      );
      return;
    }
    const payload = {
      MaskBits:maskBits,
      Description:description,
      IPAddress:IPAddress
    };

    try {
      setIsLoading(true);
      const response = await instance.post(`/addTrustedIP`, payload, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      dispatch(
        setAlert({
          msg: response.data.message,
          status: response.data.messageStatus,
        })
      );
    } catch (error) {
      if(error.response.status === 403){
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
          msg: 'Something went Wrong!!',
          status: 'Failed',
        })
      );
      }
      console.error("Error ", error);
    }
    finally{
      setIsLoading(false);
      setSliderIsOpen(false);
    }
  };

  const handleSubmit = () => {
   
    handleAddTrustedIp();
    
  };

  return (
    <Box className={`slider ${open ? "open" : ""}`}>
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
            Add Trusted IP
          </Box>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            onClick={() => setSliderIsOpen(!open)}
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
            <FormControl
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: "6px",
                width: "100%",
              }}
            >
              <FormLabel>IP Address</FormLabel>
              <TextField
                id="outlined-basic"
                rows={1}
                variant="outlined"
                placeholder="x.x.x.x or x.x.x.x.x.x"
                value={IPAddress}
                onChange={handleIPAddressInput}
                sx={{ width: "100%", padding: "0px" }}
              />
            </FormControl>

            <FormControl
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: "6px",
                width: "100%",
              }}
            >
              <FormLabel>Network Range</FormLabel>
              <TextField
                id="outlined-basic"
                rows={1}
                variant="outlined"
                placeholder="Put in a number between 0-32 "
                value={maskBits}
                onChange={handleMaskBitsInput}
                sx={{ width: "100%", padding: "0px" }}
              />
            </FormControl>

            <FormControl
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: "6px",
                width: "100%",
              }}
            >
              <FormLabel>Description</FormLabel>
              <TextField
                id="outlined-basic"
                multiline
                placeholder="Add a description so you know why it was created"
                rows={2}
                variant="outlined"
                value={description}
                onChange={handleDescriptionInput}
                sx={{ width: "100%", padding: "0px" }}
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
          sx={{
            backgroundColor: "#fff",
            color: "#000",
            border: "1px solid black",
            "&:hover": {
              border: "1px solid black",
            },
          }}
          onClick={() => setSliderIsOpen(false)}
        >
          Cancel
        </ButtonJoy>
        <ButtonJoy
          variant="contained"
          sx={{
            backgroundColor: "#000",
            color: "white",
            "&:hover": {
              backgroundColor: "black",
              color: "white",
            },
          }}
          onClick={handleSubmit}
          loading={isLoading}
          loadingPosition="start"
        >
          Apply
        </ButtonJoy>
      </Box>
    </Box>
  );
};

export default Slider;
