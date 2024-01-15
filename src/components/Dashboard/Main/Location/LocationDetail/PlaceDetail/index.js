import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { instance } from "Fetch";
import { Box, Breadcrumbs, Button, Container, Typography } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { Link } from "react-router-dom";
import Tabs from "@mui/joy/Tabs";
import TabList from "@mui/joy/TabList";
import Tab, { tabClasses } from "@mui/joy/Tab";
import TabPanel from "@mui/joy/TabPanel";
import { DataGrid } from "@mui/x-data-grid";
import SearchIcon from "@mui/icons-material/Search";
import LinearProgress from "@mui/material/LinearProgress";
import Slider from "../../Slider";
import { fontWeight } from "@mui/system";

const PlaceDetail = () => {
  const [data, setData] = useState({});
  const [subnets, setSubnets] = useState([]);
  const [switches, setSwitches] = useState([]);
  const [accessPoints, setAccessPoints] = useState([]);
  const { id } = useParams();
  const searchInputRef = useRef(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredSubsets, setFilteredSubsets] = useState([]);
  const [filteredSwitchs, setFilteredSwitchs] = useState([]);
  const [filteredAccessPoints, setFilteredAccessPoints] = useState([]);
  const [sliderIsOpen, setSliderIsOpen] = useState(false);
  const [formType, setFormType] = useState("subnet");

  const getEmergencyAddress = async () => {
    try {
      const response = await instance.get(`/get_places_detail/${id}`);
      setData(response.data ? response.data : {});
      setSubnets(response.data.subnet ? response.data.subnet: []);
      setSwitches(
        response.data.switches ? response.data.switches : []
      );
      setAccessPoints(
        response.data.accessPoints ? response.data.accessPoints : []
      );
    } catch (error) {
      console.error("Error sending data:", error);
    }
  };

  useEffect(() => {
    getEmergencyAddress();
    // eslint-disable-next-line
  }, [id]);

  const subnetsColumns = [
    { field: "Subnet", headerName: "Subnet", width: 500 },
    { field: "LocationId", headerName: "Location ID", width: 500 },
    { field: "Description", headerName: "Description", width: 500 },
  ];

  const accessPointsColumns = [
    { field: "BSSID", headerName: "BSSID", width: 500 },
    { field: "LocationId", headerName: "Location ID", width: 500 },
    { field: "Description", headerName: "Description", width: 500 },
  ];

  const switchesColumns = [
    { field: "ChassisID", headerName: "ChassisID", width: 500 },
    { field: "LocationId", headerName: "Location ID", width: 500 },
    { field: "Description", headerName: "Description", width: 500 },
  ];

  const CustomGridToolbar = (instance) => {
    setFormType(instance);
    useEffect(() => {
      if (searchInputRef.current) {
        searchInputRef.current.focus();
      }
    }, []);

    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "20px",
          padding: "0.5%",
          alignSelf: "stretch",
          height: "55px",
          borderBottom: "1px solid var(--grey-500, #E0E0E0)",
        }}
      >
        {sliderIsOpen && (
          <Box
            className="overlay"
            onClick={() => setSliderIsOpen(!sliderIsOpen)}
          ></Box>
        )}
        <Slider
          setSliderIsOpen={setSliderIsOpen}
          open={sliderIsOpen}
          formType={formType}
        />
        <Button
          sx={{ borderRadius: "20px" }}
          onClick={() => setSliderIsOpen(true)}
        >
          + Add
        </Button>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            width: "320px",
            height: "40px",
            padding: "12px 24px 12px 18px",
            gap: "12px",
            borderRadius: "36px",
            border: "1px solid var(--grey-500, #E0E0E0)",
            background: "var(--grey-100, #F8F9FA)",
          }}
        >
          <SearchIcon />

          <input
            ref={searchInputRef}
            style={{
              border: "none",
              backgroundColor: "var(--grey-100, #F8F9FA)",
              outline: "none",
            }}
            placeholder="Search here..."
            value={searchQuery}
            onChange={(e) => handleSearch(e, instance)}
          />
        </Box>
      </Box>
    );
  };

  const handleSearch = (e, instance) => {
    const query = e.target.value.toLowerCase();
    // Filter places based on the search query for Address, LocationId, and Description
    if (instance === "subnet") {
      const filtered = subnets.filter(
        (place) =>
          place.Subnet.toLowerCase().includes(query) ||
          place.LocationId.toLowerCase().includes(query) ||
          place.Description.toLowerCase().includes(query)
      );

      setFilteredSubsets(filtered);
    } else if (instance === "switch") {
      const filtered = switches.filter(
        (place) =>
          place.ChassisID.toLowerCase().includes(query) ||
          place.LocationId.toLowerCase().includes(query) ||
          place.Description.toLowerCase().includes(query)
      );

      setFilteredSwitchs(filtered);
    } else if (instance === "accessPoint") {
      const filtered = accessPoints.filter(
        (place) =>
          place.BSSID.toLowerCase().includes(query) ||
          place.LocationId.toLowerCase().includes(query) ||
          place.Description.toLowerCase().includes(query)
      );

      setFilteredAccessPoints(filtered);
    }

    setSearchQuery(query);
  };

console.log(data);
  const locationId = localStorage.getItem("locationId");
  return (
    <>
          
      <Box sx={{ height: "100%" ,overflowY:"scroll",

      "&::-webkit-scrollbar": {
        width: "4px", // Adjust the width as needed
      },
      "&::-webkit-scrollbar-thumb": {
        background: "#888", // Adjust the color as needed
        borderRadius: "3px", // Adjust the border radius as needed
      },
      }}>
        <Breadcrumbs
          separator={<NavigateNextIcon fontSize="large" />}
          aria-label="breadcrumb"
          style={{ paddingLeft: "20px" }}
        >
          <Link
            underline="hover"
            color="inherit"
            component={Link}
            to="/dashboard/location"
          >
            Location
          </Link>
          <Link
            underline="hover"
            color="inherit"
            component={Link}
            to={locationId}
          >
           <Typography>{data.emergency_locations?.description}</Typography>
          </Link>
          <Typography color="text.primary">{data.emergency_locations?.LocationName}</Typography>
        </Breadcrumbs>
        <Container
          style={{
            padding: "2%",
            display: "flex",
            // justifyContent: "space-evenly",
            maxWidth:'100%',
            gap:"8px"
          }}
        >
          
          <Box
            style={{
              // backgroundColor: "white",
              // // paddingTop: "1%",
              // // paddingLeft: "2%",
              // // paddingRight: "2%",
              // width: "62%",
              // borderRadius: "20px",
              // flexDirection: "column",
              backgroundColor: "white",
              padding:"6px",
              // paddingTop: "1%",
              // paddingLeft: "2%",
              // paddingRight: "2%",
              width: "775px",
              // height:"100%",
              minWidth:"350px",
              borderRadius: "20px",
              display:"flex",
              flexDirection: "column",
              gap:"4px",
            }}
          >
            {/* <h1
              style={{
                textAlign: "center",
                marginTop: "1%",
                marginBottom: "1%",
              }}
            > */}
            <Typography variant="h5"
              // fontWeight={700}
              sx={{fontWeight:700}}
              style={{
                textAlign: "center",
                marginTop: "1%",
                // marginBottom: "1%",
              }}
            >
              {data.emergency_locations
                ? data.emergency_locations.description
                : ""}
            </Typography>
            <Box
              style={{
                backgroundColor: "white",
                // paddingTop: "1%",
                display: "flex",
                justifyContent: "space-around",
                height:"90%",
              }}
            >
              <Box
                style={{
                  backgroundColor: "#E1E7EC",
                  padding: "4%",
                  width: "58%",
                  height:"95%",
                  display: "flex",
                  alignItems: "center",
                  borderRadius: "20px",
                }}
              >
                <img
                  style={{ borderRadius: "50%" }}
                  src="https://play-lh.googleusercontent.com/DjaU6KyuxC-G0dvwCZ-xICXv96swVNTfv3nDTbs7XFaPHVX-wVkUQIcMDuGZz0H4hkQ=w240-h480-rw"
                  height={100}
                />
                <Box style={{ marginLeft: "25px" }}>
                  <Typography>{data.emergency_locations
                    ? data.emergency_locations.fulladdress
                    : ""}
                  </Typography>
                  {/* <br /> */}
                  <Typography style={{fontWeight:"bold"}}>Validated</Typography>
                  {/* <br /> */}
                  
                  <Typography style={{ fontWeight: 'bold' }}>Location ID:{" "}</Typography>
                  <Typography>{data.emergency_locations
                    ? data.emergency_locations.locationId
                    : ""}
                  </Typography>
                  {/* <br /> */}
                  <Typography style={{ fontWeight: 'bold' }}>
                  Organization name:{" "}
                  </Typography>
                  <Typography>
                  Contoso
                  </Typography>
                </Box>
              </Box>
              <Box
                style={{
                  backgroundColor: "#E1E7EC",
                  padding: "2%",
                  // paddingTop: "4%",
                  width: "38%",
                  height:"95%",
                  borderRadius: "20px",
                  // textAlign: "center",
                  display:"flex",
                  flexDirection:"column",
                  justifyContent:"center",
                  alignItems:"center"
                }}
              >
                {/* <br /> */}
                <Typography style={{ fontWeight: 'bold' }}>Voice users</Typography>
                {/* <br /> */}
                <Typography>0</Typography>
                {/* <br /> */}
                {/* <br /> */}
                <Typography style={{ fontWeight: 'bold' }}>Phone numbers</Typography>
                {/* <br /> */}
                <Typography>5</Typography>
                {/* <br /> */}
              </Box>
            </Box>
          </Box>
          <Box
            style={{
              backgroundColor: "white",
              padding: "12px",
              // paddingLeft: "2.3%",
              width: "35%",
              borderRadius: "20px",
              textAlign: "center",
              gap:"4px"
            }}
          >
            <Typography 
                variant="h5" 
                sx={{fontWeight:700}}
                style={{
                  textAlign: "center",
                  // marginTop: "1%",
                  marginBottom: "1%",
                }}
              >Location network summary
            </Typography>

            <Box
              style={{
                backgroundColor: "#E1E7EC",
                padding: "4%",
                
                // marginTop: "5%",
                borderRadius: "20px",
               
              
                height:"85%",
                display:"flex",
                flexDirection:"column",
                justifyContent:"center",
                alignItems:"center",
              }}
            >
              <Typography style={{ fontWeight: "bold" }}>Wi-Fi access points</Typography>
              {/* <br /> */}
              <Typography>{data.accessPoints ? data.accessPoints.length : "0"}</Typography>
              {/* <br /> */}
              <Typography style={{ fontWeight: "bold" }}>Switches</Typography>
              {/* <br /> */}
              <Typography>{data.switches ? data.switches.length : "0"}</Typography>
              {/* <br /> */}
              <Typography style={{ fontWeight: "bold" }}>Subnets</Typography>
              {/* <br /> */}
              <Typography>{data.subnets ? data.subnets.length : "0"}</Typography>
              {/* <br /> */}
              <Typography style={{ fontWeight: "bold" }}>Ports</Typography>
              {/* <br /> */}
              <Typography>1</Typography>
              {/* <br /> */}
            </Box>
          </Box>
        </Container>

        <Container
          style={{
            height: "100%",
            maxWidth:'100%'
          }}
        >
          <Tabs
            aria-label="tabs"
            defaultValue={0}
            sx={{
              bgcolor: "transparent",
              height: "100%",
              overflow: "hidden",
              marginRight: "1%",
              marginLeft: "1%",
              // marginTop: "-1%",
            }}
          >
            <TabList
              disableUnderline
              sx={{
                p: 0.5,
                gap: 0.5,
                borderRadius: "xl",
                // bgcolor: 'background.level1',
                [`& .${tabClasses.root}[aria-selected="true"]`]: {
                  boxShadow: "sm",
                  bgcolor: "background.surface",
                },
                justifyContent: "space-evenly",
                marginBottom: "1%",
              }}
              onClick={() => setSearchQuery("")}
            >
              <Tab disableIndicator>Subnets</Tab>
              <Tab disableIndicator>Access Points</Tab>
              <Tab disableIndicator>Switches</Tab>
            </TabList>
            <TabPanel value={0} sx={{ padding: 0 }}>
              <DataGrid
                className="userInventory"
                rows={filteredSubsets.length > 0 ? filteredSubsets : subnets}
                columns={subnetsColumns}
                getRowId={(row) => row.Subnet}
                disableRowSelectionOnClick
                sx={{
                  borderRadius: "20px",
                  // overflow: "hidden",
                  height: 572, // Example fixed height
                  background: "white",
                }}
                slots={{
                  toolbar: () => CustomGridToolbar("subnet"),
                  loadingOverlay: LinearProgress,
                }}
                hideFooter={true}
              />
            </TabPanel>
            <TabPanel value={1} sx={{ padding: 0, }}>
              <DataGrid
              className="userInventory"
                rows={
                  filteredAccessPoints.length > 0
                    ? filteredAccessPoints
                    : accessPoints
                }
                columns={accessPointsColumns}
                getRowId={(row) => row.BSSID}
                disableRowSelectionOnClick
                sx={{
                  borderRadius: "20px",
                  // overflow: "hidden",
                  background: "white",
                  height: 572, // Example fixed height
                }}
                slots={{
                  toolbar: () => CustomGridToolbar("accessPoint"),
                  loadingOverlay: LinearProgress,
                }}
                hideFooter={true}
              />
            </TabPanel>
            <TabPanel value={2} sx={{ padding: 0}}>
              <DataGrid
              className="userInventory"
                rows={filteredSwitchs.length > 0 ? filteredSwitchs : switches}
                columns={switchesColumns}
                getRowId={(row) => row.ChassisID}
                disableRowSelectionOnClick
                sx={{
                  borderRadius: "20px",
                  // overflow: "hidden",
                  background: "white",
                  height: 572, // Example fixed height
                }}
                slots={{
                  toolbar: () => CustomGridToolbar("switch"),
                  loadingOverlay: LinearProgress,
                }}
                hideFooter={true}
              />
            </TabPanel>
          </Tabs>
        </Container>
      </Box>
    </>
  );
};

export default PlaceDetail;
