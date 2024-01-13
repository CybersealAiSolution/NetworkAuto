import React from "react";
import "./index.css";
import TableComponent from "./Table/Table";import Typography from "@mui/joy/Typography";

const Activity = () => {
  return (
    <div className="Component">
      <div className="ComponentHeader">
        <Typography level="h1">Activity</Typography>
      </div>

        <TableComponent />

    </div>
  );
};

export default Activity;
