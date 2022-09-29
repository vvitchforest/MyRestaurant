import React from "react";
//  import { Container } from '@mui/material'
import { GoogleMap } from "@react-google-maps/api";
import Drawer from "../components/Drawer";
import { useState } from "react";
import "../Drawer.css";

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
            <p>The drawer content!</p>
            <input type="text" />
          </div>
        </Drawer>
      </div>
    </div>
  );
};
export default Map;
