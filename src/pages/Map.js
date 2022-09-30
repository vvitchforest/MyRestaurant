import React, { useState } from "react";
//  import { Container } from '@mui/material'
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import Drawer from "../components/Drawer";
import "../Drawer.css";
import logo from "./restaurant-image-placeholder.png";
import restaurantMenuLogo from "./restaurant-menu.png";
import restaurantDirectionsLogo from "./restaurant-directions.png";
import { CenterFocusStrong } from "@mui/icons-material";
import { Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const Map = () => {
  const [currentPos, setCurrentPos] = useState({});
  const [checkClick, setClick] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const mapStyles = {
    height: "95vh",
    width: "100%",
  };
  const defaultCenter = {
    lat: 60.21978930158246,
    lng: 24.757250617314764,
  };
  const styles = {
    hide: [
      {
        featureType: "administrative",
        elementType: "geometry",
        stylers: [
          {
            visibility: "off",
          },
        ],
      },
      {
        featureType: "poi",
        stylers: [
          {
            visibility: "off",
          },
        ],
      },
      {
        featureType: "road",
        elementType: "labels.icon",
        stylers: [
          {
            visibility: "off",
          },
        ],
      },
      {
        featureType: "transit",
        stylers: [
          {
            visibility: "off",
          },
        ],
      },
    ],
  };
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  });
  const [map, setMap] = React.useState(null);

  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds(defaultCenter);
    map.fitBounds(bounds);
    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);
  const getPos = (position) => {
    if (navigator.geolocation) {
      const currentPosition = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };
      setCurrentPos(currentPosition);
    }
  };
  const panToLocation = () => {
    setClick(true);
    navigator.geolocation.getCurrentPosition(getPos);
  };

  const isRestaurantOpenBool = true;
  let isRestaurantOpen = "Open";
  let restaurantName = "Dreams Cafe";
  let restaurantAddress = "Karaportti 4, 02610 Espoo";

  return isLoaded ? (
    <div className="app">
      <div className="container">
        <button
          type="button"
          onClick={() => {
            setIsOpen(!isOpen);
            console.log("wtf");
          }}
        >
          Trigger Drawer
        </button>

        <GoogleMap
          id="map"
          mapContainerStyle={mapStyles}
          zoom={13}
          center={checkClick ? currentPos : defaultCenter}
          options={{
            streetViewControl: false,
            clickableIcons: false,
            styles: styles.hide,
          }}
          onLoad={onLoad}
          onUnmount={onUnmount}
        >
          <Button onClick={panToLocation} style={{ paddingLeft: 250 }}>
            Current Location
          </Button>
          {console.log(map)}
          <></>
        </GoogleMap>

        <Drawer
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          position="bottom"
        >
          <div className="demo-content">
            <div style={exitStyle}>
              <Button type="button" onClick={() => setIsOpen(false)}>
                <CloseIcon />
              </Button>
            </div>
            <div style={style}>
              <div style={{ padding: "12px", flex: 1 }}>
                <img
                  src={logo}
                  width={"100%"}
                  height={"100%"}
                  alt="Restaurant logo"
                />
              </div>
              <div style={{ padding: "12px", flex: 2 }}>
                <p
                  style={{
                    backgroundColor: isRestaurantOpenBool
                      ? "#DAF7A6"
                      : "#FF8266",
                    fontSize: "3vw",
                  }}
                >
                  {isRestaurantOpen}
                </p>
                <p style={textStyle}>{restaurantName}</p>
                <p style={textStyle}>{restaurantAddress}</p>
              </div>
              <div style={iconContainerStyle}>
                <img
                  src={restaurantMenuLogo}
                  alt="Restaurant menu logo"
                  style={iconStyle}
                />
                <img
                  src={restaurantDirectionsLogo}
                  alt="Restaurant menu logo"
                  style={iconStyle}
                />
              </div>
            </div>
          </div>
        </Drawer>
      </div>
    </div>
  ) : (
    <></>
  );
};

const exitStyle = {
  display: "flex",
  justifyContent: "flex-end",
};

const style = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  // backgroundColor: "#f1f1f1",
};

const textStyle = {
  fontSize: "3vw",
};

const iconContainerStyle = {
  display: "flex",
  alignItems: "end",
  flex: 1,
  flexDirection: "column",
  justifyContent: "space-around",
  padding: "12px",
};

const iconStyle = {
  minWidth: "20%",
  maxWidth: "50%",
  minHeight: "20%",
  maxHeight: "50%",
  width: "30%",
  height: "30%",
  border: "solid #000",
  borderWidth: "2px",
  borderColor: "#0250a3",
};

export default Map;
