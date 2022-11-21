/**
 * @Author Teemu Tirkkonen
 * @Author Oskar Wiiala
 * Card component displaying individual restaurant info. Used in RestaurantList.js
 */

import React, { useState, useContext } from 'react'
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  Typography,
  Rating,
  Collapse,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from '@mui/material'
import { styled } from '@mui/material/styles'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import PropTypes from 'prop-types'
import { useCookies } from 'react-cookie'
import getTranslation from '../utils/Translations'
import { useDispatch } from 'react-redux'
import * as actions from '../store/actions/index'
import CustomModal from './CustomModal'
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu'
import { ColorModeContext } from '../context/ColorModeContext'
import { getDesignTokens } from '../theme'

// Handles MUI Collapse component expansion when clicking "Opening hours" dropdown icon
const ExpandMore = styled((props) => {
  const { expand, ...other } = props
  return <IconButton {...other} />
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: '12px',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest
  })
}))

/**
 * @param {string} placeId of restaurant
 * @param {string} name of restaurant
 * @param {string} address of restaurant
 * @param {string} icon URL image of restaurant
 * @param {number} rating of restaurant (0-5)
 * @param {number} userRatingsTotal total ratings of restaurant
 * @param {string} isOpen is restaurant open/closed
 * @param {any} onClick handles click of card box. Currently unused???
 * @returns restaurant card component
 */
const RestaurantCard = ({
  placeId,
  name,
  address,
  icon,
  rating,
  userRatingsTotal,
  isOpen,
  onClick
}) => {
  const [cookies] = useCookies(['language'])
  const language = cookies.language ? cookies.language : 'en'
  const [expanded, setExpanded] = useState(false)
  const [openingHours, setOpeningHours] = useState([])
  const [tableRows, setTableRows] = useState([])
  const [reviews, setReviews] = useState([])
  const [modalOpen, setModalOpen] = useState(false)
  const toggleModal = () => setModalOpen(!modalOpen)
  const dispatch = useDispatch()
  const { mode } = useContext(ColorModeContext)

  const handleExpandClick = () => {
    setExpanded(!expanded)
    dispatch(actions.setOpeningHours(!expanded))
    dispatch(actions.setPlaceId(placeId))
  }
  // Gets the opening hours by using specific restaurants id
  const getPlaceDetails = () => {
    const request = {
      placeId,
      fields: ['opening_hours']
    }

    // Gets the Google PlacesService and sets it to invisible div element
    const service = new window.google.maps.places.PlacesService(
      document.createElement('div')
    )
    // Calls getDetails which is used when you want extra information from specific place
    service.getDetails(request, callback)
    // Makes the call to the service and if opening hours exist for the place,
    // sets opening hours and creates a table from them
    // if they don't exist sets Not Available
    function callback (results, status) {
      if (status === window.google.maps.places.PlacesServiceStatus.OK) {
        if (results.opening_hours !== undefined) {
          setOpeningHours(results.opening_hours.weekday_text)
          createTableRows(openingHours)
        } else {
          setOpeningHours(['Not available'])
        }
      }
    }
  }
  // Gets opening hours when collapse is expanded
  if (expanded === true) {
    getPlaceDetails()
    dispatch(actions.setOpeningHours(false))
  }
  // Gets the reviews by using specific restaurants id
  const handleReviews = () => {
    const request = {
      placeId,
      fields: ['reviews']
    }

    // Same as above
    const service = new window.google.maps.places.PlacesService(
      document.createElement('div')
    )
    // Calls getDetails which is used when you want extra information from specific place
    service.getDetails(request, callback)

    // Makes the call to the service and if reviews exist for the place,
    // sets reviews and if not sets Not Available
    function callback (results, status) {
      if (status === window.google.maps.places.PlacesServiceStatus.OK) {
        if (results.reviews !== undefined) {
          setReviews(results.reviews)
        } else {
          setReviews(['Not available'])
        }
      }
    }
    toggleModal()
  }

  // creates table rows for opening hours
  const createTableRows = (data) => {
    const tableRowsTemp = []
    for (let i = 0; data.length > i; i++) {
      console.log('data[i]', data[i])

      // gets characters of a string before character ':' and then translates it
      const day = data[i].substring(0, data[i].indexOf(':'))
      console.log('day:', day)
      // gets characters of a string after character ' '
      let hours = data[i].substring(data[i].indexOf(' ') + 1)
      if (hours === 'Closed') {
        hours = getTranslation(language, 'closed')
      }
      tableRowsTemp.push({ day, hours })
    }
    console.log('tableRows', tableRows)
    setTableRows(tableRowsTemp)
  }

  const getCurrentDay = () => {
    const days = [
      'sunday',
      'monday',
      'tuesday',
      'wednesday',
      'thursday',
      'friday',
      'saturday'
    ]
    const d = new Date()
    // getDay() returns a number, which represents the day
    return days[d.getDay()]
  }

  // Gets the website by using specific restaurants id
  const openWebsite = () => {
    const request = {
      placeId,
      fields: ['website']
    }

    // Same as above
    const service = new window.google.maps.places.PlacesService(
      document.createElement('div')
    )
    // Calls getDetails which is used when you want extra information from specific place
    service.getDetails(request, callback)

    // Makes the call to the service and if website exist for the place,
    // opens it in new window and if not alerts the user
    function callback (results, status) {
      if (status === window.google.maps.places.PlacesServiceStatus.OK) {
        if (results.website !== undefined) {
          window.open(results.website)
        } else {
          window.alert('Not available')
        }
      }
    }
  }

  return (
    <Box
      key={placeId}
      onClick={onClick}
      sx={{
        display: 'flex',
        justifyContent: 'center',
        marginBottom: '10px',
        overflow: 'auto',
        paddingBottom: '10px'
      }}
    >
      <Card sx={{ width: { xs: '90%', sm: '65%', md: '50%', lg: '40%' } }}>
        <Box>
          <Typography
            sx={{
              padding: '12px',
              fontWeight: 'bold',
              backgroundColor: isOpen === 'open' ? getDesignTokens(mode).palette.success.main : getDesignTokens(mode).palette.error.main
            }}
          >
            {getTranslation(language, isOpen)}
          </Typography>
          <CardHeader
            action={
              <IconButton
                aria-label={getTranslation(
                  language,
                  'ariasettings'
                )}
                onClick={openWebsite}
              >
                <RestaurantMenuIcon />
              </IconButton>
            }
            title={name}
            subheader={address}
          />
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              pl: '12px',
              pr: '12px',
              pb: '12px'
            }}
          >
            <Rating
              name='half-rating-read'
              value={rating}
              defaultValue={0}
              precision={0.5}
              readOnly
            />
            <Button
              onClick={handleReviews}
              sx={{
                alignSelf: 'center',
                textDecoration: 'underline',
                pl: '8px'
              }}
              variant='body1'
              color='text.secondary'
            >
              {userRatingsTotal}
            </Button>
          </Box>
          <CardMedia
            component='img'
            height='225'
            image={icon}
            alt={getTranslation(
              language,
              'ariapicturerestaurant'
            )}
          />
          <CardContent sx={{ display: 'flex', flexDirection: 'row' }}>
            <Typography sx={{ alignSelf: 'center' }}>
              {getTranslation(
                language,
                'openinghours'
              )}
            </Typography>
            <ExpandMore
              expand={expanded}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label='show more'
            >
              <ExpandMoreIcon />
            </ExpandMore>
          </CardContent>
          <Collapse in={expanded} timeout='auto' unmountOnExit>
            <CardContent>
              {(tableRows.length === 0) && getTranslation(language, 'unavailable')}
              {tableRows.length > 0 &&
              <TableContainer component={Paper}>
                <Table size='small' aria-label='dense table with opening hours'>
                  <TableHead>
                    <TableRow>
                      <TableCell>{getTranslation(language, 'day')}</TableCell>
                      <TableCell align='right'>{getTranslation(language, 'hours')}</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {tableRows.map((row) => (
                      <TableRow
                        key={row.day}
                        sx={{
                          '&:last-child td, &:last-child th': { border: 0 }
                        }}
                      >
                        <TableCell sx={{ backgroundColor: getTranslation(language, getCurrentDay().toLowerCase()) === row.day ? getDesignTokens(mode).palette.grey[700] : getDesignTokens(mode).palette.background.paper, color: getTranslation(language, getCurrentDay().toLowerCase()) === row.day ? getDesignTokens(mode).palette.grey[600] : getDesignTokens(mode).palette.text.primary }}>
                          {row.day}
                        </TableCell>
                        <TableCell align='right' sx={{ backgroundColor: getTranslation(language, getCurrentDay().toLowerCase()) === row.day ? getDesignTokens(mode).palette.grey[700] : getDesignTokens(mode).palette.background.paper, color: getTranslation(language, getCurrentDay().toLowerCase()) === row.day ? getDesignTokens(mode).palette.grey[600] : getDesignTokens(mode).palette.text.primary }}>{row.hours}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              }
            </CardContent>
          </Collapse>
          <CustomModal
            open={modalOpen}
            handleClose={() => setModalOpen(false)}
            title={getTranslation(language, 'reviews')}
          >
            <Typography sx={{ pt: '8px', pb: '8px' }}>
              {getTranslation(language, 'only5')}
            </Typography>
            {reviews.map(function (results) {
              return (
                <Card
                  key={results.time}
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    marginBottom: '10px',
                    overflow: 'auto',
                    paddingBottom: '10px'
                  }}
                >
                  <CardHeader
                    action={
                      <IconButton
                        aria-label={getTranslation(
                          language,
                          'ariasettings'
                        )}
                      ></IconButton>
                    }
                    title={results.author_name}
                    subheader={results.relative_time_description}
                  />
                  <CardContent>
                    <Rating
                      sx={{ marginBottom: '10px' }}
                      name='half-rating-read'
                      value={results.rating}
                      defaultValue={0}
                      precision={0.5}
                      readOnly
                    />
                    <Typography variant='body2'>{results.text}</Typography>
                  </CardContent>
                </Card>
              )
            })}
          </CustomModal>
        </Box>
      </Card>
    </Box>
  )
}

RestaurantCard.propTypes = {
  placeId: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
  userRatingsTotal: PropTypes.number.isRequired,
  isOpen: PropTypes.string.isRequired,
  onClick: PropTypes.any
}

export default RestaurantCard
