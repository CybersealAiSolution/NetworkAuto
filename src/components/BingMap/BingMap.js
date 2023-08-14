import React, { useEffect, useRef } from "react";
import "./index.css";

const BingMapComponent = (props) => {
  const mapRef = useRef(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://www.bing.com/api/maps/mapcontrol?callback=initMap&key=AtxPEcqkS6l8tbwa-SP0bY9Yk0nsSU5ShmIUB6brcwM_TRftC2TJp5OPOOwddPdx";
    script.async = true;
    script.defer = true;
    window.initMap = () => {
      const map = new window.Microsoft.Maps.Map(mapRef.current, {
        center: new window.Microsoft.Maps.Location(51.51, -0.13),
        zoom: 500,
      });

      window.Microsoft.Maps.loadModule(
        "Microsoft.Maps.AutoSuggest",
        function () {
          const manager = new window.Microsoft.Maps.AutosuggestManager({
            map: map,
          });
          manager.attachAutosuggest(
            "#searchBox",
            "#searchBoxContainer",
            function (place) {
              map.entities.clear();
              const pushpin = new window.Microsoft.Maps.Pushpin(place.location);
              console.log(place);
              props.setpostalCode(place.address.postalCode ? place.address.postalCode : '');
              props.setcity(place.address.locality ? place.address.locality : '');
              
              props.setstreetName(place.address.addressLine ? place.address.addressLine : '');
              props.setStateorProvince(place.address.adminDistrict ? place.address.adminDistrict : '');
              props.setlatitude(place.location.latitude ? place.location.latitude : 0);
              props.setlongitude(place.location.longitude ? place.location.longitude : 0);
              props.setOption(place.address.countryRegionISO2?place.address.countryRegionISO2:'');
              console.log("pushpin", pushpin);
              map.entities.push(pushpin);
              map.setView({ bounds: place.bestView });
            }
          );
        }
      );
    };

    document.head.appendChild(script);
  },[]);

  return (
    <>
      <div id="searchBoxContainer" className="mainCon">
        <label htmlFor="option">Address</label>
        <input
          type="text"
          id="searchBox"
          style={{
            width: "98.2%",
            padding: "8px",
            fontSize: "16px",
            color: "#333",
            border: "1px solid #ccc",
            backgroundColor: "#fff",
            borderRadius: "4px",
            outline: "none",
          }}
        />
      </div>
      {/* <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          // height: "100vh",
        }}
      > */}
      <div className="map-container">
        <div className="map">
          <div
            id="myMap"
            ref={mapRef}
            style={{ width: "100%", height: "400px" }}
          ></div>
        </div>
      </div>
      {/* </div> */}
    </>
  );
};

export default BingMapComponent;