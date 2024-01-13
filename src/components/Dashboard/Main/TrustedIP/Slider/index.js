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


const Slider = ({ open, setSliderIsOpen, formType }) => {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const { id } = useParams();
  const [place, setPlace] = useState("");
  const [subnet, setSubnet] = useState("");
  const [switches, setSwitches] = useState("");
  const [accessPoint, setAccessPoint] = useState("");
  const [description, setDescription] = useState("");
  const [maskBits, setMaskBits] = useState("");
  const [IPAddress, setIPAddress] = useState("");
  const [isLoading,setIsLoading] = useState(false);

  useEffect(() => {}, [open]);

  const handlePlaceInput = (e) => {
    setPlace(e.target.value);
  };

  const handleSubnetInput = (e) => {
    setSubnet(e.target.value);
  };

  const handleSwitchInput = (e) => {
    setSwitches(e.target.value);
  };

  const handleAccessPointInput = (e) => {
    setAccessPoint(e.target.value);
  };

  const handleDescriptionInput = (e) => {
    setDescription(e.target.value);
  };
  
  const handleMaskBitsInput = (e) => {
    setMaskBits(e.target.value);
  };
  const handleIPAddressInput = (e) => {
    setIPAddress(e.target.value);
  };

  const handleAddPlace = async () => {
    if (!place) {
      dispatch(
        setAlert({
          msg: "Please fill all fields!",
          status: "Failed",
        })
      );
      return;
    }
    const payload = {
      place
    };

    try {
      setIsLoading(true);
      const response = await instance.post(`/addPlaces/${id}`, payload, {
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
      );}
      console.error("Error ", error);
    }
    finally{
      setIsLoading(false);
      setSliderIsOpen(false);
    }
  };

  const handleAddSubnet = async () => {
    if (!subnet || !description) {
      dispatch(
        setAlert({
          msg: "Please fill all fields!",
          status: "Failed",
        })
      );
      return;
    }
    const payload = {
      subnet,
      description,
    };

    try {
      setIsLoading(true);
      const response = await instance.post(`/addSubnets/${id}`, payload, {
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

  const handleAddSwitch = async () => {
    if (!switches || !description) {
      dispatch(
        setAlert({
          msg: "Please fill all fields!",
          status: "Failed",
        })
      );
      return;
    }
    const payload = {
      ChassisID:switches,
      description:description,
    };

    try {
      setIsLoading(true);
      const response = await instance.post(`/addSwitches/${id}`, payload, {
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

  const handleAddAccessPoint = async () => {
    if (!accessPoint || !description) {
      dispatch(
        setAlert({
          msg: "Please fill all fields!",
          status: "Failed",
        })
      );
      return;
    }
    const payload = {
      bbsid:accessPoint,
      description:description,
    };

    try {
      setIsLoading(true);
      const response = await instance.post(`/addAccessPoints/${id}`, payload, {
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
      const response = await instance.post(`/addTrustedIp`, payload, {
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
    if (formType === "place") handleAddPlace();
    else if (formType === "subnet") handleAddSubnet();
    else if (formType === "switch") handleAddSwitch();
    else if (formType === "accessPoint") handleAddAccessPoint();
    else if (formType === "TrustedIP") handleAddTrustedIp();
    
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
            {formType === "place" && "Add Place"}
            {formType === "subnet" && "Add subnet"}
            {formType === "switch" && "Add Switch"}
            {formType === "accessPoint" && "Add Access Point"}
            {formType === "TrustedIP" && "Add Trusted IP"}
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

        {formType === "place" && (
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
              <FormLabel>Place Name</FormLabel>
              <TextField
                id="outlined-basic"
                placeholder="Enter Place Name"
                rows={1}
                variant="outlined"
                value={place}
                onChange={handlePlaceInput}
                sx={{ width: "100%", padding: "0px" }}
              />
            </FormControl>
          </Stack>
        )}

        {formType === "subnet" && (
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
              <FormLabel>Subnet</FormLabel>
              <TextField
                id="outlined-basic"
                placeholder="x.x.x.x or x.x.x.x.x.x.x.x"
                rows={1}
                variant="outlined"
                value={subnet}
                onChange={handleSubnetInput}
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
        )}

        {formType === "switch" && (
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
              <FormLabel>Chassis ID</FormLabel>
              <TextField
                id="outlined-basic"
                rows={1}
                variant="outlined"
                value={switches}
                onChange={handleSwitchInput}
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
        )}

        {formType === "accessPoint" && (
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
              <FormLabel>BSSID ID</FormLabel>
              <TextField
                id="outlined-basic"
                rows={1}
                variant="outlined"
                placeholder="xx-xx-xx-xx-xx-xx or xx-xx-xx-xx-xx-x*"
                value={accessPoint}
                onChange={handleAccessPointInput}
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
        )}

        {formType === "TrustedIP" && (
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
        )}
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
