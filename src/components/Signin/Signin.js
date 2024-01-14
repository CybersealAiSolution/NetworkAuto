import React, { useState, useEffect } from 'react';
import "./index.css";
import axios from "axios";
import { instance } from 'Fetch';
import { Box, Container,CircularProgress } from "@mui/material";



const Signin = () => {
  const [isLoading,setIsLoading] = useState(false);

  // const handleSignin = async () => {
  //   const instance = axios.create({
  //     baseURL: "http://localhost:5000",
  //     withCredentials: true, // This ensures cookies (sessions) are sent with every request
  //   });
  //   // Import Axios if you are using a module-based system (e.g., with Node.js or a bundler like Webpack)
  //   // import axios from 'axios';
  //   setIsLoading(true);
  //   // Making a GET request
  //   const response = await instance.get("/signin");
  //   console.log('response',response);
  //   if (response.status === 200) {
  //     const data = response.data;
  //     console.log('data',data)
  //     console.log(data.authURL);
  
  //     if (data.authURL) {
  //       window.location.href = data.authURL;
  //     } else {
  //       console.error("No authURL present in the response");
  //     }
  //   } else {
  //     console.error("Request failed with status:xxxxx", response.status);
  //   }
  //   setIsLoading
  // };

  const handleSignin  = async () => {
        
    try {
        setIsLoading(true)

        const response = await instance.get('/signin');

        if (response.status === 200) {
            const data = response.data;

            console.log(data.authURL);

            if (data.authURL) {
                window.location.href = data.authURL;
            } else {
                console.error('No authURL present in the response');
            }
        } else {
            console.error('Request failed with status:', response.status);
        }
        
        
    } catch (err) {
        console.log(err);
    }
    finally{
    setIsLoading(false);
    }
        
};

  return(
  <>
    <div className="mainDiv">
      <div className="subDiv1">
        <p className="projectName">Network Automation System</p>
        <Box sx={{display:"flex",gap:"12px",alignItems:"center"}}>
          <button className="siginbtn" onClick={handleSignin}>
            <div>
              <img
                className="msimg"
                src="https://s3-eu-west-1.amazonaws.com/cdn-testing.web.bas.ac.uk/scratch/bas-style-kit/ms-pictogram/ms-pictogram.svg"
                alt="Microsoft Logo"
              />
            </div>
            <div className="signinText"> Sign in with Microsoft </div>
          </button>

          {isLoading && (
            <CircularProgress size={24} style={{ marginRight: "8px" }} 
            />
          )}
        </Box>
      </div>
      <div className="subDiv2">
        <div>
          <img
            className="softelimg"
            src="/softel-communications-logo-small.png"
            alt="Microsoft Logo"
          />
        </div>
      </div>
    </div>
  </>
  )
};

export default Signin;
