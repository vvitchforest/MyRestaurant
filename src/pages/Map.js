import React, { useEffect, useState } from 'react'
//  import { Container } from '@mui/material'
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api'
import { IconButton } from '@mui/material'
// import RestaurantIcon from '@mui/icons-material/Restaurant'
import MyLocationIcon from '@mui/icons-material/MyLocation'

const Map = () => {
  const [currentPos, setCurrentPos] = useState({})
  const [checkClick, setClick] = useState(false)
  const [checkNextPage, setNextPage] = useState(false)
  const [libraries] = useState(['places', 'geometry'])
  const placesList = []
  // let getNextPage
  const [placesFinal, setPlacesFinal] = useState([])
  const mapStyles = {
    height: '95vh',
    width: '100%'
  }
  const defaultCenter = {
    lat: 60.21978930158246,
    lng: 24.757250617314764
  }
  const styles = {
    hide: [
      {
        featureType: 'administrative',
        elementType: 'geometry',
        stylers: [
          {
            visibility: 'off'
          }
        ]
      },
      {
        featureType: 'poi',
        stylers: [
          {
            visibility: 'off'
          }
        ]
      },
      {
        featureType: 'road',
        elementType: 'labels.icon',
        stylers: [
          {
            visibility: 'off'
          }
        ]
      },
      {
        featureType: 'transit',
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
  return isLoaded
    ? (
        <GoogleMap
          id='map'
          mapContainerStyle={mapStyles}
          zoom={13}
          center={checkClick
            ? currentPos
            : defaultCenter}
            options={{ streetViewControl: false, clickableIcons: false, styles: styles.hide }}
            onLoad={onLoad}
            onUnmount={onUnmount}>
            <IconButton onClick={() => panToLocation()} style={{ marginLeft: 250 }} color={'primary'}><MyLocationIcon /></IconButton>
            { console.log(map) }
            {<Marker
                icon={'https://www.robotwoods.com/dev/misc/bluecircle.png'}
                position={currentPos}/>}
                {checkClick
                  ? placesFinal.map(function (results) {
                    return (
                    <Marker clickable={true} icon={{ url: require('../restaurant icon.png'), scaledSize: new window.google.maps.Size(50, 42) }} key={results.place_id} position={{ lat: results.geometry.location.lat(), lng: results.geometry.location.lng() }}>
                      { /* <InfoWindow
                      position={{ lat: results.geometry.location.lat(), lng: results.geometry.location.lng() }}
                      options={{ maxWidth: 300 }}>
                      <span>{results.name}</span>
                    </InfoWindow> */ }
                      </Marker>
                    )
                  })
                  : console.log('nothing', 'nothing')
                }
                {checkNextPage
                  ? placesFinal.map(function (results) {
                    return (
                  <Marker clickable={true} icon={{ url: require('../restaurant icon.png'), scaledSize: new window.google.maps.Size(50, 42) }} key={results.place_id} position={{ lat: results.geometry.location.lat(), lng: results.geometry.location.lng() }}>
                    { /* <InfoWindow
                    position={{ lat: results.geometry.location.lat(), lng: results.geometry.location.lng() }}
                    options={{ maxWidth: 300 }}>
                    <span>{results.name}</span>
                  </InfoWindow> */ }
                    </Marker>
                    )
                  })
                  : console.log('nothing', 'nothing')}
           <></>
          </GoogleMap>
      )
    : <></>
}
export default Map
