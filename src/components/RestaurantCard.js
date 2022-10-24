import React from 'react'
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  Typography
} from '@mui/material'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import PropTypes from 'prop-types'
import { useCookies } from 'react-cookie'
import getTranslation from '../utils/Translations'

const RestaurantCard = ({ name, address, icon }) => {
  const [cookies] = useCookies(['language'])

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
          <CardMedia
            component='img'
            height='225'
            image={icon}
            alt={getTranslation(
              cookies.language ? cookies.language : 'en',
              'ariapicturerestaurant'
            )}
          />
          <CardContent>
            <Typography variant='body2' color='text.secondary'>
              Placeholder for now
            </Typography>
          </CardContent>
        </Box>
      </Card>
    </Box>
  )
}

RestaurantCard.propTypes = {
  name: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired
}

export default RestaurantCard
