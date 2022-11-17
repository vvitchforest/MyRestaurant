/**
 * @Author Oskar Wiiala
 * @Author Teemu Tirkkonen
 * Modal for choosing travel option to specific restaurant in map
 */

import { React, useState } from 'react'
import PropTypes from 'prop-types'
import { Dialog, Box, Typography, IconButton, Button } from '@mui/material'
import DirectionsWalkIcon from '@mui/icons-material/DirectionsWalk'
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus'
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar'
import { useCookies } from 'react-cookie'
import getTranslation from '../utils/Translations'

/**
 * @param {boolean} open is modal open or not
 * @param {func} handleClose handles closing and opening of modal
 * @param {boolean} setOpenDrawer handles opening and closing restaurant info drawer in Map.js
 * @param {object} currentPos user's current position
 * @param {number} restaurantLat latitude of selected restaurant on map
 * @param {number} restaurantLng longitude of selected restaurant on map
 * @param {MutableRefObject} mapRef tracks useRef for map in Map.js
 * @returns modal component for choosing travel type for directions
 */
const DirectionsModal = ({
  open,
  handleClose,
  setOpenRestaurantDrawer,
  setOpenDirectionsDrawer,
  currentPos,
  restaurantLat,
  restaurantLng,
  mapRef,
  setInstructions
}) => {
  const [cookies] = useCookies(['language'])
  const language = cookies.language ? cookies.language : 'en'
  const [selectedType, setSelectedType] = useState()
  const [disabled, setDisabled] = useState(true)
  const [colorWalk, setColorWalk] = useState('default')
  const [colorBus, setColorBus] = useState('default')
  const [colorCar, setColorCar] = useState('default')

  /**
   * Gets directions and sets instructions for directions for selected restaurant from current location
   * @param {string} type type of travel, eg. 'walk', 'bus'
   * @param {number} lat latitude of restaurant
   * @param {number} lng longitude of restaurant
   */
  const getDirections = (type, lat, lng) => {
    if (type === 'walk') {
      // Gets the directionService and directionRenderer
      // Renderer is used to draw the route in the map
      const directionService = new window.google.maps.DirectionsService()
      const directionRenderer = new window.google.maps.DirectionsRenderer()
      // Sets the directionRenderer to the map
      directionRenderer.setMap(mapRef.current)
      // Request directions based on current location, restaurant lat/lng + walking
      const request = {
        origin: currentPos,
        destination: { lat, lng },
        travelMode: 'WALKING'
      }
      // Draws the route to the map and sets up instructions for each step along the way
      directionService.route(request, function (result, status) {
        if (status === 'OK') {
          const instructionsHeaderArray = []
          const instructionsArray = []
          const steps = result.routes[0].legs[0].steps

          // splits start and end addresses, keeps only address and removes country code, city etc.
          const startAddressSplit = (result.routes[0].legs[0].start_address).split(',')
          const startAddress = `${startAddressSplit[0]}`
          const endAddressSplit = (result.routes[0].legs[0].end_address).split(',')
          const endAddress = `${endAddressSplit[0]}`
          instructionsHeaderArray.push(
            `From ${startAddress} to ${endAddress}`, `Distance: ${result.routes[0].legs[0].distance?.text}. Estimated time: ${result.routes[0].legs[0].duration?.text}`
          )
          for (let i = 0; i < steps.length; i++) {
            console.log(`step ${i + 1}: ${steps[i].instructions}`)
            if (steps[i].instructions) {
              // removes HTML tags from instructions text
              const cleanText = steps[i].instructions.replace(
                /<\/?[^>]+(>|$)/g,
                ''
              )
              instructionsArray.push({ lat: steps[i].start_location.lat(), lng: steps[i].start_location.lng(), step: `step ${i + 1}: ${cleanText}` })
            }
          }
          setInstructions(instructionsHeaderArray, instructionsArray)
          directionRenderer.setDirections(result)
        }
      })
      setOpenRestaurantDrawer(false)
      handleClose()
      setOpenDirectionsDrawer(true)
    } else if (type === 'bus') {
      // Gets the directionService and directionRenderer
      // Renderer is used to draw the route in the map
      const directionService = new window.google.maps.DirectionsService()
      const directionRenderer = new window.google.maps.DirectionsRenderer()
      // Sets the directionRenderer to the map
      directionRenderer.setMap(mapRef.current)
      // Request directions based on current location, restaurant lat/lng
      // and by using bus as a primary traveling mode
      // if there's no buses will use same route as with walking
      const request = {
        origin: currentPos,
        destination: { lat, lng },
        travelMode: 'TRANSIT',
        transitOptions: {
          departureTime: new Date(),
          modes: ['BUS'],
          routingPreference: 'FEWER_TRANSFERS'
        }
      }
      // Draws the route to the map and sets up instructions for each step along the way
      directionService.route(request, function (result, status) {
        if (status === 'OK') {
          const instructionsHeaderArray = []
          const instructionsArray = []
          const steps = result.routes[0].legs[0].steps
          let step = 1

          // splits start and end addresses, keeps only address and removes country code, city etc.
          const startAddressSplit = (result.routes[0].legs[0].start_address).split(',')
          const startAddress = `${startAddressSplit[0]}`
          const endAddressSplit = (result.routes[0].legs[0].end_address).split(',')
          const endAddress = `${endAddressSplit[0]}`

          instructionsHeaderArray.push(
            `From ${startAddress} to ${endAddress}`, `Distance: ${result.routes[0].legs[0].distance?.text}. Estimated time: ${result.routes[0].legs[0].duration?.text}`
          )

          for (let i = 0; i < steps.length; i++) {
            if (steps[i].travel_mode === 'TRANSIT') {
              const instruction = `step ${step}: Board bus ${steps[i].transit?.line.short_name}, departing at ${steps[i].transit?.departure_time?.text} towards ${steps[i].transit?.headsign}, arriving at ${steps[i].transit?.arrival_time?.text}. (${steps[i].transit?.num_stops} stops)`
              instructionsArray.push({ lat: steps[i].start_location.lat(), lng: steps[i].start_location.lng(), step: instruction })
              step++
            } else if (steps[i].travel_mode === 'WALKING') {
              for (let j = 0; j < steps[i].steps.length; j++) {
                if (steps[i].steps[j].instructions) {
                  // removes HTML tags from instructions text
                  const cleanText = steps[i].steps[j].instructions.replace(
                    /<\/?[^>]+(>|$)/g,
                    ''
                  )
                  const instruction = `step ${step}: ${cleanText}`
                  instructionsArray.push({ lat: steps[i].steps[j].start_location.lat(), lng: steps[i].steps[j].start_location.lng(), step: instruction })
                }
                step++
              }
            }
          }
          setInstructions(instructionsHeaderArray, instructionsArray)
          directionRenderer.setDirections(result)
        }
      })
      setOpenRestaurantDrawer(false)
      handleClose()
      setOpenDirectionsDrawer(true)
    } else if (type === 'car') {
      // Gets the directionService and directionRenderer
      // Renderer is used to draw the route in the map
      const directionService = new window.google.maps.DirectionsService()
      const directionRenderer = new window.google.maps.DirectionsRenderer()
      // Sets the directionRenderer to the map
      directionRenderer.setMap(mapRef.current)
      // Request directions based on current location, restaurant lat/lng
      // and by using bus as a primary traveling mode
      // if there's no buses will use same route as with walking
      const request = {
        origin: currentPos,
        destination: { lat, lng },
        travelMode: 'DRIVING'
      }
      // Draws the route to the map
      directionService.route(request, function (result, status) {
        if (status === 'OK') {
          const instructionsHeaderArray = []
          const instructionsArray = []
          const steps = result.routes[0].legs[0].steps
          let step = 1

          // splits start and end addresses, keeps only address and removes country code, city etc.
          const startAddressSplit = (result.routes[0].legs[0].start_address).split(',')
          const startAddress = `${startAddressSplit[0]}`
          const endAddressSplit = (result.routes[0].legs[0].end_address).split(',')
          const endAddress = `${endAddressSplit[0]}`

          instructionsHeaderArray.push(
            `From ${startAddress} to ${endAddress}`, `Distance: ${result.routes[0].legs[0].distance?.text}. Estimated time: ${result.routes[0].legs[0].duration?.text}`
          )

          for (let i = 0; i < steps.length; i++) {
            if (steps[i].travel_mode === 'DRIVING') {
              if (steps[i].instructions) {
                // removes HTML tags from instructions text
                const cleanText = steps[i].instructions.replace(
                  /<\/?[^>]+(>|$)/g,
                  ''
                )
                const instruction = `step ${step}: ${cleanText}`
                instructionsArray.push({ lat: steps[i].start_location.lat(), lng: steps[i].start_location.lng(), step: instruction })
              }
              step++
            }
          }
          setInstructions(instructionsHeaderArray, instructionsArray)
          console.log('result driving:', result)
          directionRenderer.setDirections(result)
        }
      })
      setOpenRestaurantDrawer(false)
      handleClose()
      setOpenDirectionsDrawer(true)
    } else {
      console.log(type, ' not yet implemented')
    }
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      sx={{
        '& .MuiDialog-paper': {
          boxSizing: 'border-box',
          width: '300px'
        }
      }}
    >
      <Box
        sx={{
          backgroundColor: 'white',
          padding: '1rem 1.5rem',
          maxWidth: '100vw'
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center'
          }}
        >
          <Typography variant='h6'>
            {getTranslation(language, 'choosetraveloption')}
          </Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-evenly',
            flexDirection: 'row',
            padding: '12px'
          }}
        >
          <IconButton
            color={colorWalk}
            onClick={() => {
              setColorWalk('primary')
              setColorCar('default')
              setColorBus('default')
              setSelectedType('walk')
              setDisabled(false)
            }}
          >
            <DirectionsWalkIcon sx={{ width: '36px', height: '36px' }} />
          </IconButton>
          <IconButton
            color={colorBus}
            onClick={() => {
              setColorBus('primary')
              setColorCar('default')
              setColorWalk('default')
              setSelectedType('bus')
              setDisabled(false)
            }}
          >
            <DirectionsBusIcon sx={{ width: '36px', height: '36px' }} />
          </IconButton>
          <IconButton
            color={colorCar}
            onClick={() => {
              setColorCar('primary')
              setColorBus('default')
              setColorWalk('default')
              setSelectedType('car')
              setDisabled(false)
            }}
          >
            <DirectionsCarIcon sx={{ width: '36px', height: '36px' }} />
          </IconButton>
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-evenly',
            flexDirection: 'row',
            padding: '12px'
          }}
        >
          <Button
            variant='outlined'
            color='error'
            onClick={() => {
              handleClose()
              setDisabled(true)
              setColorWalk('default')
              setColorBus('default')
              setColorCar('default')
            }}
          >
            {getTranslation(language, 'cancel')}
          </Button>
          <Button
            variant='contained'
            disabled={disabled}
            onClick={() => {
              getDirections(selectedType, restaurantLat, restaurantLng)
              setDisabled(true)
              setColorWalk('default')
              setColorBus('default')
              setColorCar('default')
            }}
          >
            OK
          </Button>
        </Box>
      </Box>
    </Dialog>
  )
}

DirectionsModal.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  setOpenRestaurantDrawer: PropTypes.func.isRequired,
  setOpenDirectionsDrawer: PropTypes.func.isRequired,
  currentPos: PropTypes.object.isRequired,
  restaurantLat: PropTypes.number,
  restaurantLng: PropTypes.number,
  mapRef: PropTypes.object.isRequired,
  setInstructions: PropTypes.func.isRequired
}
export default DirectionsModal
