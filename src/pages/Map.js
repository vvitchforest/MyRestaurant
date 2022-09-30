import React from "react";
//  import { Container } from '@mui/material'
import { GoogleMap } from "@react-google-maps/api";
import Drawer from "../components/Drawer";
import { useState } from "react";
import "../Drawer.css";
import logo from "./restaurant-image-placeholder.png";
import restaurantMenuLogo from "./restaurant-menu.png";
import restaurantDirectionsLogo from "./restaurant-directions.png";
import { CenterFocusStrong } from "@mui/icons-material";

const Map = () => {
  const [isOpen, setIsOpen] = useState(false);
  const mapStyles = {
    height: "95vh",
    width: "100%",
  };

  const defaultCenter = {
    lat: 60.2199174072532,
    lng: 24.757443753545,
  };

  return (
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
          mapContainerStyle={mapStyles}
          zoom={13}
          center={defaultCenter}
        />

        <Drawer
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          position="bottom"
        >
          <div className="demo-content">
            <button type="button" onClick={() => setIsOpen(false)}>
              Close
            </button>
            <div style={style}>
              <img
                src={logo}
                width={"30%"}
                height={"100%"}
                alt="Restaurant logo"
              />
              <div style={padding}>
                <p style={textStyle}>Open/closed</p>
                <p style={textStyle}>Restaurant name</p>
                <p style={textStyle}>Address</p>
              </div>
              <div style={iconStyle}>
                <img src={restaurantMenuLogo}
                alt="Restaurant menu logo"
                height={"30%"}
                width={"30%"}/>
                <img src={restaurantDirectionsLogo}
                alt="Restaurant menu logo"
                height={"30%"}
                width={"30%"}/>
              </div>
            </div>
          </div>
        </Drawer>
      </div>
    </div>
  );
};

const padding = {
  padding: "12px",
}

const style = {
  display: "flex",
  flexDirection: "row",
  justifyContent: 'space-between',
  backgroundColor: "#f1f1f1",
  padding: "12px",
};

const textStyle = {
  fontSize: '2vw',
}

const iconStyle = {
  display: "flex",
  alignItems: 'end',
  flexDirection: "column",
  justifyContent: 'space-around',
  padding: "12px",
};

export default Map;
