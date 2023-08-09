import React, { useEffect, useRef } from "react";

const BingMapComponent = () => {
  const mapRef = useRef(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://www.bing.com/api/maps/mapcontrol?callback=initMap&key=AtxPEcqkS6l8tbwa-SP0bY9Yk0nsSU5ShmIUB6brcwM_TRftC2TJp5OPOOwddPdx";
    script.async = true;
    script.defer = true;
    window.initMap = () => {
      const map = new window.Microsoft.Maps.Map(mapRef.current, {
        center: new window.Microsoft.Maps.Location(25.702, 85.2156),
        zoom:500,
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
              map.entities.push(pushpin);
              
              console.log(place);
              map.setView({ bounds: place.bestView });
            }
          );
        }
      );
    };

    document.head.appendChild(script);
  }, []);

  return (
    <>

      <div id="searchBoxContainer">
        <input type="text" id="searchBox" />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <div
          id="myMap"
          ref={mapRef}
          style={{ position: "relative", width: "400px", height: "400px" }}
        ></div>
      </div>
    </>
  );
};

export default BingMapComponent;
