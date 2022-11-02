/**
 * @Author Teemu Tirkkonen
 * @Author Oskar Wiiala
 * Card component displaying individual restaurant info. Used in RestaurantList.js
 */

import React, { useState } from 'react'
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
import MoreVertIcon from '@mui/icons-material/MoreVert'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import PropTypes from 'prop-types'
import { useCookies } from 'react-cookie'
import getTranslation from '../utils/Translations'
import { useDispatch } from 'react-redux'
import * as actions from '../store/actions/index'
import CustomModal from './CustomModal'

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
  // openingHours,
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

  const handleExpandClick = () => {
    setExpanded(!expanded)
    dispatch(actions.setOpeningHours(!expanded))
    dispatch(actions.setPlaceId(placeId))
  }

  const getPlaceDetails = () => {
    const request = {
      placeId,
      fields: ['opening_hours']
    }

    const service = new window.google.maps.places.PlacesService(
      document.createElement('div')
    )
    service.getDetails(request, callback)

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
  if (expanded === true) {
    getPlaceDetails()
    dispatch(actions.setOpeningHours(false))
  }
  const handleReviews = () => {
    const request = {
      placeId,
      fields: ['reviews']
    }

    const service = new window.google.maps.places.PlacesService(
      document.createElement('div')
    )
    service.getDetails(request, callback)

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
      const data1 = data[i]
      // gets characters of a string before character ':' and then translates it
      const day = getTranslation(language, data1.substring(0, data1.indexOf(':')).toLowerCase())
      // gets characters of a string after character ' '
      let hours = data1.substring(data1.indexOf(' ') + 1)
      if (hours === 'Closed') {
        hours = getTranslation(language, 'closed')
      }
      tableRowsTemp.push({ day, hours })
    }
    setTableRows(tableRowsTemp)
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
              backgroundColor: isOpen === 'open' ? '#DAF7A6' : '#FF8266'
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
              >
                <MoreVertIcon />
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
                        <TableCell component='th' scope='row'>
                          {row.day}
                        </TableCell>
                        <TableCell align='right'>{row.hours}</TableCell>
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
  // openingHours: PropTypes.array.isRequired,
  onClick: PropTypes.any
}

export default RestaurantCard
