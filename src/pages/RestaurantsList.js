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

const RestaurantsList = () => {
  console.log('listaa')

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
  const [checkPagination, setCheckPagination] = useState()
  const [placesFinal, setPlacesFinal] = useState([])
  const [libraries] = useState(['places', 'geometry'])
  const theme = useTheme()
  const [restaurantTypes, setRestaurantTypes] = useState([])
  const [placesFiltered, setPlacesFiltered] = useState([])

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
      console.log('yksikaksikolme')
      if (navigator.geolocation) {
        console.log('yykaakoo')
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
    console.log('Current', currentPos)
    if (currentPos !== {}) {
      const request = {
        location: currentPos,
        radius: '0',
        type: ['restaurant']
      }
      // Gets the Google PlacesService and sets it to invisible div element
      const service = new window.google.maps.places.PlacesService(document.createElement('div'))
      // Calls nearbySearch which is used when you want to get places near you
      service.nearbySearch(request, callback)
      // Makes the call to the service and goes through all of the results and calls createRestaurantList function
      // There can be multiple pages. If there is waits until all results are gotten before rendering
      function callback (results, status, pagination) {
        console.log('wtf123')
        if (status === window.google.maps.places.PlacesServiceStatus.OK) {
          console.log('tekeekö')
          for (let i = 0; i < results.length; i++) {
            createRestaurantList(results[i])
          }
          if (pagination && pagination.hasNextPage) {
            console.log('paginaatio')
            pagination.nextPage()
            setTimeout(function () {
              setCheckPagination(true)
            }, 6000)
          } else {
            setCheckPagination(false)
          }
        }
      }
    }
  }
  // Waits for location and then gets the nearby restaurants
  setTimeout(function () {
    if (checkIfPos === true) {
      getPlacesData()
      setCheckIfPos(false)
    }
  }, 2000)
  // Adds the restaurants to array
  const createRestaurantList = (place) => {
    placesList.push(place)
    setPlacesFinal(placesList)
  }
  // Styling for the filter element
  const getStyles = (type, restaurantTypes, theme) => {
    return {
      fontWeight:
      restaurantTypes.indexOf(type) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium
    }
  }
  // Handles the changing of restaurant types
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
        filterRestaurants(placesFinal, restaurantTypes[i])
      }
    }
  }, [restaurantTypes])

  return (
    <Container sx={{ width: '100%', display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
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
      {(isLoaded && checkPagination && restaurantTypes.length === 0) || (isLoaded && checkPagination === false && restaurantTypes.length === 0)
        ? placesFinal.map(function (results) {
          console.log('results: ', results)
          return (
          <RestaurantCard
            key={results.place_id}
            placeId={results.place_id}
            name={results.name}
            address={results.vicinity}
            icon={results.photos !== undefined ? results.photos[0].getUrl() : 'https://i.ibb.co/M2NLtMx/image-not-available-wide3.png'}
            rating={results.rating !== undefined ? results.rating : 0}
            userRatingsTotal={results.user_ratings_total !== undefined ? results.user_ratings_total : 0}
            isOpen={results.opening_hours !== undefined && results.opening_hours.isOpen() !== false ? 'open' : 'closed'}
          />
          )
        })
        : restaurantTypes.length === 0 && <Box sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', padding: '50px', alignItems: 'center' }}>
          {getTranslation(
            language,
            'loadingrestaurants'
          )}<CircularProgress sx={{ marginTop: '50px' }}/>
          </Box>}
          {(isLoaded && restaurantTypes.length > 0 && !restaurantTypes.includes('All'))
            ? placesFiltered.map(function (results) {
              console.log('results: ', results)
              return (
            <RestaurantCard
              key={results.place_id}
              placeId={results.place_id}
              name={results.name}
              address={results.vicinity}
              icon={results.photos !== undefined ? results.photos[0].getUrl() : 'https://i.ibb.co/M2NLtMx/image-not-available-wide3.png'}
              rating={results.rating !== undefined ? results.rating : 0}
              userRatingsTotal={results.user_ratings_total !== undefined ? results.user_ratings_total : 0}
              isOpen={results.opening_hours !== undefined && results.opening_hours.isOpen() !== false ? 'open' : 'closed'}
            />
              )
            })
            : restaurantTypes.includes('All') && placesFinal.map(function (results) {
              console.log('results: ', results)
              return (
            <RestaurantCard
              key={results.place_id}
              placeId={results.place_id}
              name={results.name}
              address={results.vicinity}
              icon={results.photos !== undefined ? results.photos[0].getUrl() : 'https://i.ibb.co/M2NLtMx/image-not-available-wide3.png'}
              rating={results.rating !== undefined ? results.rating : 0}
              userRatingsTotal={results.user_ratings_total !== undefined ? results.user_ratings_total : 0}
              isOpen={results.opening_hours !== undefined && results.opening_hours.isOpen() !== false ? 'open' : 'closed'}
            />
              )
            })}
    </Container>
  )
}
export default RestaurantsList
