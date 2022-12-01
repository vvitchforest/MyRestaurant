/**
 * @Author Teemu Tirkkonen
 * @Author Oskar Wiiala
 * Page for displaying restaurant card components
 */

import { useJsApiLoader } from '@react-google-maps/api'
import React, { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import RestaurantCard from '../components/RestaurantCard'
import getTranslation from '../utils/Translations'
import { CircularProgress, Box, FormControl, InputLabel, Select, OutlinedInput, MenuItem, useTheme, Chip, Container } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import * as actions from '../store/actions/index'

const RestaurantsList = () => {
  const ITEM_HEIGHT = 48
  const ITEM_PADDING_TOP = 8
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250
      }
    }
  }
  // Types for filter
  const types = [
    'All',
    'Bar',
    'Bakery',
    'Restaurant',
    'Meal_delivery',
    'Meal_takeaway',
    'Cafe'
  ]
  const [cookies] = useCookies(['language'])
  const language = cookies.language ? cookies.language : 'en'
  const [currentPos, setCurrentPos] = useState({})
  const placesList = []
  const [checkIfPos, setCheckIfPos] = useState(false)
  const [checkPagination, setCheckPagination] = useState(false)
  const [placesFinal, setPlacesFinal] = useState([])
  const [libraries] = useState(['places', 'geometry'])
  const theme = useTheme()
  const [restaurantTypes, setRestaurantTypes] = useState([])
  const [placesFiltered, setPlacesFiltered] = useState([])
  const [dispatched, isDispatched] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const dispatch = useDispatch()
  const restaurants = useSelector(state => state.userinterface.restaurants)
  let i = 0

  /**
   * Loads the API with API key and libraries we want to use
   * @param {*} isLoaded checks that the API works
   */
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries
  })

  // Gets the users currentlocation and sets it to a variable
  useEffect(() => {
    const getPos = (position) => {
      if (navigator.geolocation) {
        const currentPosition = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        }
        setCurrentPos(currentPosition)
        setCheckIfPos(true)
      }
    }
    navigator.geolocation.getCurrentPosition(getPos)
  }, [])
  // Gets retaurants near you based on current location and radius
  const getPlacesData = () => {
    if (currentPos !== {}) {
      const request = {
        location: currentPos,
        radius: '500',
        type: ['restaurant']
      }
      // Gets the Google PlacesService and sets it to invisible div element
      const service = new window.google.maps.places.PlacesService(document.createElement('div'))
      // Calls nearbySearch which is used when you want to get places near you
      service.nearbySearch(request, callback)
      // Makes the call to the service and goes through all of the results and calls createRestaurantList function
      // There can be multiple pages. If there is waits until all results are gotten before rendering
      function callback (results, status, pagination) {
        if (status === window.google.maps.places.PlacesServiceStatus.OK) {
          for (let i = 0; i < results.length; i++) {
            setTimeout(function () {
              createRestaurantList(results[i])
            }, 500 * i)
          }
          if (pagination && pagination.hasNextPage) {
            setTimeout(function () {
              pagination.nextPage()
              setCheckPagination(true)
            }, 15000)
            setCheckPagination(true)
          }
        }
      }
    }
  }
  // Waits for location and then gets the nearby restaurants
  setTimeout(function () {
    if (checkIfPos === true && restaurants.length === 0) {
      getPlacesData()
      setCheckIfPos(false)
    }
  }, 2000)
  // Adds the restaurants to array
  // Deletes unused information
  const createRestaurantList = (place) => {
    placesList.push(place)
    getIsOpen(place.place_id)
    delete place.opening_hours
    delete place.geometry
    delete place.permanently_closed
  }
  const getIsOpen = (placeId) => {
    const request = {
      placeId,
      fields: ['opening_hours', 'utc_offset_minutes']
    }
    // Gets the Google PlacesService and sets it to invisible div element
    const service = new window.google.maps.places.PlacesService(document.createElement('div'))
    // Calls getDetails which is used when you want extra information from specific place
    service.getDetails(request, callback)
    // Makes the call to the service and if opening hours isOpen equals true,
    // injects open value to restaurant object and sets it to open
    // if false or doesn't exist sets closed
    function callback (results, status) {
      if (status === window.google.maps.places.PlacesServiceStatus.OK) {
        placesList[i].open = results.opening_hours?.isOpen() ? 'open' : 'closed'
        setPlacesFinal(placesList)
        console.log('i', i)
        i++
      } else {
        console.log('Not ok', 'Not ok')
      }
      setIsOpen(true)
    }
  }
  // Dispatches restaurant data to redux when data is fetched
  useEffect(() => {
    if (isLoaded && placesFinal.length > 0 && (checkPagination === true || checkPagination === false) && isOpen) {
      setTimeout(function () {
        console.log('am i here')
        dispatch(actions.setRestaurants(placesFinal))
        isDispatched(true)
      }, 10000)
    } else if (isLoaded && placesFinal.length > 0 && checkPagination === true && isOpen) {
      setTimeout(function () {
        dispatch(actions.setRestaurants(placesFinal))
        isDispatched(true)
      }, 45000)
    }
  }, [placesFinal])
  // Styling for the filter element
  const getStyles = (type, restaurantTypes, theme) => {
    return {
      fontWeight:
      restaurantTypes.indexOf(type) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium
    }
  }
  // Handles the changing of restaurant types.
  const handleChange = (event) => {
    const {
      target: { value }
    } = event
    setRestaurantTypes(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value
    )
  }
  /**
   * Filters restaurants based on type e.g. bar or bakery
   * @param {*} arr array of restaurants near the user
   * @param {*} type selected restaurant types from filter
   */
  const filterRestaurants = (arr, type) => {
    console.log('restaurants', arr.filter((el) => el.types.includes(type.toLowerCase())))
    return setPlacesFiltered(arr.filter((el) => el.types.includes(type.toLowerCase())))
  }
  // Calls filterRestaurants if restaurantTypes changes
  // so if user adds a new filter
  useEffect(() => {
    if (restaurantTypes.length > 0) {
      for (let i = 0; i < restaurantTypes.length; i++) {
        filterRestaurants(restaurants, restaurantTypes[i])
      }
    }
  }, [restaurantTypes])

  return (
    <Container sx={{ width: '100%', display: 'flex', justifyContent: 'center', flexDirection: 'column', mb: 5 }}>
      <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%', pt: '12px', pb: '12px' }}>
          <FormControl sx={{ width: { xs: '90%', sm: '65%', md: '50%', lg: '40%' } }}>
        <InputLabel id="demo-multiple-chip-label">Select type</InputLabel>
        <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          value={restaurantTypes}
          onChange={handleChange}
          input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {types.map((type) => (
            <MenuItem
              key={type}
              value={type}
              style={getStyles(type, restaurantTypes, theme)}
            >
              {type}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      </Box>
      {(isLoaded && checkPagination && restaurantTypes.length === 0 && restaurants.length > 0 && dispatched === true) || (isLoaded && checkPagination === false && restaurantTypes.length === 0 && restaurants.length > 0 && dispatched === true) || (restaurants.length > 0 && restaurantTypes.length === 0)
        ? restaurants.map(function (results) {
          return (
          <RestaurantCard
            key={results.place_id}
            placeId={results.place_id}
            name={results.name}
            address={results.vicinity}
            icon={results.photos !== undefined ? results.photos[0].getUrl() : 'https://i.ibb.co/M2NLtMx/image-not-available-wide3.png'}
            rating={results.rating !== undefined ? results.rating : 0}
            userRatingsTotal={results.user_ratings_total !== undefined ? results.user_ratings_total : 0}
            isOpen={results.open}
          />
          )
        })
        : restaurantTypes.length === 0 && restaurants.length === 0 && <Box sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', padding: '50px', alignItems: 'center' }}>
          {getTranslation(
            language,
            'loadingrestaurants'
          )}<CircularProgress sx={{ marginTop: '50px' }}/>
          </Box>}
          {(isLoaded && restaurantTypes.length > 0 && !restaurantTypes.includes('All') && restaurants.length > 0)
            ? placesFiltered.map(function (results) {
              return (
            <RestaurantCard
              key={results.place_id}
              placeId={results.place_id}
              name={results.name}
              address={results.vicinity}
              icon={results.photos !== undefined ? results.photos[0].getUrl() : 'https://i.ibb.co/M2NLtMx/image-not-available-wide3.png'}
              rating={results.rating !== undefined ? results.rating : 0}
              userRatingsTotal={results.user_ratings_total !== undefined ? results.user_ratings_total : 0}
              isOpen={results.open}
            />
              )
            })
            : restaurantTypes.includes('All') && restaurants.map(function (results) {
              return (
            <RestaurantCard
              key={results.place_id}
              placeId={results.place_id}
              name={results.name}
              address={results.vicinity}
              icon={results.photos !== undefined ? results.photos[0].getUrl() : 'https://i.ibb.co/M2NLtMx/image-not-available-wide3.png'}
              rating={results.rating !== undefined ? results.rating : 0}
              userRatingsTotal={results.user_ratings_total !== undefined ? results.user_ratings_total : 0}
              isOpen={results.open}
            />
              )
            })}
    </Container>
  )
}
export default RestaurantsList
