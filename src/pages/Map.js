import React, { useState } from 'react'
//  import { Container } from '@mui/material'
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api'
import { Button } from '@mui/material'

const Map = () => {
  const [currentPos, setCurrentPos] = useState({})
  const [checkClick, setClick] = useState(false)
  const mapStyles = {
    height: '95vh',
    width: '100%'
  }
  const defaultCenter = {
    lat: 60.21978930158246, lng: 24.757250617314764
  }
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY
  })
  const [map, setMap] = React.useState(null)

  const onLoad = React.useCallback(function callback (map) {
    const bounds = new window.google.maps.LatLngBounds(defaultCenter)
    map.fitBounds(bounds)
    setMap(map)
  }, [])

  const onUnmount = React.useCallback(function callback (map) {
    setMap(null)
  }, [])
  const getPos = position => {
    if (navigator.geolocation) {
      const currentPosition = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      }
      setCurrentPos(currentPosition)
    }
  }
  const panToLocation = () => {
    setClick(true)
    navigator.geolocation.getCurrentPosition(getPos)
  }
  return isLoaded
    ? (
        <GoogleMap
          id='map'
          mapContainerStyle={mapStyles}
          zoom={13}
          center={checkClick
            ? currentPos
            : defaultCenter}
            onLoad={onLoad}
            onUnmount={onUnmount}>
            <Button onClick={panToLocation} style={{ paddingLeft: 250 }}>Current Location</Button>
            { console.log(map) }
           <></>
          </GoogleMap>
      )
    : <></>
}
export default Map
