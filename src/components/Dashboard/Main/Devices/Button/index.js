import React, { useState } from "react";
import "./index.css";
import AddAdmin from "../addAdmin/addAdmin";
import { Box, Button } from "@mui/material";
import { useSelector } from "react-redux";
// import Button from "@mui/material/Button";

export default function AddButton({reload,selectedRowData}) {
  // const { roles } = useSelector((state) => state.users); // Use "state.users" here
  const [isSliderOpen, setIsSliderOpen] = useState(false);
  const [addAdmin, setaddAdmin] = useState({
    selectAccessLevel: "ReadOnly",
    admin: { title: "" },
    departmentDelegation: [],
    countryDelegation: [],
  });

  const handleCloseSlider = () => {
    setIsSliderOpen(false);
  };

  const handleApplyFilters = (filters) => {
    setaddAdmin(filters);
    console.log(filters);
  };

  return (
    // (roles === "root" || roles === "admin") && (
      <Box>
        <Button
          variant="contained"
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
            // disabled={selectedRowData.length === 0}
            onClick={() => setIsSliderOpen(!isSliderOpen)}
          >
             + Register Device
          </Button>

        {isSliderOpen && (
          <div className="overlay" onClick={() => setIsSliderOpen(false)}></div>
        )}
        <AddAdmin
          open={isSliderOpen}
          closeSlider={handleCloseSlider}
          onApplyFilters={handleApplyFilters}
          fetchData={() => reload()}
          selectedRowData={selectedRowData}
        />
        
      </Box>
    // )
  );
}


