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
  Collapse
} from '@mui/material'
import { styled } from '@mui/material/styles'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import PropTypes from 'prop-types'
import { useCookies } from 'react-cookie'
import getTranslation from '../utils/Translations'

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

const RestaurantCard = ({
  name,
  address,
  icon,
  rating,
  userRatingsTotal,
  isOpen
}) => {
  console.log('openNow: ', isOpen)
  const [cookies] = useCookies(['language'])
  const [expanded, setExpanded] = useState(false)

  const handleExpandClick = () => {
    setExpanded(!expanded)
  }

  return (
    <Box
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
            {getTranslation(cookies.language ? cookies.language : 'en', isOpen)}
          </Typography>
          <CardHeader
            action={
              <IconButton
                aria-label={getTranslation(
                  cookies.language ? cookies.language : 'en',
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
            <Typography
              sx={{
                alignSelf: 'center',
                textDecoration: 'underline',
                pl: '8px'
              }}
              variant='body1'
              color='text.secondary'
            >
              {userRatingsTotal}
            </Typography>
          </Box>
          <CardMedia
            component='img'
            height='225'
            image={icon}
            alt={getTranslation(
              cookies.language ? cookies.language : 'en',
              'ariapicturerestaurant'
            )}
          />
          <CardContent sx={{ display: 'flex', flexDirection: 'row' }}>
            <Typography sx={{ alignSelf: 'center' }}>
              {getTranslation(
                cookies.language ? cookies.language : 'en',
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
              <Typography variant='body2' color='text.secondary'>
                PLACEHOLDER OPENING HOURS
              </Typography>
              <Typography variant='body2' color='text.secondary'>
                Monday: 9:00 - 18:00
              </Typography>
              <Typography variant='body2' color='text.secondary'>
                Tuesday: 9:00 - 18:00
              </Typography>
              <Typography variant='body2' color='text.secondary'>Wednesday: 9:00 - 18:00</Typography>
              <Typography variant='body2' color='text.secondary'>Thursday: 9:00 - 18:00</Typography>
              <Typography variant='body2' color='text.secondary'>Friday: 9:00 - 18:00</Typography>
              <Typography variant='body2' color='text.secondary'>Saturday: 10:00 - 16:00</Typography>
              <Typography variant='body2' color='text.secondary'>Sunday: closed</Typography>
            </CardContent>
          </Collapse>
        </Box>
      </Card>
    </Box>
  )
}

RestaurantCard.propTypes = {
  name: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
  userRatingsTotal: PropTypes.number.isRequired,
  isOpen: PropTypes.string.isRequired
}

export default RestaurantCard
