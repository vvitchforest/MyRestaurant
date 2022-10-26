import React, { useEffect, useState } from 'react'
import { Box, IconButton, Button, Drawer, Rating, Typography, CardMedia } from '@mui/material'
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api'
import DirectionsIcon from '@mui/icons-material/Directions'
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu'
import DirectionsModal from '../components/DirectionsModal'
// import { CenterFocusStrong } from '@mui/icons-material'
import CloseIcon from '@mui/icons-material/Close'
import MyLocationIcon from '@mui/icons-material/MyLocation'
import { useCookies } from 'react-cookie'
import getTranslation from '../utils/Translations'

const Map = () => {
  const [currentPos, setCurrentPos] = useState({})
  const [checkClick, setClick] = useState(false)
  const [checkNextPage, setNextPage] = useState(false)
  const [libraries] = useState(['places', 'geometry'])
  const [cookies] = useCookies(['language'])
  const [openDrawer, setOpenDrawer] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const toggleModal = () => setModalOpen(!modalOpen)

  const [restaurantRating, setRestaurantRating] = useState(0)
  const [restaurantBusinessStatus, setRestaurantBusinessStatus] =
     useState('unknown')
  const [restaurantIcon, setRestaurantIcon] = useState()
  const [restaurantName, setRestaurantName] = useState('unknown')
  const [restaurantAddress, setRestaurantAddress] = useState('unknown')
  const [restaurantLat, setRestaurantLat] = useState()
  const [restaurantLng, setRestaurantLng] = useState()
  const [distance, setDistance] = useState()

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

      const service = new window.google.maps.places.PlacesService(
        mapRef.current
      )
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

  const setRestaurantInfo = (
    placeId
  ) => {
    console.log('PlaceId', placeId)
    const request = {
      placeId,
      fields: ['name', 'rating', 'formatted_phone_number', 'formatted_address', 'opening_hours', 'utc_offset_minutes', 'geometry']
    }

    const service = new window.google.maps.places.PlacesService(
      mapRef.current
    )
    const directionService = new window.google.maps.DirectionsService()
    service.getDetails(request, callback)

    function callback (results, status) {
      if (status === window.google.maps.places.PlacesServiceStatus.OK) {
        console.log('Res', results)
        setRestaurantName(results.name)
        setRestaurantAddress(results.formatted_address)
        setRestaurantRating(results.rating)
        setRestaurantLat(results.geometry.location.lat())
        setRestaurantLng(results.geometry.location.lng())
        if (results.opening_hours.isOpen() === true) {
          setRestaurantBusinessStatus('open')
        } else {
          setRestaurantBusinessStatus('closed')
        }
      }
    }
    const directionRequest = {
      origin: currentPos,
      destination: { lat: restaurantLat, lng: restaurantLng },
      travelMode: 'WALKING'
    }

    directionService.route(directionRequest, function (result, status) {
      if (status === 'OK') {
        setDistance(result.routes[0].legs[0].distance.text)
      }
    })
  }

  const handleDrawerToggle = () => {
    setOpenDrawer(!openDrawer)
  }

  return isLoaded
    ? (
        <GoogleMap
          id='map'
          mapContainerStyle={mapStyles}
          zoom={13}
          center={checkClick ? currentPos : defaultCenter}
          options={{
            streetViewControl: false,
            clickableIcons: false,
            styles: styles.hide,
            fullscreenControl: false
          }}
          onLoad={onLoad}
          onUnmount={onUnmount}
        >
          <IconButton
            onClick={() => panToLocation()}
            style={{ marginLeft: 210 }}
            color={'primary'}
            sx={{ margin: '10px', backgroundColor: 'white' }}
          >
            <MyLocationIcon />
          </IconButton>
          {console.log(map)}
          {checkClick
            ? placesFinal.map(function (results) {
              return (
                  <Marker
                    clickable={true}
                    icon={{
                      url: require('../restaurant icon.png'),
                      scaledSize: new window.google.maps.Size(50, 42)
                    }}
                    key={results.place_id}
                    position={{
                      lat: results.geometry.location.lat(),
                      lng: results.geometry.location.lng()
                    }}
                    onClick={() => {
                      setRestaurantIcon(results.photos !== undefined ? results.photos[0].getUrl() : 'https://i.ibb.co/M2NLtMx/image-not-available-wide3.png')
                      setRestaurantInfo(
                        results.place_id
                      )
                      handleDrawerToggle()
                    }}
                  >
                    {/* <InfoWindow
                      position={{ lat: results.geometry.location.lat(), lng: results.geometry.location.lng() }}
                      options={{ maxWidth: 300 }}>
                      <span>{results.name}</span>
                    </InfoWindow> */}
                  </Marker>
              )
            })
            : console.log('nothing', 'nothing')}
          {checkNextPage
            ? placesFinal.map(function (results) {
              return (
                  <Marker
                    clickable={true}
                    icon={{
                      url: require('../restaurant icon.png'),
                      scaledSize: new window.google.maps.Size(50, 42)
                    }}
                    key={results.place_id}
                    position={{
                      lat: results.geometry.location.lat(),
                      lng: results.geometry.location.lng()
                    }}
                    onClick={() => {
                      setRestaurantIcon(results.photos !== undefined ? results.photos[0].getUrl() : 'https://i.ibb.co/M2NLtMx/image-not-available-wide3.png')
                      setRestaurantInfo(
                        results.place_id
                      )
                      handleDrawerToggle()
                    }}
                  >
                    {/* <InfoWindow
                    position={{ lat: results.geometry.location.lat(), lng: results.geometry.location.lng() }}
                    options={{ maxWidth: 300 }}>
                    <span>{results.name}</span>
                  </InfoWindow> */}
                  </Marker>
              )
            })
            : console.log('nothing', 'nothing')}
             {<Marker
              icon={{ url: require('../bluecircle.png') }}
              position={currentPos}
            />}
          <></>
          <Drawer
            anchor='bottom'
            open={openDrawer}
            onClose={() => setOpenDrawer(false)}
            variant='temporary'
          >
            <Box>
              <Box sx={exitStyle}>
                <Button type='button' onClick={handleDrawerToggle}>
                  <CloseIcon sx={closeIconStyle} />
                </Button>
              </Box>
              <Box sx={style}>
                <Box
                  sx={{
                    pl: '12px',
                    pb: '12px',
                    flex: 1
                  }}
                >
                  <CardMedia
                    sx={{ pt: '12px', height: { xs: '95%' } }}
                    component='img'
                    height='225'
                    image={restaurantIcon}
                    alt={getTranslation(
                      cookies.language ? cookies.language : 'en',
                      'ariapicturerestaurant'
                    )}
                  />
                </Box>
                <Box sx={{ padding: '12px', flex: 2 }}>
                  <Typography
                    variant='body1' sx={restaurantNameStyle}
                    style={{
                      backgroundColor: restaurantBusinessStatus === 'open'
                        ? '#DAF7A6'
                        : '#FF8266',
                      width: '100%',
                      borderRadius: 12
                    }}
                  >
                  {getTranslation(
                    cookies.language ? cookies.language : 'en',
                    restaurantBusinessStatus
                  )}
                  </Typography>
                  <Typography variant='body1' sx={restaurantNameStyle}>{restaurantName}</Typography>
                  <Typography variant='body2' color='text.secondary' sx={restaurantAddressStyle}>{restaurantAddress}</Typography>
                  <Typography variant='body2' color='text.secondary' sx={restaurantAddressStyle}>{distance}</Typography>
                  <Rating name='half-rating-read' value={restaurantRating === undefined ? 0 : restaurantRating} defaultValue={0} precision={0.5} readOnly />
                </Box>
                <Box sx={iconContainerStyle}>
                  <IconButton sx={iconButtonStyle} >
                    <RestaurantMenuIcon sx={iconStyle} />
                  </IconButton>
                  <IconButton sx={iconButtonStyle} onClick={toggleModal}>
                    <DirectionsIcon sx={iconStyle} />
                  </IconButton>
                </Box>
              </Box>
            </Box>
          </Drawer>
          <DirectionsModal
            open={modalOpen}
            handleClose={() => setModalOpen(false)}
            setOpenDrawer={setOpenDrawer}
            currentPos={currentPos}
            restaurantLat={restaurantLat}
            restaurantLng={restaurantLng}
            mapRef={mapRef} />
        </GoogleMap>
      )
    : (
    <></>
      )
}
// onClick={() => getDirections(restaurantLat, restaurantLng)}

const exitStyle = {
  display: 'flex',
  justifyContent: 'flex-end'
}

const style = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between'
}

const restaurantNameStyle = {
  fontSize: { xs: '5vw', sm: '3vw', md: '2.5vw', lg: '2.5vw' },
  padding: '5px'
}

const restaurantAddressStyle = {
  fontSize: { xs: '4vw', sm: '2vw', md: '1.8vw', lg: '1.8vw' },
  padding: '5px'
}

const iconContainerStyle = {
  display: 'flex',
  alignItems: 'end',
  flex: 1,
  flexDirection: 'column',
  justifyContent: 'space-around',
  pl: '12px',
  pr: '12px'
}

const closeIconStyle = {
  width: { xs: '25px', sm: '40px', md: '58px', lg: '65px' },
  height: { xs: '25px', sm: '40px', md: '58px', lg: '65px' }
}

const iconStyle = {
  width: { xs: '80%', sm: '50px', md: '75px', lg: '100px' },
  height: { xs: '80%', sm: '50px', md: '75px', lg: '100px' }
}

const iconButtonStyle = {
  display: 'flex',
  justifyContent: 'space-around',
  flexDirection: 'column',
  boxShadow: 3,
  width: { xs: '80%', sm: '75px', md: '100px', lg: '40%' },
  height: { xs: '40%', sm: '75px', md: '100px', lg: '40%' },
  border: 'solid #000',
  borderWidth: '1px',
  borderRadius: '6px',
  borderColor: '#0250a3'
}

export default Map
