/**
 * @Author Teemu Tirkkonen
 * Page for displaying restaurant card components
 */

import React, { useEffect, useState } from 'react'
import { Box, IconButton, Drawer, Rating, Typography, CardMedia } from '@mui/material'
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
  const language = cookies.language ? cookies.language : 'en'
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
  const [restaurantWebsite, setRestaurantWebsite] = useState()

  const placesList = []
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

  /**
   * Loads the API with API key and libraries we want to use
   * @param {*} isLoaded checks that the API works
   */
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries
  })
  const [map, setMap] = React.useState(null)
  const mapRef = React.useRef()
  // When page is loaded map loads
  const onLoad = React.useCallback(function callback (map) {
    setMap(map)
    mapRef.current = map
  }, [])
  // When page is refreshed unmounts map
  const onUnmount = React.useCallback(function callback (map) {
    setMap(null)
  }, [])

  // Gets the users currentlocation and sets it to a variable
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
  // Sets the map to location and gets nearbyRestaurants
  const panToLocation = () => {
    setClick(true)
    console.log('Current', currentPos)
    if (currentPos !== {}) {
      const request = {
        location: currentPos,
        radius: '0',
        type: ['restaurant']
      }
      // Gets the Google PlacesService and sets it to map
      const service = new window.google.maps.places.PlacesService(
        mapRef.current
      )
      // Calls nearbySearch which is used when you want to get places near you
      service.nearbySearch(request, callback)
      /**
     * Makes the call to the service and goes through all of the results and calls createMarker function
     * There can be multiple pages. If there is waits until all results are gotten before rendering
     * @param {*} results data of restaurant, such as name, address, rating etc.
     * @param {*} status whether or not everything was successful
     * @param {*} pagination gives next page if there is one
     */
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

  /**
   * Creates an array of restaurants. Array is used to create markers
   * @param {*} place an individual restaurant with all available data
   */
  const createMarker = (place) => {
    console.log('Place', place)
    placesList.push(place)
    setPlacesFinal(placesList)
  }

  /**
   * Gets the restaurant information based on place id and specific fields
   * @param {*} placeId Id of restaurant
   */
  const setRestaurantInfo = (
    placeId
  ) => {
    console.log('PlaceId', placeId)
    const request = {
      placeId,
      fields: ['name', 'rating', 'formatted_phone_number', 'formatted_address', 'opening_hours', 'utc_offset_minutes', 'geometry', 'website']
    }

    // Gets the Google PlacesService and sets it to map
    const service = new window.google.maps.places.PlacesService(
      mapRef.current
    )
    // Gets the directionService so we can get the distance to selected restaurant
    const directionService = new window.google.maps.DirectionsService()
    service.getDetails(request, callback)

    /**
     * Makes the call to the service and gets details of the restaurant
     * sets everything e.g. name, address and rating
     * checks whether opening hours exist or not
     * on top of those gets the distance to the restaurant from users location
     * @param {*} results data of restaurant, such as name, address, rating etc.
     * @param {*} status whether or not everything was successful
     */
    function callback (results, status) {
      if (status === window.google.maps.places.PlacesServiceStatus.OK) {
        console.log('Res', results)
        setRestaurantName(results.name)
        setRestaurantAddress(results.formatted_address)
        setRestaurantRating(results.rating)
        setRestaurantLat(results.geometry.location.lat())
        setRestaurantLng(results.geometry.location.lng())
        setRestaurantWebsite(results.website)
        if (results.opening_hours?.isOpen() === true) {
          setRestaurantBusinessStatus('open')
        } else {
          setRestaurantBusinessStatus('closed')
        }
        const directionRequest = {
          origin: currentPos,
          destination: { lat: results.geometry.location.lat(), lng: results.geometry.location.lng() },
          travelMode: 'WALKING'
        }
        directionService.route(directionRequest, function (result, status) {
          if (status === 'OK') {
            setDistance(result.routes[0].legs[0].distance.text)
          }
        })
      }
    }
  }

  // Handles opening and closing of restaurant
  const handleDrawerToggle = () => {
    setOpenDrawer(!openDrawer)
  }
  // Opens a new tab if restaurant website exist and if not alerts the user
  const openWebsite = () => {
    if (restaurantWebsite !== undefined) {
      return (
        window.open(restaurantWebsite)
      )
    } else {
      window.alert('Not available')
    }
  }

  const restaurantOpenStyle = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    ml: '12px',
    mr: '12px',
    backgroundColor: restaurantBusinessStatus === 'open'
      ? '#DAF7A6'
      : '#FF8266'
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
            color={'primary'}
            sx={{ margin: '10px', backgroundColor: 'white', position: 'absolute', bottom: 105, right: 0 }}
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
            <Box sx={restaurantOpenStyle}>
              <Typography variant='body1' sx={{ fontSize: { xs: '5vw', sm: '3vw', md: '2.5vw', lg: '2.5vw' }, pl: '6px', alignSelf: 'center' }}>
                {getTranslation(
                  language,
                  restaurantBusinessStatus
                )}
              </Typography>
              <IconButton type='button' onClick={handleDrawerToggle}>
                <CloseIcon sx={closeIconStyle} />
              </IconButton>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row', md: 'row', lg: 'row' } }}>
              <Box
                sx={{
                  flex: 1,
                  pl: '12px',
                  pr: '12px'
                }}
              >
                <CardMedia
                  sx={{
                    height: { xs: '20%', sm: '95%', md: '95%', lg: '95%' },
                    maxHeight: { xs: '100px', sm: '250px', md: '250px', lg: '250px' }
                  }}
                  component='img'
                  height='225'
                  image={restaurantIcon}
                  alt={getTranslation(language, 'ariapicturerestaurant')}
                  />
              </Box>
              <Box sx={{ display: 'flex', flex: 2, flexDirection: 'row' }}>
                <Box sx={{ padding: '12px', flex: 3 }}>
                  <Typography variant='body1' sx={restaurantNameStyle}>{restaurantName}</Typography>
                  <Typography variant='body2' color='text.secondary' sx={restaurantAddressStyle}>{restaurantAddress}</Typography>
                  <Box sx={{ display: 'flex', justifyContent: { sm: 'space-between', md: 'space-between', lg: 'space-between' }, flexDirection: { xs: 'column', sm: 'row', md: 'row', lg: 'row' } }}>
                    <Rating name='half-rating-read' value={restaurantRating === undefined ? 0 : restaurantRating} defaultValue={0} precision={0.5} readOnly sx={{ alignSelf: { sm: 'center', md: 'center', lg: 'center' } }} />
                    <Typography variant='body2' color='text.secondary' sx={restaurantAddressStyle}>{getTranslation(language, 'distance')} {distance === undefined ? 0 : distance}</Typography>
                  </Box>
                </Box>
                <Box sx={iconContainerStyle}>
                  <IconButton sx={iconButtonStyle} onClick={openWebsite}>
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
  width: '25px',
  height: '25px'
}

const iconStyle = {
  width: { xs: '80%', sm: '80%', md: '80%', lg: '80%' },
  height: { xs: '80%', sm: '80%', md: '80%', lg: '80%' }
}

const iconButtonStyle = {
  display: 'flex',
  justifyContent: 'space-around',
  flexDirection: 'column',
  boxShadow: 3,
  width: { xs: '80%', sm: '65%', md: '58%', lg: '45%' },
  height: { xs: '45%', sm: '45%', md: '45%', lg: '45%' },
  border: 'solid #000',
  borderWidth: '1px',
  borderRadius: '6px',
  borderColor: '#0250a3'
}

export default Map
