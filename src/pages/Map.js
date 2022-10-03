import React, { useEffect, useState } from "react";
import { Box } from '@mui/material'
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import Drawer from "../components/Drawer";
import "../Drawer.css";
import logo from "./restaurant-image-placeholder.png";
import restaurantMenuLogo from "./restaurant-menu.png";
import restaurantDirectionsLogo from "./restaurant-directions.png";
import { CenterFocusStrong } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
// import RestaurantIcon from '@mui/icons-material/Restaurant'
import MyLocationIcon from '@mui/icons-material/MyLocation'

const Map = () => {
  const [currentPos, setCurrentPos] = useState({});
  const [checkClick, setClick] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [checkNextPage, setNextPage] = useState(false)
  const [libraries] = useState(['places', 'geometry'])
  const placesList = []
  // let getNextPage
  const [placesFinal, setPlacesFinal] = useState([])
  const mapStyles = {
    height: "95vh",
    width: "100%",
  };
  const defaultCenter = {
    lat: 60.21978930158246,
    lng: 24.757250617314764
  }
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
            visibility: 'off'
          }
        ]
      }
    ]
  }
  /* const icon = {
    url: require('../restaurant icon.png'),
    scaledSize: new window.google.maps.Size(90, 42)
  } */
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries
  })
  const [map, setMap] = React.useState(null)
  const mapRef = React.useRef()
  /* const request = {
    location: currentPos,
    radius: '2000',
    type: ['restaurant']
  } */

  const onLoad = React.useCallback(function callback (map) {
    /* const bounds = new window.google.maps.LatLngBounds(defaultCenter)
    map.fitBounds(bounds) */
    setMap(map)
    mapRef.current = map
  }, [])

  const onUnmount = React.useCallback(function callback (map) {
    setMap(null)
  }, [])
  /* const nearbySearch = React.useCallback(function callback (results, status) {
    if (status === window.google.maps.places.PlacesServiceStatus.OK) {
      for (let i = 0; i < results.length; i++) {
        createMarker(results[i])
      }
    }
  }, [])
  const createMarker = (place) => {
    console.log('Place', place)
  } */
  useEffect(() => {
    const getPos = (position) => {
      if (navigator.geolocation) {
        const currentPosition = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        }
        setCurrentPos(currentPosition)
      }
    }
    navigator.geolocation.getCurrentPosition(getPos)
  }, [])
  const panToLocation = () => {
    setClick(true)
    console.log('Current', currentPos)
    if (currentPos !== {}) {
      const request = {
        location: currentPos,
        radius: '2000',
        type: ['restaurant']
      }

      const service = new window.google.maps.places.PlacesService(mapRef.current)
      service.nearbySearch(request, callback)

      function callback (results, status, pagination) {
        if (status === window.google.maps.places.PlacesServiceStatus.OK) {
          for (let i = 0; i < results.length; i++) {
            createMarker(results[i])
          }
          if (pagination && pagination.hasNextPage) {
            pagination.nextPage()
            setTimeout(function () {
              setNextPage(true)
            }, 3000)
          }
        }
      }
    }
  }
  const createMarker = (place) => {
    console.log('Place', place)
    placesList.push(place)
    setPlacesFinal(placesList)
  }

  const isRestaurantOpenBool = true;
  let isRestaurantOpen = "Open";
  let restaurantName = "Dreams Cafe";
  let restaurantAddress = "Karaportti 4, 02610 Espoo";
  
  return isLoaded
    ? (
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
                    fontSize: "4vw",
                    width: '50%',
                    padding: '5px',
                    borderRadius: 12,
                  }}
                >
                  {isRestaurantOpen}
                </p>
                <p style={textStyle}>{restaurantName}</p>
                <p style={textStyle}>{restaurantAddress}</p>
              </div>
              <div style={iconContainerStyle}>
                <Box sx={iconBoxStyle}>
                <img
                  src={restaurantMenuLogo}
                  alt="Restaurant menu logo"
                  style={{height: '100%', width: '100%'}}
                  
                />
                </Box>
                <Box sx={iconBoxStyle}>
                <img
                  src={restaurantDirectionsLogo}
                  alt="Restaurant menu logo"
                  style={{height: '100%', width: '100%'}}
                />
                </Box>
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
  padding: '5px',
};

const iconContainerStyle = {
  display: "flex",
  alignItems: "end",
  flex: 1,
  flexDirection: "column",
  justifyContent: "space-around",
  padding: "12px",
};

const iconBoxStyle = {
  boxShadow: 3,
  width: "40%",
  height: "40%",
  border: "solid #000",
  borderWidth: "1px",
  borderColor: "#0250a3",
};

export default Map;
