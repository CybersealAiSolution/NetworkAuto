import * as React from "react";
import Box from "@mui/material/Box";
import Button from '@mui/joy/Button';
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
// import { instance } from "../../../../../Fetch";
// import { setAlert } from "store/modules/alertSlice/alertSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { instance } from "Fetch";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  gap: "48px",
  alignSelf: "stretch",
  p: 4,
};
const BasicModal = (props) => {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const [loader, setLoader] = React.useState()

  const handleDeleteClick = async (obj) => {

    try {
      setLoader(true)
      const response = await instance.get(`/tenants/deleteAdmin/${obj.userName}`);
      // dispatch(
      //   setAlert({
      //     msg: response.data.message,
      //     status: response.data.messageStatus,
      //   })
      // );
    } catch (err) {
      console.error(`failed to delete admin users ${err}`);
      if (err.response.status === 403) {
        // dispatch(
        //   setAlert({
        //     msg: "missing CSRF Token",
        //     status: "Failed",
        //   })
        // );
        navigate('/');
      } else {
        // dispatch(
        //   setAlert({
        //     msg: "Failed to delete tenant admins ",
        //     status: "Failed",
        //   })
        // );
      }
    }
    setLoader(false)
    props.setrandomValue(Math.random)
    props.handleClose();
  };
  return (
    <div>
      {/* <Button onClick={handleOpen}>Open modal</Button> */}
      <Modal
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Confirm Do you want to delete this User?
          </Typography>
          <Box
            className="buttn"
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "flex-end",
              width: "100%",
              gap: "10px",
            }}
          >
            <Button
              variant="solid"
              sx={{
                backgroundColor: "#fff",
                color: "#000",
                border: "1px solid black",
                "&:hover": {
                  border: "1px solid black",
                },
              }}
              onClick={props.handleClose}
            >
              Cancel
            </Button>
            <Button 
              variant="solid"
              loadingPosition="start"
              loading={loader}
              // variant="contained"
              sx={{
                backgroundColor: "#000",
                color: "white",
                "&:hover": {
                  backgroundColor: "black",
                  color: "white",
                },
              }}
              onClick={() => handleDeleteClick(props.userObject)}
            >
              Delete
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default BasicModal;
