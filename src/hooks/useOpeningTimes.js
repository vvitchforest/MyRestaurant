import { useState, useEffect } from 'react'
import { useJsApiLoader } from '@react-google-maps/api'
import { useCookies } from 'react-cookie'

/**
 * A custom hook for fetching (opening times) data from Google Places API
 * @Author Irina Konovalova
 * @param {string} restaurantName name of the restaurant for API query
 * @returns states reflecting opening status and opening hours of a restaurant
 */

export const useOpeningTimes = (restaurantName) => {
  const [openingHours, setOpeningHours] = useState(null)
  const [weeklyOpeningHours, setWeeklyOpeningHours] = useState(null)
  const [cookies] = useCookies(['language'])
  const [libraries] = useState(['places', 'geometry'])
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries
  })

  const myLanguage = cookies.language ? cookies.language : 'en'
  // const testDate = new Date(2022, 10, 23, 14, 33, 30, 0)

  useEffect(() => {
    if (isLoaded) {
      const service = new window.google.maps.places.PlacesService(
        document.createElement('div')
      )

      const findPlaceQuery = {
        query: restaurantName,
        fields: ['name', 'place_id']
      }

      service.findPlaceFromQuery(findPlaceQuery, (results, status) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK) {
          const getDetailsQuery = {
            placeId: results[0].place_id,
            fields: ['opening_hours', 'utc_offset_minutes'],
            language: myLanguage
          }

          service.getDetails(getDetailsQuery, (results, status) => {
            if (status === window.google.maps.places.PlacesServiceStatus.OK) {
              setOpeningHours(results?.opening_hours?.isOpen())
              const formattedOpeningTimes = results?.opening_hours?.weekday_text?.map((item) => ({
                dayOfTheWeek: item?.substring(0, item?.indexOf(':')),
                timeOpen: item?.substring(item?.indexOf(' ') + 1)
              }))
              setWeeklyOpeningHours(formattedOpeningTimes)
            }
          })
        }
      })
    }
  }, [isLoaded, myLanguage])

  return { openingHours, weeklyOpeningHours }
}
