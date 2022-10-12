import { useJsApiLoader } from '@react-google-maps/api'
import React, { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import RestaurantCard from '../components/RestaurantCard'
import getTranslation from '../utils/Translations'

const RestaurantsList = () => {
  const [cookies] = useCookies(['language'])
  const [currentPos, setCurrentPos] = useState({})
  const placesList = []
  const [checkIfPos, setCheckIfPos] = useState(false)
  const [checkPagination, setCheckPagination] = useState(false)
  const [placesFinal, setPlacesFinal] = useState([])
  const [libraries] = useState(['places', 'geometry'])

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
        radius: '2000',
        type: ['restaurant']
      }

      const service = new window.google.maps.places.PlacesService(document.createElement('div'))
      service.nearbySearch(request, callback)

      function callback (results, status, pagination) {
        console.log('callback ok1, status: ', status)
        if (status === window.google.maps.places.PlacesServiceStatus.OK) {
          console.log('callback ok2')
          for (let i = 0; i < results.length; i++) {
            createRestaurantList(results[i])
            console.log('callback ok3')
            console.log('isloaded1?: ', isLoaded)
          }
          if (pagination && pagination.hasNextPage) {
            console.log('callback ok4')
            pagination.nextPage()
            console.log('isloaded2?: ', isLoaded)
            setTimeout(function () {
              setCheckPagination(true)
            }, 6000)
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

  return (
    <div>
      <h1>
        {getTranslation(
          cookies.language ? cookies.language : 'en',
          'restaurants'
        )}
      </h1>
      {isLoaded && checkPagination
        ? placesFinal.map(function (results) {
          return (
          <RestaurantCard key={results.place_id} name={results.name} address={results.vicinity} icon={results.photos !== undefined ? results.photos[0].getUrl() : ''} />
          )
        })
        : 'Loading restaurants'}
    </div>
  )
}
export default RestaurantsList
