import React from 'react'
import { Box, Card, CardContent, CardHeader, CardMedia, IconButton, Typography } from '@mui/material'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import PropTypes from 'prop-types'

const RestaurantCard = ({ name, address, icon }) => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: '10px', overflow: 'auto' }}>
        <Card sx={{ minWidth: '50%', maxWidth: '100%' }}>
             <CardHeader
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={name}
        subheader={address}
      />
      <CardMedia
        component="img"
        height="200"
        image={icon}
        alt="Picture of the restaurant"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          Placeholder for now
        </Typography>
      </CardContent>
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
