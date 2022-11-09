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
  setOpenDrawer,
  currentPos,
  restaurantLat,
  restaurantLng,
  mapRef
}) => {
  const [cookies] = useCookies(['language'])
  const language = cookies.language ? cookies.language : 'en'
  const [selectedType, setSelectedType] = useState()
  const [disabled, setDisabled] = useState(true)
  const [colorWalk, setColorWalk] = useState('default')
  const [colorBus, setColorBus] = useState('default')

  /**
   * Gets directions for selected restaurant from current location
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
      // Draws the route to the map
      directionService.route(request, function (result, status) {
        if (status === 'OK') {
          directionRenderer.setDirections(result)
        }
      })
      setOpenDrawer(false)
      handleClose()
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
      // Draws the route to the map
      directionService.route(request, function (result, status) {
        if (status === 'OK') {
          directionRenderer.setDirections(result)
        }
      })
      setOpenDrawer(false)
      handleClose()
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
            {getTranslation(
              language,
              'choosetraveloption'
            )}
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
              setColorWalk('default')
              setSelectedType('bus')
              setDisabled(false)
            }}
          >
            <DirectionsBusIcon sx={{ width: '36px', height: '36px' }} />
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
            }}
          >
            {getTranslation(
              language,
              'cancel'
            )}
          </Button>
          <Button
            variant='contained'
            testID='button'
            disabled={disabled}
            onClick={() => {
              getDirections(selectedType, restaurantLat, restaurantLng)
              setDisabled(true)
              setColorWalk('default')
              setColorBus('default')
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
  setOpenDrawer: PropTypes.func.isRequired,
  currentPos: PropTypes.object.isRequired,
  restaurantLat: PropTypes.number,
  restaurantLng: PropTypes.number,
  mapRef: PropTypes.object.isRequired
}
export default DirectionsModal
