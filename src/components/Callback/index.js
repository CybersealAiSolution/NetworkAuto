import React, { useEffect } from "react";
import { connect } from "react-redux";
import Backdrop from '@mui/material/Backdrop';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import CircularProgress from '@mui/joy/CircularProgress';
import Button from '@mui/joy/Button';
import './index.css'

// import {userLogin} from 'actions' 
console.log('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx')
function CallBack(props) {
    let navigate = useNavigate();

    const fullURL = window.location.href;
    const urlObj = new URL(fullURL);
    // Change the hostname
    urlObj.hostname = process.env.REACT_APP_SERVER_IP_ADDRESS? process.env.REACT_APP_SERVER_IP_ADDRESS:"localhost";
    urlObj.port = process.env.REACT_APP_SERVER_PORT?process.env.REACT_APP_SERVER_PORT:"5000";


    const updatedUrl = urlObj.toString();

    useEffect(() => {
        const handleCallback = async () => {
            try {
                const url = updatedUrl;
                const response = await axios.get(url, {
                    withCredentials: true,
                });
                if(response.status===201){
                    // props.userLogin(response.data.graph_data)
                    navigate('/dashboard');
                }
                else{
                    console.error('unauthorized user',);
                    navigate('/');                     
                }
            } catch (error) {
                console.error('Error fetching data:', error);
                navigate('/');
            }
        }
        
        handleCallback();
    },);

    return (
        <div >
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open
            >
                <Button sx={{backgroundColor:'#073771'}} startDecorator={<CircularProgress variant="solid" />}>Loading…</Button>

            </Backdrop>
       
        </div>
    )

}

// const mapStateToprops = (states) => {
//     return { 
//         userinfo: states.UserInfo 
//     }
// }
export default CallBack;
// export default connect(mapStateToprops,{userLogin})(CallBack)