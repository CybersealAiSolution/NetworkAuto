import "./index.css";
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
// import { TenantInfo } from "actions";
import { useNavigate } from "react-router-dom";
import Button from "@mui/joy/Button";
import Divider from "@mui/material/Divider";
import ListItemIcon from "@mui/material/ListItemIcon";
import ModalClose from "@mui/joy/ModalClose";
import ManageAccountsOutlinedIcon from "@mui/icons-material/ManageAccountsOutlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import CorporateFareOutlinedIcon from "@mui/icons-material/CorporateFareOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import Input from "@mui/joy/Input";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import Stack from "@mui/joy/Stack";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import { Typography as TypographyJoy } from "@mui/joy";
import {
  Toolbar,
  Typography,
  Tooltip,
  Badge,
  Menu,
  MenuItem,
  Avatar,
  Box,
  IconButton,
} from "@mui/material";
// import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import { toast } from "react-toastify";
import { instance } from "Fetch";
import KeyIcon from "@mui/icons-material/Key";
import ReactModal from "react-modal";
import { auto } from "@popperjs/core";

const Header = ({ isSidebarOpen, setIsSidebarOpen }) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isBlankDivVisible, setIsBlankDivVisible] = useState(false);
  const [showTeamsModal, setShowTeamsModal] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showServiceNowModal, setShowServiceNowModal] = useState(false);
  const [instanceName, setInstanceName] = useState("");
  const [userName, setUserName] = useState("");
  const [serviceNowpassword, setServiceNowPassword] = useState("");
  const [serviceNowModalLoading, setServiceNowModalLoading] = useState(false);
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [modalLoading, setModalLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const getAppInfo = async () => {
      try {
        const response = await instance.get("/getAppInfo");
        if (response.data.error) {
          alert(response.data.error);
          return;
        }
        setData(response.data.data);
      } catch (error) {
        console.error("Error fetching devices:", error);
      }
    };
    getAppInfo();
  }, []);

  const handleSyncing = async () => {
    setIsLoading(true);

    const response = await instance.get("/msteams/resyncteams");
    if (response.status === 201) {
      toast.success("Request Accepted, Please wait few minutes!!");
    } else {
      console.log(response.data.error);
      toast.error("Internal Server Error!!");
      return;
    }

    setTimeout(() => {
      setIsLoading(false);
      console.log("syncing....");
    }, 3000); // 5 seconds
  };

  useEffect(() => {}, []);

  const handleLogout = async () => {
    try {
      const response = await instance.get("signout");
      if (response.status === 200) {
        navigate("/");
        toast.success("Successfully Logged out!!");
      } else {
        console.error("Logout failed:", response.data.error);
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  const handleTeamSubmit = async (e) => {
    e.preventDefault();
    setModalLoading(true);
    const payload = {
      password: password,
      userName: email,
    };
    try {
      console.log(payload);
      const response = await instance.post("/setCredentails", payload);
      console.log(response.data);
      if (response.status === 200) {
        toast.success(response.data.message);
        setShowTeamsModal(!showTeamsModal);
      }
      if (response.data.error) {
        toast.error(response.data.message);
        console.log(response.data.error);
        return;
      }
    } catch (error) {
      console.error("Error sending data:", error);
    }
    setModalLoading(false);
  };

  // service now Credentials submit
  const handleServiceNowSubmit = async (e) => {
    e.preventDefault();
    setServiceNowModalLoading(true);
    const payload = {
      instanceName: instanceName,
      userName: userName,
      password: serviceNowpassword,
    };
    try {
      console.log(payload);
      const response = await instance.post(
        "/setServiceNowCredentails",
        payload
      );
      console.log(response.data);
      if (response.status === 200) {
        toast.success(response.data.message);
        setShowServiceNowModal(!showServiceNowModal);
      }
      if (response.data.error) {
        toast.error(response.data.message);
        console.log(response.data.error);
        return;
      }
    } catch (error) {
      console.error("Error sending data:", error);
    }
    setServiceNowModalLoading(false);
  };

  return (
    <>
      <Modal
        open={showServiceNowModal}
        onClose={() => setShowServiceNowModal(false)}
      >
        <ModalDialog
          aria-labelledby="basic-modal-dialog-title"
          aria-describedby="basic-modal-dialog-description"
          sx={{ maxWidth: 500, width: "30%" }}
        >
          <ModalClose
            variant="outlined"
            sx={{
              top: "calc(-1/4 * var(--IconButton-size))",
              right: "calc(-1/4 * var(--IconButton-size))",
              boxShadow: "0 2px 12px 0 rgba(0 0 0 / 0.2)",
              borderRadius: "50%",
              bgcolor: "background.surface",
            }}
          />
          <TypographyJoy id="basic-modal-dialog-title" level="h2">
            Service Now Credentials
          </TypographyJoy>
          <form onSubmit={handleServiceNowSubmit}>
            <Stack spacing={2}>
              <FormControl>
                <FormLabel>Instance Name</FormLabel>
                <Input
                  autoFocus
                  required
                  value={instanceName}
                  placeholder={"e.g : devXXXXXX"}
                  onChange={(e) => setInstanceName(e.target.value)}
                />
              </FormControl>
              <FormControl>
                <FormLabel>UserName</FormLabel>
                <Input
                  autoFocus
                  required
                  value={userName}
                  placeholder={"Username"}
                  onChange={(e) => setUserName(e.target.value)}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Password</FormLabel>
                <Input
                  autoFocus
                  type="password"
                  required
                  value={serviceNowpassword}
                  onChange={(e) => setServiceNowPassword(e.target.value)}
                />
              </FormControl>
              <Button
                type="submit"
                loading={serviceNowModalLoading}
                loadingPosition="start"
              >
                Submit
              </Button>
            </Stack>
          </form>
        </ModalDialog>
      </Modal>

      <Modal open={showTeamsModal} onClose={() => setShowTeamsModal(true)}>
        <ModalDialog
          aria-labelledby="basic-modal-dialog-title"
          aria-describedby="basic-modal-dialog-description"
          sx={{ maxWidth: 500, width: "30%" }}
        >
          <ModalClose
            variant="outlined"
            sx={{
              top: "calc(-1/4 * var(--IconButton-size))",
              right: "calc(-1/4 * var(--IconButton-size))",
              boxShadow: "0 2px 12px 0 rgba(0 0 0 / 0.2)",
              borderRadius: "50%",
              bgcolor: "background.surface",
            }}
          />
          <TypographyJoy id="basic-modal-dialog-title" level="h2">
            MS Teams Global Admin Credentials
          </TypographyJoy>
          <form onSubmit={handleTeamSubmit}>
            <Stack spacing={2}>
              <FormControl>
                <FormLabel>User ID</FormLabel>
                <Input
                  autoFocus
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={"Email"}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Password</FormLabel>
                <Input
                  type={isShowPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  fullWidth
                  InputProps={{
                    endAdornment: (
                      <IconButton
                        onClick={() => setIsShowPassword(!isShowPassword)}
                        edge="end"
                      >
                        {isShowPassword ? (
                          <VisibilityOffIcon />
                        ) : (
                          <VisibilityIcon />
                        )}
                      </IconButton>
                    ),
                  }}
                />
              </FormControl>
              <Button
                type="submit"
                loading={modalLoading}
                loadingPosition="start"
              >
                Submit
              </Button>
            </Stack>
          </form>
        </ModalDialog>
      </Modal>

      <Box
        bgcolor="#F8F9FA"
        sx={{
          height: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          px: "2%",
        }}
      >
        <Typography variant="h6" sx={{ flexGrow: "1", color: "#6E7A8A" }}>
          <b> {data.tenantName ? data.tenantName : "Organization Name"}</b>
        </Typography>
        <Box sx={{ display: "flex", flexGrow: 0 }}>
          <Button
            loading={isLoading ? true : false}
            loadingPosition="start"
            color={"success"}
            variant={"soft"}
            sx={{ height: "40px", my: auto }}
            onClick={handleSyncing}
          >
            Tenant Sync
          </Button>

          <Box>
            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
            ></IconButton>
          </Box>
          <Tooltip title="Open settings">
            <IconButton
              onClick={() => setIsBlankDivVisible(!isBlankDivVisible)}
            >
              <Avatar alt={data.user} src="/static/images/avatar/2.jpg" />
            </IconButton>
          </Tooltip>

          <Menu
            sx={{ mt: "45px", maxWidth: "400px" }}
            id="menu-appbar"
            anchorEl={isBlankDivVisible}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(isBlankDivVisible)}
            onClose={() => setIsBlankDivVisible(!isBlankDivVisible)}
          >
            <Tooltip title={data.user ? data.user : "Username"} followCursor>
              <MenuItem
                onClick={() => setIsBlankDivVisible(!isBlankDivVisible)}
              >
                <Typography
                  textAlign="center"
                  sx={{
                    // width:'90%' ,
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {data.user ? data.user : "Username"}{" "}
                </Typography>
              </MenuItem>
            </Tooltip>

            <Divider />

            <MenuItem
              onClick={() => {
                setIsBlankDivVisible(!isBlankDivVisible);
                setShowTeamsModal(true);
              }}
            >
              <ListItemIcon>
                <ManageAccountsOutlinedIcon fontSize="small" />
              </ListItemIcon>
              <Typography textAlign="center">MsTeams Admin Detail</Typography>
            </MenuItem>
            <MenuItem
              onClick={() => {
                setIsBlankDivVisible(!isBlankDivVisible);
                setShowServiceNowModal(true);
              }}
            >
              <ListItemIcon>
                <KeyIcon fontSize="small" />
              </ListItemIcon>
              <Typography textAlign="center">Service Now Credential</Typography>
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleLogout}>
              <ListItemIcon>
                <LogoutOutlinedIcon fontSize="small" />
              </ListItemIcon>
              <Typography textAlign="center">Log Out</Typography>
            </MenuItem>
          </Menu>
        </Box>
      </Box>
    </>
  );
};

export default Header;
