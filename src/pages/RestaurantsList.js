import { useJsApiLoader } from '@react-google-maps/api'
import React, { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import RestaurantCard from '../components/RestaurantCard'
import getTranslation from '../utils/Translations'
import { CircularProgress, Box } from '@mui/material'
// import { useDispatch, useSelector } from 'react-redux'
// import * as actions from '../store/actions/index'

const RestaurantsList = () => {
  const [cookies] = useCookies(['language'])
  const [currentPos, setCurrentPos] = useState({})
  const placesList = []
  const [checkIfPos, setCheckIfPos] = useState(false)
  const [checkPagination, setCheckPagination] = useState()
  const [placesFinal, setPlacesFinal] = useState([])
  const [libraries] = useState(['places', 'geometry'])
  // const expanded = useSelector(state => state.userinterface.expanded)
  // const placeId = useSelector(state => state.userinterface.placeId)
  // const dispatch = useDispatch()
  // const [openingHours, setOpeningHours] = useState([])
  // const [selectedCard, setSelectedCard] = useState(new Set())

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries
  })

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
  const getPlacesData = () => {
    console.log('Current', currentPos)
    if (currentPos !== {}) {
      const request = {
        location: currentPos,
        radius: '500',
        type: ['restaurant']
      }

      const service = new window.google.maps.places.PlacesService(document.createElement('div'))
      service.nearbySearch(request, callback)

      function callback (results, status, pagination) {
        if (status === window.google.maps.places.PlacesServiceStatus.OK) {
          for (let i = 0; i < results.length; i++) {
            createRestaurantList(results[i])
          }
          if (pagination && pagination.hasNextPage) {
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
  setTimeout(function () {
    if (checkIfPos === true) {
      getPlacesData()
      setCheckIfPos(false)
    }
  }, 2000)
  const createRestaurantList = (place) => {
    placesList.push(place)
    setPlacesFinal(placesList)
  }
  // Will leave these here for now (ignore)
  /*  const getPlaceDetails = () => {
    console.log('PlaceId', placeId)
    const request = {
      placeId: placeId,
      fields: ['opening_hours']
    }

    const service = new window.google.maps.places.PlacesService(
      document.createElement('div')
    )
    service.getDetails(request, callback)

    function callback (results, status) {
      if (status === window.google.maps.places.PlacesServiceStatus.OK) {
        console.log('Res', results.opening_hours.weekday_text)
        setOpeningHours(results.opening_hours.weekday_text)
      }
    }
  }
  if (expanded === true) {
    getPlaceDetails()
    dispatch(actions.setOpeningHours(false))
  }
  const handleOnClick = (id) => {
    setSelectedCard(selectedCard => {
      selectedCard = new Set(selectedCard)
      if (selectedCard.has(id)) {
        selectedCard.delete(id)
      } else {
        selectedCard.add(id)
      }
      return selectedCard
    })
  } */

  return (
    <div>
      <h1>
        {getTranslation(
          cookies.language ? cookies.language : 'en',
          'restaurants'
        )}
      </h1>
      {(isLoaded && checkPagination) || (isLoaded && checkPagination === false)
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
            // openingHours={openingHours.length > 0 && selectedCard.has(results.place_id) ? openingHours : ['Not available']}
            // onClick={(e) => handleOnClick(results.place_id)}
          />
          )
        })
        : <Box sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', padding: '50px', alignItems: 'center' }}>
          {getTranslation(
            cookies.language ? cookies.language : 'en',
            'loadingrestaurants'
          )}<CircularProgress sx={{ marginTop: '50px' }}/>
          </Box>}
    </div>
  )
}
export default RestaurantsList
