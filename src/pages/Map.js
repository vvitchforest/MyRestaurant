/**
 * @Author Teemu Tirkkonen
 * @Author Oskar Wiiala
 * Page for displaying restaurant card components
 */

import React, { useEffect, useState } from 'react'
import { Button, IconButton, Typography } from '@mui/material'
import { GoogleMap, Marker, InfoWindow, useJsApiLoader } from '@react-google-maps/api'
import RestaurantDrawer from '../components/RestaurantDrawer'
import DirectionsDrawer from '../components/DirectionsDrawer'
import DirectionsModal from '../components/DirectionsModal'
import MyLocationIcon from '@mui/icons-material/MyLocation'
import { useCookies } from 'react-cookie'
import getTranslation from '../utils/Translations'

const Map = () => {
  const [currentPos, setCurrentPos] = useState({})
  const [checkClick, setClick] = useState(false)
  const [checkCenter, setCenter] = useState(false)
  const [checkNextPage, setNextPage] = useState(false)
  const [libraries] = useState(['places', 'geometry'])
  const [cookies] = useCookies(['language'])
  const language = cookies.language ? cookies.language : 'en'
  const [openRestaurantDrawer, setOpenRestaurantDrawer] = useState(false)
  const [openDirectionsDrawer, setOpenDirectionsDrawer] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)

  // Toggle modal for DirectionsModal
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

  // Array of instructions for directions to a specific restaurant
  const [instructionsHeader1, setInstructionsHeader1] = useState([])
  const [instructions1, setInstructions1] = useState([])

  // data and opening/closing for directions instructions popup window
  const [infoPopupData, setInfoPopupData] = useState({})
  const [infoWindowOpen, setInfoWindowOpen] = useState(false)

  /**
   * Sets instructions for DirectionDrawer (function passed to DirectionDrawer component)
   * @param {array} instructionsHeader header information such as start and end address + distance and estimated time
   * @param {array} instructions array of object containing lat, lng and step
   */
  const setInstructions = (instructionsHeader, instructions) => {
    if (instructionsHeader && instructions) {
      setInstructionsHeader1(instructionsHeader)
      setInstructions1(instructions)
    }
  }

  // Sets data for directions instructions info popup window and opens it
  const setInfoPopup = (data) => {
    if (data) {
      setInfoPopupData(data)
      setInfoWindowOpen(true)
    }
  }

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
    setInterval(function () {
      navigator.geolocation.getCurrentPosition(getPos)
      setCenter(true)
    }, 500)
  }, [])
  // Sets the map to location and gets nearbyRestaurants
  const panToLocation = () => {
    setClick(true)
    console.log('Current', currentPos)
    if (currentPos !== {}) {
      map.setCenter(currentPos)
      const request = {
        location: currentPos,
        radius: '200',
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
  const handleRestaurantDrawerToggle = () => {
    setOpenRestaurantDrawer(!openRestaurantDrawer)
  }
  // Handles opening and closing of DirectionsDrawer
  const handleDirectionsDrawerToggle = () => {
    setOpenDirectionsDrawer(!openDirectionsDrawer)
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

  return isLoaded
    ? (
        <GoogleMap
          id='map'
          mapContainerStyle={mapStyles}
          zoom={13}
          center={checkCenter === false ? defaultCenter : console.log('Dont center!')}
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
                      handleRestaurantDrawerToggle()
                    }}
                  >
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
                      handleRestaurantDrawerToggle()
                    }}
                  >
                  </Marker>
              )
            })
            : console.log('nothing', 'nothing')}
             {<Marker
              icon={{ url: require('../bluecircle.png') }}
              position={currentPos}
              zIndex={1}
            />}
          <></>
          {instructions1.map((position) => (
            <Marker
              key={position.lat}
              clickable={true}
              icon={{
                url: require('../map-step-icon.png'),
                scaledSize: new window.google.maps.Size(20, 20)
              }}
              position={{
                lat: position.lat,
                lng: position.lng
              }}
              onClick={() => {
                console.log(`marker step: ${position.step}`)
                setInfoPopup(position)
              }}>

            </Marker>
          ))}
          {infoWindowOpen && (
            <InfoWindow
            onCloseClick={() => setInfoWindowOpen(false)}
            position={{ lat: infoPopupData.lat, lng: infoPopupData.lng }}
            options={{ maxWidth: 300 }}
          >
            <Typography color='black'>{infoPopupData.step}</Typography>
          </InfoWindow>
          )}
          <RestaurantDrawer
            open={openRestaurantDrawer}
            handleDrawerToggle={handleRestaurantDrawerToggle}
            openWebsite={openWebsite}
            toggleModal={toggleModal}
            language={language}
            restaurantBusinessStatus={restaurantBusinessStatus}
            restaurantIcon={restaurantIcon}
            restaurantName={restaurantName}
            restaurantAddress={restaurantAddress}
            restaurantRating={restaurantRating}
            distance={distance}
          />
          <Button
            sx={{ margin: '10px', backgroundColor: 'white', position: 'absolute', left: 0, bottom: 50 }}
            onClick={() => setOpenDirectionsDrawer(!openDirectionsDrawer)}>
            {getTranslation(language, 'showinstructions')}
          </Button>
          <DirectionsDrawer
            open={openDirectionsDrawer}
            handleDrawerToggle={handleDirectionsDrawerToggle}
            language={language}
            instructionsHeader={instructionsHeader1}
            instructions={instructions1}
          />
          <DirectionsModal
            open={modalOpen}
            handleClose={() => setModalOpen(false)}
            setOpenRestaurantDrawer={setOpenRestaurantDrawer}
            setOpenDirectionsDrawer={setOpenDirectionsDrawer}
            currentPos={currentPos}
            restaurantLat={restaurantLat}
            restaurantLng={restaurantLng}
            mapRef={mapRef}
            setInstructions={setInstructions}
          />
        </GoogleMap>
      )
    : (
    <></>
      )
}

export default Map
