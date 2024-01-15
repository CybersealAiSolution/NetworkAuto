import React from "react";
import "./index.css";
import TableComponent from "../discoveredDevices/Table/Table";
import Typography from "@mui/joy/Typography";
// import Botton from './Button/Button'

const Devices = () => {
  return (
    <div className="Component">
      <div className="ComponentHeader">
        <Typography level="h1">Discovered Devices</Typography>
      </div>
      <TableComponent />
    </div>
  );
};

export default Devices;
