import React, { useState } from "react";
import "./index.css";
import axios from "axios";
import { instance } from "Fetch";
import { Link, useParams } from "react-router-dom";
import BingMapComponent from "../BingMap/BingMap";
import { useNavigate } from 'react-router-dom';
import { Box, Container,Button, Breadcrumbs,TextField } from "@mui/material";
import Typography from "@mui/joy/Typography";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { Button as ButtonJoy,FormControl,FormLabel,Autocomplete } from "@mui/joy";
import { toast } from 'react-toastify';

const AddAddress = () => {
  const navigate = useNavigate();
  const [isLoading,setIsLoading] = useState(false);
  // State variables to store form values
  const [description, setDescription] = useState("");
  // const [houseNumber, sethouseNumber] = useState("444");
  const [streetName, setstreetName] = useState("");
  const [city, setcity] = useState("");
  const [StateorProvince, setStateorProvince] = useState("");
  const [postalCode, setpostalCode] = useState("");
  const [latitude, setlatitude] = useState("");
  const [Longitude, setLongitude] = useState("");
  const [option, setOption] = useState("United States");

  // Handler for the text field change
  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  // Handler for the select option change
  const handleOptionChange = (e) => {
    setOption(e.target.value);
    console.log("rrrr",e.target.value);
  };

  const instance = axios.create({
    baseURL: "http://localhost:5000",
    withCredentials: true, // This ensures cookies (sessions) are sent with every request
  });
  const getCookie = (name) => {
    const cookieValue = document.cookie.match(
      "(^|;)\\s*" + name + "\\s*=\\s*([^;]+)"
    );
    return cookieValue ? cookieValue.pop() : "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("description:", description);
    console.log("Option:", option);

    //separating houseNumber and streetName here

    const parts = streetName.split(" ", 2);
    let newHouseNumber = "444";
    let newStreetName = streetName;

    // Check if the first part is an integer
    if (!isNaN(parseInt(parts[0])) && isFinite(parts[0])) {
      newHouseNumber = parts[0];
      newStreetName = streetName.slice(parts[0].length).trim();
    }

    const data = {
      description: description,
      houseNumber: newHouseNumber,
      streetName: newStreetName,
      city: city,
      StateorProvince: StateorProvince,
      postalCode: postalCode,
      latitude: latitude,
      Longitude: Longitude,
      CountryOrRegion: option,
    };

    setIsLoading(true);
    try {
      console.log(data);
      const response = await instance.post("/addLisAddress", data, {
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": getCookie("csrftoken"),
        },
      });

      console.log(response.data);
      if(response.status===200){
        toast.success('Request Accepted, Please wait few minutes!!');
        window.history.back()
      }
      if (response.data.error) {
        console.log(response.data.error);
        return;
      }
    } catch (error) {
      console.error("Error sending data:", error);
    }
    finally{
      setIsLoading(false);
    }
  };

  return (
    <Box 
      sx={{
        display:"flex",
        flexDirection:"column",
        gap:"18px"
      }}>
      <Breadcrumbs
          separator={<NavigateNextIcon fontSize="large" />}
          aria-label="breadcrumb"
          style={{ padding: "12px 24px 0px 24px" }}
        >
          <Link
            underline="hover"
            color="inherit"
            component={Link}
            to="/dashboard/location"
          >
            Location
          </Link>
          <Typography color="text.primary">Add Location</Typography>
      </Breadcrumbs>
      <Box sx={{paddingLeft:"24px"}}>
        <Typography level="h2">Add Address</Typography>
      </Box>
      <Box sx={{
        margin:"0px 24px 12px 24px",
        padding:"24px",
        border:"1px solid grey",
        borderRadius:"12px",
        backgroundColor:"white",
        display:"flex",
        flexDirection:"column",
        gap:"18px",
      }}>
        
          <form onSubmit={handleSubmit}>
            <FormControl>
              <FormLabel>Description</FormLabel>
                <TextField
                  id="outlined-basic"
                  rows={1} // You can adjust the number of rows as per your requirements
                  variant="outlined"
                  value={description}
                  onChange={handleDescriptionChange}
                  style={{ width: "100%" }}
                  placeholder="Add Description"
                  size="small"
                />
            </FormControl>
            <FormControl>
              <FormLabel>Country or Region</FormLabel>
              <Autocomplete
                placeholder="Pick an Option"
                options={["United States"]} 
                sx={{ width: "100%" }}
                value={option}
                onChange={handleOptionChange}
                
              />
            </FormControl>
            
            {/* <Box>
              <label htmlFor="option">Description</label>
              <input
                type="text"
                value={description}
                onChange={handleDescriptionChange}
                className="description"
                id="description"
                name="description"
              />
            </Box>
            <Box>
              <label htmlFor="option">Country or Region</label>
              <select
                id="options"
                onChange={handleOptionChange}
                required
                value={option}
              >
                <option value="United States">United States</option>
                
              </select>
            </Box> */}
            <BingMapComponent
              setstreetName={setstreetName}
              setcity={setcity}
              setStateorProvince={setStateorProvince}
              setpostalCode={setpostalCode}
              setlatitude={setlatitude}
              setlongitude={setLongitude}
              setOption={setOption}
            />

            

            
          </form>

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
                onClick={() => navigate('/dashboard/location')}
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
                Submit
              </ButtonJoy>
          </Box>
        
      </Box>
    </Box>
  );
};

export default AddAddress;
