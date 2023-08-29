import React, { useEffect } from "react";
// import { connect } from "react-redux";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// import {userLogin} from 'actions' 
console.log('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx')
function CallBack(props) {
    let navigate = useNavigate();

    const fullURL = window.location.href;
    const urlObj = new URL(fullURL);
    urlObj.protocol = "https:";
    // Change the hostname
    urlObj.hostname = "20.228.194.127";
    urlObj.port = "5000";

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
                Loading...
       
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