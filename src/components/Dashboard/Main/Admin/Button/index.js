import React, { useState } from "react";
import "./index.css";
// import AddAdmin from "../addAdmin/addAdmin";
import { Box, Button } from "@mui/material";
import { useSelector } from "react-redux";
import AddAdmin from "../addAdmin/addAdmin";
// import Button from "@mui/material/Button";

export default function AddButton({reload,setrandomValue}) {
  const { roles } = useSelector((state) => state.users); // Use "state.users" here
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
             + Add Admin
          </Button>

        {isSliderOpen && (
          <div className="overlay" onClick={() => setIsSliderOpen(false)}></div>
        )}
        <AddAdmin
          open={isSliderOpen}
          closeSlider={handleCloseSlider}
          onApplyFilters={handleApplyFilters}
          fetchData={() => reload()}
          setrandomValue={setrandomValue}
        />
        {/* <Button
            sx={{
              height:'50px',
              backgroundColor: "#212934",
              color: "white",
              borderRadius: "7px",
              fontSize: 14,
              paddingX: "15px",
              "&:hover": {
                backgroundColor: "black",
                color: "white",
              },
            }}
            onClick={() => setIsSliderOpen(!isSliderOpen)}
          >
             + Create Queue
          </Button> */}
      </Box>
    )
  );
}

// import React, { useState, useEffect, useRef } from "react";
// import Box from "@mui/material/Box";
// import Drawer from "@mui/material/Drawer";
// import Button from "@mui/material/Button";
// import List from "@mui/material/List";
// import Divider from "@mui/material/Divider";
// import ListItem from "@mui/material/ListItem";
// import ListItemButton from "@mui/material/ListItemButton";
// import ListItemIcon from "@mui/material/ListItemIcon";
// import ListItemText from "@mui/material/ListItemText";
// import InboxIcon from "@mui/icons-material/MoveToInbox";
// import MailIcon from "@mui/icons-material/Mail";
// import Autocomplete from "@mui/material/Autocomplete";
// import FormControl from "@mui/joy/FormControl";
// import FormLabel from "@mui/joy/FormLabel";
// import Checkbox from "@mui/material/Checkbox";
// import DrawerItem from "./drawer";

// export default function TemporaryDrawer() {
//   const [isOpen, setIsOpen] = useState(false);

//   const toggleDrawer = (open) => (event) => {
//     if (
//       event.type === "keydown" &&
//       (event.key === "Tab" || event.key === "Shift")
//     ) {
//       return;
//     }

//     setIsOpen(open);
//   };

//   const List = () => {
//     const [isSliderOpen, setIsSliderOpen] = useState(false);
//     const [filter, setFilter] = useState({
//       numberType: [],
//       department: [],
//       domain: [],
//       country: [],
//     });

//     const handleApplyFilters = (filters) => {
//       setFilter(filters)
//     };
//     const handleCloseSlider = () => {
//       setIsSliderOpen(false);
//     };
//     return (
//     <Box
//       sx={{ width: "488px" }}
//       role="presentation"
//       onClick={toggleDrawer(false)}
//       onKeyDown={toggleDrawer(false)}
//     >
//       {/* <List>
//         {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
//           <ListItem key={text} disablePadding>
//             <ListItemButton>
//               <ListItemIcon>
//                 {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
//               </ListItemIcon>
//               <ListItemText primary={text} />
//             </ListItemButton>
//           </ListItem>
//         ))}
//       </List>
//       <Divider />
//       <List>
//         {["All mail", "Trash", "Spam"].map((text, index) => (
//           <ListItem key={text} disablePadding>
//             <ListItemButton>
//               <ListItemIcon>
//                 {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
//               </ListItemIcon>
//               <ListItemText primary={text} />
//             </ListItemButton>
//           </ListItem>
//         ))}
//       </List> */}
//       <DrawerItem
//           closeSlider={handleCloseSlider}
//           onApplyFilters={handleApplyFilters}/>
//     </Box>
//   )};

//   return (
//     <div>
//       <Button onClick={toggleDrawer(true)}>+ Add admin</Button>
//       <Drawer anchor="right" open={isOpen} onClose={toggleDrawer(false)}>
//         {List()}
//       </Drawer>
//     </div>
//   );
// }
