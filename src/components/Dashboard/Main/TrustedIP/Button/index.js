import React, { useState } from "react";
import "./index.css";
import { Box, Button } from "@mui/material";
import { useSelector } from "react-redux";
import AddTrustedIp from "../AddTrustedIp";
import Slider from "../Slider";
// import TrustedIp from "..";

export default function AddButton() {
  const { roles } = useSelector((state) => state.users); // Use "state.users" here
  const [isSliderOpen, setIsSliderOpen] = useState(false);

  const handleCloseSlider = () => {
    setIsSliderOpen(false);
  };

//   const handleApplyFilters = (filters) => {
//     console.log(filters);
//   };

  return (
    (roles === "root" || roles === "admin") && (
      <Box>
        <Button
            sx={{
              height:'50px',
              backgroundColor: "#000",
              color: "white",
              borderRadius: "7px",
              paddingX: "15px",
              "&:hover": {
                backgroundColor: "black",
                color: "white",
              },
            }}
            onClick={() => setIsSliderOpen(!isSliderOpen)}
          >
             + Add Trusted IP
          </Button>

        {isSliderOpen && (
          <div className="overlay" onClick={() => setIsSliderOpen(false)}></div>
        )}
        <Slider
          setSliderIsOpen={setIsSliderOpen}
          open={isSliderOpen}
          formType="TrustedIP"
        />
    </Box>
    )
  );
}
