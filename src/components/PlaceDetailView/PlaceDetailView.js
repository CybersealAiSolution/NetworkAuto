import React, { useEffect, useState } from "react";
import "./index.css";
import { useParams } from "react-router-dom";
import Tabs from "./Tabs/Tabs";
import {instance} from "Fetch"

const PlaceDetailView = () => {
    const [data, setData] = useState({});
    const {id}= useParams();
  
    useEffect(() => {
      const getEmergencyAddress = async () => {
        try {
          const response = await instance.get(
            `/get_places_detail/${id}`,
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
  
          const addressObject = response.data;
          setData(addressObject);
          if (response.data.error) {
            alert(response.data.error);
            return;
          } else {
            // navigate("/");
            console.log("first");
          }
        } catch (error) {
          // Handle any errors that may occur during the API call
          console.error("Error sending data:", error);
        }
      };
      getEmergencyAddress();
    },[]);
  
  
    // Handler for the text field change
  
  
    // Handler for the select option change
  
    // Handler for form submission
  
  
  
    return (
      <div className="adminComponent">
       <div className="adminComponentHeader">
          <h1 className="adminComponentTitle">{data.emergency_locations? data.emergency_locations.description :""}</h1>
        </div>
        <div className="contain">
          <div className="one">
            <div className="onefirst">
              {data.emergency_locations? data.emergency_locations.fulladdress :""}
              <br />
              <br />
              <b>Location ID:</b> {data.emergency_locations? data.emergency_locations.locationId :""}
              <br />
              <br />
              <b>Organization name: </b>  Contoso
            </div>
            <div className="onesec">
              <p style={{ margin: "26px 0" }}><b>Places : </b> 0</p>
              <p style={{ margin: "26px 0" }}><b>Voice users : </b> 1</p>
              <p style={{ margin: "26px 0" }}><b>Phone numbers : </b> 1</p>
            </div>
          </div>
          <div className="two">
            <div className="twofirst">
              <p style={{ textAlign: "center" }}><b>Location network summary</b></p>
              <hr style={{ margin: "20px" }} />
              <div style={{ textAlign: "left", marginLeft: "50px" }}>
                <p style={{ margin: "26px 0" }}><b>Subnets</b> {data.subnet? data.subnet.length :"0"}</p>
                <p style={{ margin: "26px 0" }}><b>Wi-Fi access points</b> {data.accessPoints? data.accessPoints.length :"0"}</p>
                <p style={{ margin: "26px 0" }}><b>Switches</b> {data.switches? data.switches.length :"0"}</p>
                <p style={{ margin: "26px 0" }}><b>Ports</b> 1</p>
              </div>
            </div>
          </div>
        </div>
        <Tabs /> 
      </div>
    );
}

export default PlaceDetailView