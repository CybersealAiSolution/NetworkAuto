import React, { useEffect, useState, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import { instance } from "Fetch";
import { Box, Container, Typography,Button, Breadcrumbs } from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";
import Tabs from "@mui/joy/Tabs";
import TabList from "@mui/joy/TabList";
import Tab, { tabClasses } from "@mui/joy/Tab";
import TabPanel from "@mui/joy/TabPanel";
import { DataGrid } from "@mui/x-data-grid";
import SearchIcon from "@mui/icons-material/Search";
import Slider from "../Slider";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

const LocationDetail = () => {
  const [data, setData] = useState({});
  const [subnets, setSubnets] = useState([]);
  const [switches, setSwitches] = useState([]);
  const [accessPoints, setAccessPoints] = useState([]);
  const [places, setPlaces] = useState([]);
  const { id } = useParams();
  const searchInputRef = useRef(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredPlaces, setFilteredPlaces] = useState([]);
  const [filteredSubsets, setFilteredSubsets] = useState([]);
  const [filteredSwitchs, setFilteredSwitchs] = useState([]);
  const [filteredAccessPoints, setFilteredAccessPoints] = useState([]);
  const [sliderIsOpen, setSliderIsOpen] = useState(false);
  const [formType, setFormType] = useState("place");

  const getEmergencyAddress = async () => {
    try {
      const response = await instance.get(`/getlocationsdetail/${id}`);
      setData(response.data ? response.data : {});
    } catch (error) {
      console.error("Error sending data:", error);
    }
  };

  const getAccessPointData = async () => {
    try {
      const response = await instance.get(
        `/getlocationsdetail/accessPoints/${id}`
      );
      setAccessPoints(
        response.data.accessPoints ? response.data.accessPoints : []
      );
    } catch (error) {
      console.error("Error getting access point data:", error);
    }
  };

  const getPlaceData = async () => {
    try {
      const response = await instance.get(`/getlocationsdetail/places/${id}`);
      setPlaces(response.data.places ? response.data.places : []);
    } catch (error) {
      console.error("Error getting place data:", error);
    }
  };

  const getSwitchesData = async () => {
    try {
      const response = await instance.get(`/getlocationsdetail/switches/${id}`);
      setSwitches(response.data.switches ? response.data.switches : []);
    } catch (error) {
      console.error("Error getting switches data:", error);
    }
  };

  const getSubnetData = async () => {
    try {
      const response = await instance.get(`/getlocationsdetail/subnets/${id}`);
      setSubnets(response.data.subnets ? response.data.subnets : []);
    } catch (error) {
      console.error("Error getting subnet data:", error);
    }
  };

  useEffect(() => {
    getEmergencyAddress();
    getAccessPointData();
    getPlaceData();
    getSwitchesData();
    getSubnetData();
    localStorage.setItem("locationId", window.location.pathname);
    // eslint-disable-next-line
  }, []);

  const placesColumns = [
    {
      field: "Description",
      headerName: "Name",
      width: 400,
      renderCell: (params) => (
        <Link to={`/dashboard/location/place/${params.row.LocationId}`}>
          {params.row.Description}
        </Link>
      ),
    },
    {
      field: "Address",
      headerName: "Address",
      width: 500,
    },
    { field: "LocationId", headerName: "Location ID", width: 500 },
  ];

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
    console.log(instance);
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
          <SearchIcon></SearchIcon>

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
    if (instance === "place") {
      const filtered = places.filter(
        (place) =>
          place.Address.toLowerCase().includes(query) ||
          place.LocationId.toLowerCase().includes(query) ||
          place.Description.toLowerCase().includes(query)
      );

      setFilteredPlaces(filtered);
    } else if (instance === "subnet") {
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

  return (
    <>
      <Box sx={{ height: "100%" , overflowY:"scroll",

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
          <Typography color="text.primary">{data.emergency_locations?.description}</Typography>
        </Breadcrumbs>
        <Container
          style={{
            padding: "12px",
            display: "flex",
            justifyContent: "space-evenly",
            maxWidth:'100%',
            gap:"8px",
          }}
        >
          <Box
            style={{
              backgroundColor: "white",
              padding:"6px",
              // paddingTop: "1%",
              // paddingLeft: "2%",
              // paddingRight: "2%",
              width: "775px",
              // height:"30%",
              minWidth:"350px",
              borderRadius: "20px",
              display:"flex",
              flexDirection: "column",
              gap:"4px",
            }}
          >
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
                //paddingTop: "1%",
                display: "flex",
                justifyContent: "space-around",
                height:"90%",
              }}
            >
              <Box
                style={{
                  backgroundColor: "#E1E7EC",
                  padding: "4%",
                  // paddingTop:'2%',
                  // justifyContent:'center',
                  height:"95%",
                  width: "58%",
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
                  <Typography>
                  {data.emergency_locations
                    ? data.emergency_locations.fulladdress
                    : ""}
                  </Typography>
                  
                  <Typography style={{ fontWeight: 'bold' }}>Validated</Typography>
                  
                  {/* <Box sx={{display:"flex"}}> */}
                  <Typography style={{ fontWeight: 'bold' }}>Location ID:{" "}</Typography>
                  <Typography>{data.emergency_locations
                    ? data.emergency_locations.locationId
                    : ""}
                  </Typography>
                  {/* </Box> */}
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
                <Typography style={{ fontWeight: 'bold' }}>Places</Typography>
                <Typography>
                {places.length || "0"}
                </Typography>
                {/* <br /> */}
                {/* <br /> */}
                <Typography style={{ fontWeight: 'bold' }}>Voice users</Typography>
                
                <Typography>0</Typography>
                
                
                <Typography style={{ fontWeight: 'bold' }}>Phone numbers</Typography>
                
                <Typography>5</Typography>
                
              </Box>
            </Box>
          </Box>
          <Box
            style={{
              backgroundColor: "white",
              padding: "12px",
              // paddingLeft: "2.3%",
              width: "35%",
              // height:"40%",
              borderRadius: "20px",
              textAlign: "center",
              gap:"4px"
            }}
          >
            {/* <Box> */}
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
            {/* </Box> */}

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
              <Typography>{data.subnet ? data.subnet.length : "0"}</Typography>
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
             maxWidth:'100%',
            //  overflow: "scroll",
            // padding: "2%",
            // display: "flex",
            // justifyContent: "space-around",
            // width:'100%'
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
              // marginTop: "1%",
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
              <Tab disableIndicator>Places</Tab>
              <Tab disableIndicator>Subnets</Tab>
              <Tab disableIndicator>Access Points</Tab>
              <Tab disableIndicator>Switches</Tab>
            </TabList>
            <TabPanel value={0} sx={{ padding: 0}}>
              <DataGrid
                className="userInventory"
                rows={filteredPlaces.length > 0 ? filteredPlaces : places}
                columns={placesColumns}
                getRowId={(row) => row.LocationId}
                autoHeight={false}
                disableRowSelectionOnClick
                sx={{
                  borderRadius: "20px",
                  // overflow: "scroll",
                  height: 572, // Example fixed height
                  background: "white",
                }}
                // rowHeight={35} // Set the desired row height in pixels
                slots={{
                  toolbar: () => CustomGridToolbar("place"),
                  loadingOverlay: LinearProgress,
                }}
                hideFooter={true}
              />
            </TabPanel>
            <TabPanel value={1} sx={{ padding: 0 }}>
              <DataGrid
                className="userInventory"
                rows={filteredSubsets.length > 0 ? filteredSubsets : subnets}
                columns={subnetsColumns}
                getRowId={(row) => row.Subnet}
                disableRowSelectionOnClick
                slots={{
                  toolbar: () => CustomGridToolbar("subnet"),
                  loadingOverlay: LinearProgress,
                }}
                sx={{
                  borderRadius: "20px",
                  // overflow: "hidden",
                  background: "white",
                  height: 572, // Example fixed height
                }}
                hideFooter={true}
              />
            </TabPanel>
            <TabPanel value={2} sx={{ padding: 0}}>
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
                slots={{
                  toolbar: () => CustomGridToolbar("accessPoint"),
                  loadingOverlay: LinearProgress,
                }}
                sx={{
                  borderRadius: "20px",
                  // overflow: "hidden",
                  height: 572, // Example fixed height
                  background: "white",
                }}
                hideFooter={true}
              />
            </TabPanel>
            <TabPanel value={3} sx={{ padding: 0}}>
              <DataGrid
                className="userInventory"
                rows={filteredSwitchs.length > 0 ? filteredSwitchs : switches}
                columns={switchesColumns}
                getRowId={(row) => row.ChassisID}
                disableRowSelectionOnClick
                slots={{
                  toolbar: () => CustomGridToolbar("switch"),
                  loadingOverlay: LinearProgress,
                }}
                sx={{
                  borderRadius: "20px",
                  // overflow: "hidden",
                  height: 572, // Example fixed height
                  background: "white",
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

export default LocationDetail;
