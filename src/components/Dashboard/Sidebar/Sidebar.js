import React, { useState, useEffect } from "react";
import "./index.css";
import { connect } from "react-redux";
import { Box, IconButton, Collapse } from "@mui/material";
import { styled } from "@mui/system";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import Tooltip from '@mui/material/Tooltip';
import LaunchIcon from "@mui/icons-material/Launch";
import MenuIcon from "@mui/icons-material/Menu"; // Assuming you have this icon for toggling
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft"; // Toggle icon for closing
import ChevronRightIcon from "@mui/icons-material/ChevronRight"; // Toggle icon for opening
import { CssVarsProvider } from '@mui/joy/styles';
import ColorSchemeToggle from '../../ColorSheme';


const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: theme.spacing(0, 1),
}));

const StyledBox = styled(Box)(({ clicked }) => ({
  display: "flex",
  height: "54px",
  padding: "12px 36px",
  alignItems: "center",
  gap: "12px",
  backgroundColor: clicked ? "#E3F4FC" : "initial", // changes based on clicked prop
  textDecoration: "none",
  "&:hover": {
    backgroundColor: "#E3F4FC",
  },
  position: "relative",
  "&::before": {
    content: clicked ? '""' : "none",
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    width: "6px",
    backgroundColor: "var(--primary-blue-dark, #17366D)",
  },
}));

const StyledBox1 = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "12px",
  padding: "0px 0px 0px 0px",
});

const StyledItemText = styled(ListItemText)(({ clicked }) => ({
  //color: "var(--grayscale-black-light, #6E7072)",
  color: clicked
    ? "var(--grayscale-black-regular, #2D2E2F)"
    : "var(--grayscale-black-light, #6E7072)",
  /* Display/B2 Display Medium */
  fontFamily: "Poppins",
  fontSize: "16px",
  fontStyle: "normal",
  fontWeight: clicked ? "600" : "500",
  lineHeight: "21px" /* 131.25% */,
}));

const StyledImage = styled("img")({
  height: "9%",
  width: "180px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "6px 12px",
});

const Sidebar = ({isSidebarOpen,setIsSidebarOpen}) => {
  // const currentpath = useLocation().pathname;
  const location = useLocation();

  console.log("123:",location);
  // const { LicenseDelegation, roles, tenantType } = useSelector(
  //   (state) => state.tenants
  // ); // Use "state.users" here
  const [selectedItem, setSelectedItem] = useState(() => {
    if (location.pathname.startsWith("/dashboard/activity")) {
      return "Activity";
    } else if (location.pathname === "/dashboard") {
      return "Admin";
    } else if (location.pathname.startsWith("/dashboard/location")) {
      return "Location";
    } else if (location.pathname.startsWith("/dashboard/deviceinventory")) {
      return "DeviceInventory";
    } else if (location.pathname.startsWith("/dashboard/discovereddevice")) {
      return "DiscoveredDevice";
    } else if (location.pathname.startsWith("/dashboard/trusted-ips")) {
      return "TrustedIps";
    } else {
      return null;
    }
  });

  

  // const handleDrawerOpen = () => {
  //   setIsSidebarOpen(true);
  // };

  // const handleDrawerClose = () => {
  //   setIsSidebarOpen(false);
  // };

  // Handler to toggle sidebar open/close
  const handleToggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Handler for toggling the click state
  const handleListItemClick = (item) => {
    setSelectedItem(item);
    // Save current selection to localStorage
    //localStorage.setItem("selectedSidebarItem", item);
  };

  useEffect(() => {
    // Function to determine the selected item based on pathname
    const determineSelectedItem = () => {
      if (location.pathname.startsWith("/dashboard/activity")) {
        return "Activity";
      } else if (location.pathname === "/dashboard") {
        return "Admin";
      } else if (location.pathname.startsWith("/dashboard/location")) {
        return "Location";
      } else if (location.pathname.startsWith("/dashboard/deviceinventory")) {
        return "DeviceInventory";
      } else if (location.pathname.startsWith("/dashboard/discovereddevice")) {
        return "DiscoveredDevice";
      } else if (location.pathname.startsWith("/dashboard/trusted-ips")) {
        return "TrustedIps";
      } 
    };

    // Call handleListItemClick with the determined selected item
    const selectedItem = determineSelectedItem();
    if (selectedItem) {
      handleListItemClick(selectedItem);
    }
  }, [location.pathname]); // Dependency array includes location.pathname



  return (
    <>
    <Box
      bgcolor="#F8F9FA"
      sx={{
        width: isSidebarOpen ? "100%" : "90px", // Adjust the width accordingly
        // minWidth: "250px",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        transition: isSidebarOpen ? "" : "width 1s ease-in",
        // alignItems: 'flex-start',
        // gap: "36px",
      }}
    >
       <DrawerHeader sx={{height:"8%"}}>
        {isSidebarOpen && (
          <Box sx={{
            display:"flex",
            // gap:"12px",
            justifyContent:"flex-end"
          }}>
            <IconButton onClick={handleToggleSidebar}>
              <ChevronLeftIcon />
            </IconButton>
            {/* <Link to="/dashboard" style={{ textDecoration: 'none'}}>
              <StyledImage
                src="/softel-communications-logo-small.png"
                alt="My Image"
                className="logo"
                sx={{
                  alignSelf: "center",
                  padding: "0px",
                  // minHeight: "80px",
                }}
              />
          </Link> */}
          {/* <CssVarsProvider>
            <ColorSchemeToggle sx={{ ml: 'auto' }} />
          </CssVarsProvider> */}

          </Box>
        )}
        
        {!isSidebarOpen && (
          <Box sx={{
            display:"flex",
            justifyContent:"center",
            alignItems:"center",
          }}>
            <IconButton onClick={handleToggleSidebar}>
              <MenuIcon />
            </IconButton>
          </Box>
        )}
        {/* <CssVarsProvider>
        <ColorSchemeToggle sx={{ ml: 'auto' }} />
        </CssVarsProvider> */}
      </DrawerHeader>


      <List
        sx={{
          width: "100%",
          height:"92%"
        }}
      >
        <StyledBox
          clicked={selectedItem === "Admin"}
          onClick={() => handleListItemClick("Admin")}
          component={Link}
          to="/dashboard"
        >
          <ListItem disablePadding>
            <StyledBox1>
              <ListItemIcon sx={{ minWidth: "0px" }}>
              <Tooltip title="Admin" placement="right" disableHoverListener={isSidebarOpen}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                >
                  <mask
                    id="mask0_112_34"
                    style={{ maskType: "alpha" }}
                    maskUnits="userSpaceOnUse"
                    x="0"
                    y="0"
                    width="20"
                    height="20"
                  >
                    <rect width="20" height="20" fill="#D9D9D9" />
                  </mask>
                  <g mask="url(#mask0_112_34)">
                    <path
                      d="M14 14C14.4167 14 14.7708 13.8542 15.0625 13.5625C15.3542 13.2708 15.5 12.9167 15.5 12.5C15.5 12.0833 15.3542 11.7292 15.0625 11.4375C14.7708 11.1458 14.4167 11 14 11C13.5833 11 13.2292 11.1458 12.9375 11.4375C12.6458 11.7292 12.5 12.0833 12.5 12.5C12.5 12.9167 12.6458 13.2708 12.9375 13.5625C13.2292 13.8542 13.5833 14 14 14ZM14 17C14.5278 17 15.0174 16.867 15.4688 16.601C15.9201 16.335 16.2847 15.9819 16.5625 15.5417C16.1736 15.2917 15.7655 15.0972 15.3381 14.9583C14.9108 14.8194 14.4664 14.75 14.0048 14.75C13.5433 14.75 13.0972 14.8194 12.6667 14.9583C12.2361 15.0972 11.8264 15.2917 11.4375 15.5417C11.7153 15.9819 12.0799 16.335 12.5312 16.601C12.9826 16.867 13.4722 17 14 17ZM10 18C8.15278 17.5833 6.60764 16.5382 5.36458 14.8646C4.12153 13.191 3.5 11.3264 3.5 9.27083V4.5L10 2L16.5 4.5V9.10417C16.1944 8.96528 15.9236 8.85417 15.6875 8.77083C15.4514 8.6875 15.2222 8.63194 15 8.60417V5.52083L10 3.60417L5 5.52083V9.27083C5 9.95139 5.08681 10.6181 5.26042 11.2708C5.43403 11.9236 5.6875 12.5382 6.02083 13.1146C6.35417 13.691 6.76042 14.2188 7.23958 14.6979C7.71875 15.1771 8.25694 15.5972 8.85417 15.9583C8.96528 16.2778 9.14236 16.6146 9.38542 16.9688C9.62847 17.3229 9.89583 17.6528 10.1875 17.9583L10 18ZM13.9953 18C12.8873 18 11.9444 17.6095 11.1667 16.8286C10.3889 16.0477 10 15.1033 10 13.9953C10 12.8873 10.3905 11.9444 11.1714 11.1667C11.9523 10.3889 12.8967 10 14.0047 10C15.1127 10 16.0556 10.3905 16.8333 11.1714C17.6111 11.9523 18 12.8967 18 14.0047C18 15.1127 17.6095 16.0556 16.8286 16.8333C16.0477 17.6111 15.1033 18 13.9953 18Z"
                      fill={selectedItem === "Admin" ? "black" : "#6E7072"}
                    />
                  </g>
                </svg>
              </Tooltip>
              </ListItemIcon>
              {isSidebarOpen  && (
                <StyledItemText
                  primary="Admin"
                  clicked={selectedItem === "Admin"}
                />
              )}
            </StyledBox1>
          </ListItem>
        </StyledBox>
        
        <StyledBox
          clicked={selectedItem === "Activity"}
          onClick={() => handleListItemClick("Activity")}
          component={Link}
          to="/dashboard/activity"
        >
          <ListItem disablePadding>
            <StyledBox1>
              <ListItemIcon sx={{ minWidth: "0px" }}>
              <Tooltip title="Activity" placement="right" disableHoverListener={isSidebarOpen}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                >
                  <mask
                    id="mask0_112_26"
                    style={{ maskType: "alpha" }}
                    maskUnits="userSpaceOnUse"
                    x="0"
                    y="0"
                    width="20"
                    height="20"
                  >
                    <rect width="20" height="20" fill="#D9D9D9" />
                  </mask>
                  <g mask="url(#mask0_112_26)">
                    <path
                      d="M2 7.75V3H18V7.75H16.5V4.5H3.5V7.75H2ZM2 14.5V9.25H3.5V13H16.5V9.25H18V14.5H2ZM2 9.25V7.75H7.4375L8.54167 9.77083L11.0833 5.75H11.8958L13.375 7.75H18V9.25H12.6042L11.5417 7.8125L8.89583 12H8.0625L6.54167 9.25H2ZM1 17V15.5H19V17H1Z"
                      fill={selectedItem === "Activity" ? "black" : "#6E7072"}
                    />
                  </g>
                </svg>
                </Tooltip>
              </ListItemIcon>
              {isSidebarOpen  && (
                <StyledItemText
                  primary="Activity"
                  clicked={selectedItem === "Activity"}
                />
              )}
            </StyledBox1>
          </ListItem>
        </StyledBox>
        
        
        
        <StyledBox
          clicked={selectedItem === "Location"}
          onClick={() => handleListItemClick("Location")}
          component={Link}
          to="/dashboard/location"
        >
          <ListItem disablePadding>
            <StyledBox1>
              <ListItemIcon sx={{ minWidth: "0px" }}>
                <Tooltip title="Locations" placement="right" disableHoverListener={isSidebarOpen}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                >
                  <mask
                    id="mask0_112_38"
                    style={{ maskType: "alpha" }}
                    maskUnits="userSpaceOnUse"
                    x="0"
                    y="0"
                    width="20"
                    height="20"
                  >
                    <rect width="20" height="20" fill="#D9D9D9" />
                  </mask>
                  <g mask="url(#mask0_112_38)">
                    <path
                      d="M16 17C14.4722 17 12.9306 16.6458 11.375 15.9375C9.81944 15.2292 8.38889 14.2222 7.08333 12.9167C5.77778 11.6111 4.77083 10.1806 4.0625 8.62501C3.35417 7.06945 3 5.52084 3 3.97917V2.97917H7.60417L8.39583 6.52084L5.95833 8.97917C6.27778 9.52084 6.62153 10.0347 6.98958 10.5208C7.35764 11.0069 7.74618 11.4513 8.15521 11.8538C8.53785 12.2429 8.95833 12.6146 9.41667 12.9688C9.875 13.3229 10.3889 13.6736 10.9583 14.0208L13.4583 11.5833L17 12.3333V17H16ZM5.27083 7.56251L6.77083 6.04167L6.40665 4.47917H4.5C4.55556 5.00695 4.64583 5.53126 4.77083 6.05209C4.89583 6.57292 5.0625 7.07639 5.27083 7.56251ZM12.4583 14.6458C12.875 14.8403 13.3507 15.0139 13.8854 15.1667C14.4201 15.3194 14.9583 15.4306 15.5 15.5V13.5417L13.9375 13.2083L12.4583 14.6458ZM9.7544 10C9.54313 10 9.36458 9.92855 9.21875 9.78565C9.07292 9.64273 9 9.46565 9 9.2544C9 9.04314 9.07145 8.86459 9.21435 8.71876C9.35727 8.57292 9.53435 8.50001 9.7456 8.50001C9.95687 8.50001 10.1354 8.57146 10.2812 8.71436C10.4271 8.85728 10.5 9.03436 10.5 9.24561C10.5 9.45687 10.4285 9.63542 10.2856 9.78126C10.1427 9.92709 9.96565 10 9.7544 10ZM9.7544 5.50001C9.54313 5.50001 9.36458 5.42855 9.21875 5.28565C9.07292 5.14273 9 4.96565 9 4.7544C9 4.54314 9.07145 4.36459 9.21435 4.21876C9.35727 4.07292 9.53435 4.00001 9.7456 4.00001C9.95687 4.00001 10.1354 4.07146 10.2812 4.21436C10.4271 4.35728 10.5 4.53436 10.5 4.74561C10.5 4.95687 10.4285 5.13542 10.2856 5.28126C10.1427 5.42709 9.96565 5.50001 9.7544 5.50001ZM10.9211 7.75001C10.7098 7.75001 10.5313 7.67855 10.3854 7.53565C10.2396 7.39273 10.1667 7.21565 10.1667 7.0044C10.1667 6.79314 10.2381 6.61459 10.381 6.46876C10.5239 6.32292 10.701 6.25001 10.9123 6.25001C11.1235 6.25001 11.3021 6.32146 11.4479 6.46436C11.5938 6.60728 11.6667 6.78436 11.6667 6.99561C11.6667 7.20687 11.5952 7.38542 11.4523 7.53126C11.3094 7.67709 11.1323 7.75001 10.9211 7.75001ZM12.0877 10C11.8765 10 11.6979 9.92855 11.5521 9.78565C11.4063 9.64273 11.3333 9.46565 11.3333 9.2544C11.3333 9.04314 11.4048 8.86459 11.5477 8.71876C11.6906 8.57292 11.8677 8.50001 12.0789 8.50001C12.2902 8.50001 12.4688 8.57146 12.6146 8.71436C12.7604 8.85728 12.8333 9.03436 12.8333 9.24561C12.8333 9.45687 12.7619 9.63542 12.619 9.78126C12.4761 9.92709 12.299 10 12.0877 10ZM12.0877 5.50001C11.8765 5.50001 11.6979 5.42855 11.5521 5.28565C11.4063 5.14273 11.3333 4.96565 11.3333 4.7544C11.3333 4.54314 11.4048 4.36459 11.5477 4.21876C11.6906 4.07292 11.8677 4.00001 12.0789 4.00001C12.2902 4.00001 12.4688 4.07146 12.6146 4.21436C12.7604 4.35728 12.8333 4.53436 12.8333 4.74561C12.8333 4.95687 12.7619 5.13542 12.619 5.28126C12.4761 5.42709 12.299 5.50001 12.0877 5.50001ZM13.2544 7.75001C13.0431 7.75001 12.8646 7.67855 12.7188 7.53565C12.5729 7.39273 12.5 7.21565 12.5 7.0044C12.5 6.79314 12.5715 6.61459 12.7144 6.46876C12.8573 6.32292 13.0344 6.25001 13.2456 6.25001C13.4569 6.25001 13.6354 6.32146 13.7812 6.46436C13.9271 6.60728 14 6.78436 14 6.99561C14 7.20687 13.9285 7.38542 13.7856 7.53126C13.6427 7.67709 13.4656 7.75001 13.2544 7.75001ZM14.4211 10C14.2098 10 14.0312 9.92855 13.8854 9.78565C13.7396 9.64273 13.6667 9.46565 13.6667 9.2544C13.6667 9.04314 13.7381 8.86459 13.881 8.71876C14.0239 8.57292 14.201 8.50001 14.4123 8.50001C14.6235 8.50001 14.8021 8.57146 14.9479 8.71436C15.0938 8.85728 15.1667 9.03436 15.1667 9.24561C15.1667 9.45687 15.0952 9.63542 14.9523 9.78126C14.8094 9.92709 14.6323 10 14.4211 10ZM14.4211 5.50001C14.2098 5.50001 14.0312 5.42855 13.8854 5.28565C13.7396 5.14273 13.6667 4.96565 13.6667 4.7544C13.6667 4.54314 13.7381 4.36459 13.881 4.21876C14.0239 4.07292 14.201 4.00001 14.4123 4.00001C14.6235 4.00001 14.8021 4.07146 14.9479 4.21436C15.0938 4.35728 15.1667 4.53436 15.1667 4.74561C15.1667 4.95687 15.0952 5.13542 14.9523 5.28126C14.8094 5.42709 14.6323 5.50001 14.4211 5.50001ZM15.5877 7.75001C15.3765 7.75001 15.1979 7.67855 15.0521 7.53565C14.9063 7.39273 14.8333 7.21565 14.8333 7.0044C14.8333 6.79314 14.9048 6.61459 15.0477 6.46876C15.1906 6.32292 15.3677 6.25001 15.5789 6.25001C15.7902 6.25001 15.9688 6.32146 16.1146 6.46436C16.2604 6.60728 16.3333 6.78436 16.3333 6.99561C16.3333 7.20687 16.2619 7.38542 16.119 7.53126C15.9761 7.67709 15.799 7.75001 15.5877 7.75001ZM16.7544 10C16.5431 10 16.3646 9.92855 16.2188 9.78565C16.0729 9.64273 16 9.46565 16 9.2544C16 9.04314 16.0715 8.86459 16.2144 8.71876C16.3573 8.57292 16.5344 8.50001 16.7456 8.50001C16.9569 8.50001 17.1354 8.57146 17.2812 8.71436C17.4271 8.85728 17.5 9.03436 17.5 9.24561C17.5 9.45687 17.4285 9.63542 17.2856 9.78126C17.1427 9.92709 16.9656 10 16.7544 10ZM16.7544 5.50001C16.5431 5.50001 16.3646 5.42855 16.2188 5.28565C16.0729 5.14273 16 4.96565 16 4.7544C16 4.54314 16.0715 4.36459 16.2144 4.21876C16.3573 4.07292 16.5344 4.00001 16.7456 4.00001C16.9569 4.00001 17.1354 4.07146 17.2812 4.21436C17.4271 4.35728 17.5 4.53436 17.5 4.74561C17.5 4.95687 17.4285 5.13542 17.2856 5.28126C17.1427 5.42709 16.9656 5.50001 16.7544 5.50001Z"
                      fill={
                        selectedItem === "DIDmanagement" ? "black" : "#6E7072"
                      }
                    />
                  </g>
                </svg>
                </Tooltip>
              </ListItemIcon>
              {isSidebarOpen  && (
                <StyledItemText
                  primary="Locations"
                  clicked={selectedItem === "Location"}
                />
              )}
            </StyledBox1>
          </ListItem>
        </StyledBox>

        <StyledBox
          clicked={selectedItem === "DeviceInventory"}
          onClick={() => handleListItemClick("DeviceInventory")}
          component={Link}
          to="/dashboard/deviceinventory"
        >
          <ListItem disablePadding>
            <StyledBox1>
              <ListItemIcon sx={{ minWidth: "0px" }}>
              <Tooltip title="Devices Inventory" placement="right" disableHoverListener={isSidebarOpen}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                >
                  <mask
                    id="mask0_112_95"
                    style={{ maskType: "alpha" }}
                    maskUnits="userSpaceOnUse"
                    x="0"
                    y="0"
                    width="20"
                    height="20"
                  >
                    <rect width="20" height="20" fill="#D9D9D9" />
                  </mask>
                  <g mask="url(#mask0_112_95)">
                    <path
                      d="M8 10C7.16667 10 6.45833 9.70833 5.875 9.125C5.29167 8.54167 5 7.83333 5 7C5 6.16667 5.29167 5.45833 5.875 4.875C6.45833 4.29167 7.16667 4 8 4C8.83333 4 9.54167 4.29167 10.125 4.875C10.7083 5.45833 11 6.16667 11 7C11 7.83333 10.7083 8.54167 10.125 9.125C9.54167 9.70833 8.83333 10 8 10ZM2 16V14.0833C2 13.7222 2.08681 13.3924 2.26042 13.0938C2.43403 12.7951 2.67361 12.5556 2.97917 12.375C3.74306 11.9306 4.54861 11.5903 5.39583 11.3542C6.24306 11.1181 7.11111 11 8 11C8.15278 11 8.29514 11.0035 8.42708 11.0104C8.55903 11.0174 8.70139 11.0278 8.85417 11.0417C8.75694 11.2778 8.68403 11.5208 8.63542 11.7708C8.58681 12.0208 8.54861 12.2708 8.52083 12.5208L8 12.5C7.25 12.5 6.51389 12.5972 5.79167 12.7917C5.06944 12.9861 4.38194 13.2778 3.72917 13.6667C3.66042 13.7075 3.60503 13.7647 3.56302 13.8382C3.52101 13.9118 3.5 13.9935 3.5 14.0833V14.5H8.72917C8.79647 14.7587 8.88622 15.0144 8.9984 15.267C9.11058 15.5195 9.24306 15.7639 9.39583 16H2ZM13.3125 17L13.0625 15.8333C12.8681 15.7639 12.684 15.6806 12.5104 15.5833C12.3368 15.4861 12.1736 15.375 12.0208 15.25L10.875 15.6042L10.2083 14.4583L11.0625 13.625C11.0069 13.4306 10.9826 13.2292 10.9896 13.0208C10.9965 12.8125 11.0208 12.6111 11.0625 12.4167L10.2083 11.6042L10.875 10.4375L12 10.7708C12.1528 10.6319 12.3194 10.5104 12.5 10.4062C12.6806 10.3021 12.8681 10.2222 13.0625 10.1667L13.3333 9H14.6667L14.9375 10.1667C15.1319 10.2361 15.3194 10.3194 15.5 10.4167C15.6806 10.5139 15.8472 10.6319 16 10.7708L17.125 10.4583L17.7917 11.6042L16.9583 12.3958C16.9861 12.6042 17 12.8129 17 13.0219C17 13.231 16.9792 13.432 16.9375 13.625L17.7917 14.4375L17.125 15.5833L15.9792 15.25C15.8264 15.375 15.6632 15.4896 15.4896 15.5938C15.316 15.6979 15.1319 15.7778 14.9375 15.8333L14.6458 17H13.3125ZM14.0044 14.5C14.4181 14.5 14.7708 14.3527 15.0625 14.0581C15.3542 13.7635 15.5 13.4093 15.5 12.9956C15.5 12.5819 15.3527 12.2292 15.0581 11.9375C14.7635 11.6458 14.4093 11.5 13.9956 11.5C13.5819 11.5 13.2292 11.6473 12.9375 11.9419C12.6458 12.2365 12.5 12.5907 12.5 13.0044C12.5 13.4181 12.6473 13.7708 12.9419 14.0625C13.2365 14.3542 13.5907 14.5 14.0044 14.5ZM8.00442 8.5C8.41814 8.5 8.77083 8.35269 9.0625 8.05808C9.35417 7.76346 9.5 7.40929 9.5 6.99558C9.5 6.58186 9.35269 6.22917 9.05808 5.9375C8.76346 5.64583 8.40929 5.5 7.99558 5.5C7.58186 5.5 7.22917 5.64731 6.9375 5.94192C6.64583 6.23654 6.5 6.59071 6.5 7.00442C6.5 7.41814 6.64731 7.77083 6.94192 8.0625C7.23654 8.35417 7.59071 8.5 8.00442 8.5Z"
                      fill={selectedItem === "Users" ? "black" : "#6E7072"}
                    />
                  </g>
                </svg>
                </Tooltip>
              </ListItemIcon>
              {isSidebarOpen  && (
                <StyledItemText
                  primary="Devices Inventory"
                  clicked={selectedItem === "DeviceInventory"}
                />
              )}
            </StyledBox1>
          </ListItem>
        </StyledBox>


        <StyledBox
          clicked={selectedItem === "DiscoveredDevice"}
          onClick={() => handleListItemClick("DiscoveredDevice")}
          component={Link}
          to="/dashboard/discovereddevice"
        >
          <ListItem disablePadding>
            <StyledBox1>
              <ListItemIcon sx={{ minWidth: "0px" }}>
              <Tooltip title="Discovered Devices" placement="right" disableHoverListener={isSidebarOpen}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                >
                  <mask
                    id="mask0_112_42"
                    style={{ maskType: "alpha" }}
                    maskUnits="userSpaceOnUse"
                    x="0"
                    y="0"
                    width="20"
                    height="20"
                  >
                    <rect width="20" height="20" fill="#D9D9D9" />
                  </mask>
                  <g mask="url(#mask0_112_42)">
                    <path
                      d="M10.0044 10C10.4181 10 10.7708 9.85269 11.0625 9.55808C11.3542 9.26346 11.5 8.90929 11.5 8.49558C11.5 8.08186 11.3527 7.72917 11.0581 7.4375C10.7635 7.14583 10.4093 7 9.99558 7C9.58186 7 9.22917 7.14731 8.9375 7.44192C8.64583 7.73654 8.5 8.09071 8.5 8.50442C8.5 8.91814 8.64731 9.27083 8.94192 9.5625C9.23654 9.85417 9.59071 10 10.0044 10ZM10 16.0208C11.6528 14.5347 12.8993 13.1667 13.7396 11.9167C14.5799 10.6667 15 9.54861 15 8.5625C15 7.10417 14.5243 5.89583 13.5729 4.9375C12.6215 3.97917 11.4306 3.5 10 3.5C8.56944 3.5 7.37847 3.97917 6.42708 4.9375C5.47569 5.89583 5 7.10417 5 8.5625C5 9.54861 5.42014 10.6667 6.26042 11.9167C7.10069 13.1667 8.34722 14.5347 10 16.0208ZM10 18C7.81979 16.1791 6.1914 14.4877 5.11483 12.926C4.03828 11.3642 3.5 9.90972 3.5 8.5625C3.5 6.70139 4.11806 5.14236 5.35417 3.88542C6.59028 2.62847 8.13542 2 9.98958 2C11.8438 2 13.3924 2.62847 14.6354 3.88542C15.8785 5.14236 16.5 6.70139 16.5 8.5625C16.5 9.90972 15.9653 11.3611 14.8958 12.9167C13.8264 14.4722 12.1944 16.1667 10 18Z"
                      fill={selectedItem === "location" ? "black" : "#6E7072"}
                    />
                  </g>
                </svg>
                </Tooltip>
              </ListItemIcon>
              {isSidebarOpen  && (
                <StyledItemText
                  primary="Discovered Devices"
                  clicked={selectedItem === "DiscoveredDevice"}
                />
              )}
            </StyledBox1>
          </ListItem>
        </StyledBox>
        
        
        <StyledBox
          clicked={selectedItem === "TrustedIps"}
          onClick={() => handleListItemClick("TrustedIps")}
          component={Link}
          to="/dashboard/trusted-ips"
        >
          <ListItem disablePadding>
            <StyledBox1>
              <ListItemIcon sx={{ minWidth: "0px" }}>
              <Tooltip title="Trusted IPs" placement="right" disableHoverListener={isSidebarOpen}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                >
                  <mask
                    id="mask0_112_10"
                    style={{ maskType: "alpha" }}
                    maskUnits="userSpaceOnUse"
                    x="0"
                    y="0"
                    width="20"
                    height="20"
                  >
                    <rect width="20" height="20" fill="#D9D9D9" />
                  </mask>
                  <g mask="url(#mask0_112_10)">
                    <path
                      d="M14.169 12.4792C13.598 12.4792 13.1146 12.282 12.7187 11.8878C12.3229 11.4935 12.125 11.0109 12.125 10.4399C12.125 9.86884 12.3221 9.38542 12.7164 8.98958C13.1107 8.59375 13.5933 8.39583 14.1643 8.39583C14.7353 8.39583 15.2187 8.59297 15.6146 8.98723C16.0104 9.38151 16.2083 9.86415 16.2083 10.4351C16.2083 11.0062 16.0112 11.4896 15.6169 11.8854C15.2227 12.2812 14.74 12.4792 14.169 12.4792ZM9.99999 16.6667V15.4854C9.99999 15.1479 10.0868 14.8368 10.2604 14.5521C10.434 14.2674 10.6805 14.0677 11 13.9531C11.5 13.7622 12.0174 13.6146 12.5521 13.5104C13.0868 13.4062 13.625 13.3542 14.1667 13.3542C14.7083 13.3542 15.2465 13.4062 15.7812 13.5104C16.316 13.6146 16.8333 13.7622 17.3333 13.9531C17.6528 14.0677 17.8993 14.2708 18.0729 14.5625C18.2465 14.8542 18.3333 15.1597 18.3333 15.4792V16.6667H9.99999ZM8.39582 9.97917C7.45138 9.97917 6.65971 9.65972 6.02082 9.02083C5.38193 8.38194 5.06249 7.59028 5.06249 6.64583C5.06249 5.70139 5.38193 4.90972 6.02082 4.27083C6.65971 3.63194 7.45138 3.3125 8.39582 3.3125C9.34027 3.3125 10.1319 3.63194 10.7708 4.27083C11.4097 4.90972 11.7292 5.70139 11.7292 6.64583C11.7292 7.59028 11.4097 8.38194 10.7708 9.02083C10.1319 9.65972 9.34027 9.97917 8.39582 9.97917ZM1.66666 16.6667V14.2708C1.66666 13.7986 1.78471 13.3681 2.02082 12.9792C2.25693 12.5903 2.59027 12.2917 3.02082 12.0833C3.89582 11.6667 4.7743 11.3542 5.65624 11.1458C6.53818 10.9375 7.45138 10.8333 8.39582 10.8333C8.81249 10.8333 9.20832 10.8507 9.58332 10.8854C9.95832 10.9201 10.3055 10.9722 10.625 11.0417V12.25C10.4763 12.3194 10.3488 12.3889 10.2426 12.4583C10.1364 12.5278 10.0278 12.6111 9.91666 12.7083C9.66666 12.6667 9.41319 12.6354 9.15624 12.6146C8.8993 12.5938 8.64582 12.5833 8.39582 12.5833C7.59027 12.5833 6.81596 12.6771 6.07291 12.8646C5.32985 13.0521 4.56943 13.3194 3.79166 13.6667C3.68055 13.7222 3.59027 13.8039 3.52082 13.9116C3.45138 14.0194 3.41666 14.1391 3.41666 14.2708V14.9167H8.43749V16.6667H1.66666ZM8.39582 8.22917C8.85416 8.22917 9.23263 8.07986 9.53124 7.78125C9.82985 7.48264 9.97916 7.10417 9.97916 6.64583C9.97916 6.1875 9.82985 5.80903 9.53124 5.51042C9.23263 5.21181 8.85416 5.0625 8.39582 5.0625C7.93749 5.0625 7.55902 5.21181 7.26041 5.51042C6.9618 5.80903 6.81249 6.1875 6.81249 6.64583C6.81249 7.10417 6.9618 7.48264 7.26041 7.78125C7.55902 8.07986 7.93749 8.22917 8.39582 8.22917Z"
                      fill={
                        selectedItem === "resourceaccount" ? "black" : "#6E7072"
                      }
                    />
                  </g>
                </svg>
                </Tooltip>
              </ListItemIcon>
              {isSidebarOpen  && (
                <StyledItemText
                  primary="Trusted IPs"
                  clicked={selectedItem === "TrustedIps"}
                />
              )}
            </StyledBox1>
          </ListItem>
        </StyledBox>
        
        
      </List>
    </Box>
    {/* <div className="sidebarComponent">
      <div className="logoContainer">
        <img
          src="/softel-communications-logo-small.png"
          alt="MyImage"
          className="logo"
        />
      </div>

      <div className="navigationContainer">
        <div className="navigationSegment">
          <Link
            className={`navigationButton ${
              currentpath === "/dashboard" ? "open" : ""
            }`}
            to="/dashboard"
          >
            {" "}
            <div className="navigationButtonLogoContainer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <mask
                  id="mask0_148_224"
                  style={{ maskType: "alpha" }}
                  maskUnits="userSpaceOnUse"
                  x="0"
                  y="0"
                  width="24"
                  height="24"
                >
                  <rect width="24" height="24" fill="#D9D9D9" />
                </mask>
                <g mask="url(#mask0_148_224)">
                  <path
                    d="M12 12.75C11.0872 12.75 10.3173 12.4366 9.69037 11.8097C9.06346 11.1828 8.75 10.4129 8.75 9.50007C8.75 8.58726 9.06346 7.81739 9.69037 7.19048C10.3173 6.56356 11.0872 6.2501 12 6.2501C12.9128 6.2501 13.6827 6.56356 14.3096 7.19048C14.9365 7.81739 15.25 8.58726 15.25 9.50007C15.25 10.4129 14.9365 11.1828 14.3096 11.8097C13.6827 12.4366 12.9128 12.75 12 12.75ZM12 11.2501C12.4974 11.2501 12.9134 11.0828 13.2481 10.7482C13.5827 10.4135 13.75 9.99751 13.75 9.50007C13.75 9.00264 13.5827 8.58661 13.2481 8.25197C12.9134 7.91736 12.4974 7.75005 12 7.75005C11.5025 7.75005 11.0865 7.91736 10.7519 8.25197C10.4173 8.58661 10.2499 9.00264 10.2499 9.50007C10.2499 9.99751 10.4173 10.4135 10.7519 10.7482C11.0865 11.0828 11.5025 11.2501 12 11.2501ZM12 21.4808C9.83716 20.8911 8.04646 19.618 6.62787 17.6616C5.20929 15.7052 4.5 13.518 4.5 11.1001V5.34625L12 2.53857L19.5 5.34625V11.1001C19.5 13.518 18.7907 15.7052 17.3721 17.6616C15.9535 19.618 14.1628 20.8911 12 21.4808ZM12 4.1347L5.99997 6.37507V11.1001C5.99997 12.0514 6.13619 12.9712 6.40863 13.8597C6.68108 14.7482 7.05961 15.577 7.54422 16.3462C8.21857 16.0026 8.92466 15.7341 9.66248 15.5405C10.4003 15.3469 11.1795 15.2501 12 15.2501C12.8205 15.2501 13.5997 15.3469 14.3375 15.5405C15.0753 15.7341 15.7814 16.0026 16.4557 16.3462C16.9403 15.577 17.3189 14.7482 17.5913 13.8597C17.8638 12.9712 18 12.0514 18 11.1001V6.37507L12 4.1347ZM12 16.75C11.3551 16.75 10.7349 16.8199 10.1394 16.9597C9.54388 17.0994 8.98137 17.2956 8.45187 17.5481C8.94804 18.0994 9.49388 18.576 10.0894 18.9779C10.6849 19.3799 11.3218 19.6873 12 19.9001C12.6782 19.6873 13.3134 19.3799 13.9058 18.9779C14.4981 18.576 15.0423 18.0994 15.5385 17.5481C15.009 17.2956 14.4481 17.0994 13.8558 16.9597C13.2634 16.8199 12.6449 16.75 12 16.75Z"
                    fill="#404B5A"
                  />
                </g>
              </svg>
            </div>{" "}
            Admins{" "}
          </Link>
          <Link
            className={`navigationButton ${
              currentpath === "/dashboard/activity" ? "open" : ""
            }`}
            to="/dashboard/activity"
          >
            {" "}
            <div className="navigationButtonLogoContainer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <mask
                  id="mask0_148_219"
                  style={{ maskType: "alpha" }}
                  maskUnits="userSpaceOnUse"
                  x="0"
                  y="0"
                  width="24"
                  height="24"
                >
                  <rect width="24" height="24" fill="#D9D9D9" />
                </mask>
                <g mask="url(#mask0_148_219)">
                  <path
                    d="M2.50014 9.48093V5.53863C2.50014 5.03352 2.67514 4.60596 3.02514 4.25596C3.37514 3.90596 3.80271 3.73096 4.30784 3.73096H19.6924C20.1975 3.73096 20.6251 3.90596 20.9751 4.25596C21.3251 4.60596 21.5001 5.03352 21.5001 5.53863V9.48093H20.0001V5.53863C20.0001 5.4617 19.9681 5.39118 19.904 5.32708C19.8398 5.26297 19.7693 5.23091 19.6924 5.23091H4.30784C4.23091 5.23091 4.16038 5.26297 4.09627 5.32708C4.03217 5.39118 4.00012 5.4617 4.00012 5.53863V9.48093H2.50014ZM4.30784 17.7309C3.80271 17.7309 3.37514 17.5559 3.02514 17.2059C2.67514 16.8559 2.50014 16.4283 2.50014 15.9232V10.9809H4.00012V15.9232C4.00012 16.0001 4.03217 16.0707 4.09627 16.1348C4.16038 16.1989 4.23091 16.2309 4.30784 16.2309H19.6924C19.7693 16.2309 19.8398 16.1989 19.904 16.1348C19.9681 16.0707 20.0001 16.0001 20.0001 15.9232V10.9809H21.5001V15.9232C21.5001 16.4283 21.3251 16.8559 20.9751 17.2059C20.6251 17.5559 20.1975 17.7309 19.6924 17.7309H4.30784ZM1.38477 20.2309V18.7309H22.6155V20.2309H1.38477ZM2.50014 10.9809V9.48093H8.00012C8.13857 9.48093 8.27029 9.51812 8.39529 9.59248C8.52029 9.66683 8.61484 9.76811 8.67894 9.89631L10.0751 12.6733L13.3521 6.86553C13.4162 6.7476 13.5056 6.65722 13.6203 6.59441C13.7351 6.53157 13.8617 6.50016 14.0001 6.50016C14.1386 6.50016 14.2703 6.53157 14.3953 6.59441C14.5203 6.65722 14.6148 6.75786 14.6789 6.89631L15.9713 9.48093H21.5001V10.9809H15.5963C15.4322 10.9809 15.2748 10.9383 15.1242 10.853C14.9735 10.7678 14.8597 10.6431 14.7828 10.479L13.9501 8.80781L10.6636 14.5963C10.5995 14.7245 10.5049 14.8207 10.3799 14.8848C10.2549 14.9489 10.1232 14.9809 9.98474 14.9809C9.84627 14.9809 9.71711 14.9437 9.59724 14.8694C9.47738 14.795 9.38539 14.6937 9.32129 14.5655L7.52897 10.9809H2.50014Z"
                    fill="#404B5A"
                  />
                </g>
              </svg>
            </div>{" "}
            Activity{" "}
          </Link>
        </div>
        <hr></hr>
        <div className="navigationSegment">
          <Link
            className={`navigationButton ${
              currentpath === "/dashboard/location" ? "open" : ""
            }`}
            to="/dashboard/location"
          >
            {" "}
            <div className="navigationButtonLogoContainer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <mask
                  id="mask0_148_241"
                  style={{ maskType: "alpha" }}
                  maskUnits="userSpaceOnUse"
                  x="0"
                  y="0"
                  width="24"
                  height="24"
                >
                  <rect width="24" height="24" fill="#D9D9D9" />
                </mask>
                <g mask="url(#mask0_148_241)">
                  <path
                    d="M12.0017 11.8654C12.4992 11.8654 12.9246 11.6882 13.2778 11.3339C13.631 10.9795 13.8076 10.5536 13.8076 10.056C13.8076 9.55839 13.6305 9.133 13.2761 8.7798C12.9218 8.4266 12.4958 8.25 11.9983 8.25C11.5007 8.25 11.0753 8.42717 10.7221 8.7815C10.3689 9.13583 10.1923 9.56179 10.1923 10.0594C10.1923 10.557 10.3694 10.9824 10.7238 11.3356C11.0781 11.6888 11.5041 11.8654 12.0017 11.8654ZM12 19.5135C13.9564 17.7622 15.4535 16.0824 16.4913 14.474C17.5291 12.8657 18.048 11.457 18.048 10.2481C18.048 8.42498 17.4689 6.92627 16.3105 5.7519C15.1522 4.57753 13.7153 3.99035 12 3.99035C10.2846 3.99035 8.84771 4.57753 7.68938 5.7519C6.53105 6.92627 5.95188 8.42498 5.95188 10.2481C5.95188 11.457 6.47079 12.8657 7.5086 14.474C8.54644 16.0824 10.0436 17.7622 12 19.5135ZM12 21.5096C9.4833 19.3288 7.59613 17.2993 6.33843 15.4211C5.08075 13.5429 4.4519 11.8186 4.4519 10.2481C4.4519 7.94038 5.19838 6.07213 6.69133 4.64328C8.18426 3.21443 9.9538 2.5 12 2.5C14.0461 2.5 15.8156 3.21443 17.3086 4.64328C18.8015 6.07213 19.548 7.94038 19.548 10.2481C19.548 11.8186 18.9192 13.5429 17.6615 15.4211C16.4038 17.2993 14.5166 19.3288 12 21.5096Z"
                    fill="#404B5A"
                  />
                </g>
              </svg>
            </div>{" "}
            Locations{" "}
          </Link>
          <Link
            className={`navigationButton ${
              currentpath === "/dashboard/deviceinventory" ? "open" : ""
            }`}
            to="/dashboard/deviceinventory"
          >
            {" "}
            <div className="navigationButtonLogoContainer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24"
                viewBox="0 -960 960 960"
                width="24"
              >
                <path d="M446.154-413.846q41.846 0 70.923-29.077 29.077-29.077 29.077-70.923 0-41.847-29.077-70.924-29.077-29.077-70.923-29.077-41.847 0-70.924 29.077-29.077 29.077-29.077 70.924 0 41.846 29.077 70.923 29.077 29.077 70.924 29.077Zm197.231 139.999L535.692-381.924q-20 14.154-42.692 21.115-22.693 6.962-46.846 6.962-66.769 0-113.385-46.615-46.615-46.616-46.615-113.384 0-66.769 46.615-113.385 46.616-46.615 113.385-46.615 66.768 0 113.384 46.615 46.615 46.616 46.615 113.385 0 24.153-7.269 46.846-7.27 22.692-21.424 42.692L686.153-316l-42.768 42.153ZM212.309-140.001q-30.308 0-51.308-21t-21-51.308V-360H200v147.691q0 4.616 3.846 8.463 3.847 3.846 8.463 3.846H360v59.999H212.309Zm387.691 0V-200h147.691q4.616 0 8.463-3.846 3.846-3.847 3.846-8.463V-360h59.999v147.691q0 30.308-21 51.308t-51.308 21H600ZM140.001-600v-147.691q0-30.308 21-51.308t51.308-21H360V-760H212.309q-4.616 0-8.463 3.846-3.846 3.847-3.846 8.463V-600h-59.999ZM760-600v-147.691q0-4.616-3.846-8.463-3.847-3.846-8.463-3.846H600v-59.999h147.691q30.308 0 51.308 21t21 51.308V-600H760Z" />
              </svg>
            </div>{" "}
            Discovered Devices{" "}
          </Link>
          <Link
            className={`navigationButton ${
              currentpath === "/dashboard/discovereddevice" ? "open" : ""
            }`}
            to="/dashboard/discovereddevice"
          >
            {" "}
            <div className="navigationButtonLogoContainer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24"
                viewBox="0 -960 960 960"
                width="24"
              >
                <path d="M212.309-100.001q-29.923 0-51.115-21.193-21.193-21.192-21.193-51.115v-447.922q-17.615-9.077-28.807-25.808-11.193-16.731-11.193-38.577v-103.075q0-29.923 21.193-51.115 21.192-21.193 51.115-21.193h615.382q29.923 0 51.115 21.193 21.193 21.192 21.193 51.115v103.075q0 21.846-11.193 38.577-11.192 16.731-28.807 25.808v447.922q0 29.923-21.193 51.115-21.192 21.193-51.115 21.193H212.309ZM200-612.309v438.077q0 6.154 4.423 10.193Q208.847-160 215.386-160h532.305q5.385 0 8.847-3.462 3.462-3.462 3.462-8.847v-440H200Zm-27.691-59.998h615.382q5.385 0 8.847-3.462 3.462-3.462 3.462-8.847v-103.075q0-5.385-3.462-8.847-3.462-3.462-8.847-3.462H172.309q-5.385 0-8.847 3.462-3.462 3.462-3.462 8.847v103.075q0 5.385 3.462 8.847 3.462 3.462 8.847 3.462Zm195.384 249.613h224.614V-480H367.693v57.306ZM480-386.154Z" />
              </svg>
            </div>{" "}
            Devices Inventory
          </Link>
          <Link
            className={`navigationButton ${
              currentpath === "/dashboard/trusted-ips" ? "open" : ""
            }`}
            to="/dashboard/trusted-ips"
          >
            {" "}
            <div className="navigationButtonLogoContainer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24"
                viewBox="0 -960 960 960"
                width="24"
              >
                <path d="M212.309-100.001q-29.923 0-51.115-21.193-21.193-21.192-21.193-51.115v-447.922q-17.615-9.077-28.807-25.808-11.193-16.731-11.193-38.577v-103.075q0-29.923 21.193-51.115 21.192-21.193 51.115-21.193h615.382q29.923 0 51.115 21.193 21.193 21.192 21.193 51.115v103.075q0 21.846-11.193 38.577-11.192 16.731-28.807 25.808v447.922q0 29.923-21.193 51.115-21.192 21.193-51.115 21.193H212.309ZM200-612.309v438.077q0 6.154 4.423 10.193Q208.847-160 215.386-160h532.305q5.385 0 8.847-3.462 3.462-3.462 3.462-8.847v-440H200Zm-27.691-59.998h615.382q5.385 0 8.847-3.462 3.462-3.462 3.462-8.847v-103.075q0-5.385-3.462-8.847-3.462-3.462-8.847-3.462H172.309q-5.385 0-8.847 3.462-3.462 3.462-3.462 8.847v103.075q0 5.385 3.462 8.847 3.462 3.462 8.847 3.462Zm195.384 249.613h224.614V-480H367.693v57.306ZM480-386.154Z" />
              </svg>
            </div>{" "}
            Trusted IPs
          </Link>
        </div>
      </div>
    </div> */}

    </>
  );
};

export default Sidebar;
