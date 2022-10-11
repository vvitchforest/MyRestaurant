import React from 'react'
import { Box, Grid, Skeleton } from '@mui/material'
import PropTypes from 'prop-types'

const LoadingMenu = ({ restaurantType }) => {
  const skeletons = Array.from({ length: restaurantType === 'sodexo' ? 5 : 8 }, (_, index) => {
    if (restaurantType === 'foodandco') {
      return (
        <Box key={index} sx={{ m: 2 }}>
          <Skeleton style={{ height: '25px', width: '85%' }} />
          <Skeleton style={{ height: '30px', width: '25%' }} />
        </Box>
      )
    } else {
      return (
        <Box key={index} sx={{ m: 2 }}>
          <Grid container sx={ { width: '100%' } }>
            <Grid item xs >
              <Skeleton width={100} height={30} />
            </Grid>
            <Grid item xs sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Skeleton width={50} height={30} />
            </Grid>
          </Grid>
          <Grid container >
            <Skeleton width={250} height={25} />
          </Grid>
          <Grid container >
            <Grid item xs>
            <Skeleton width={50} height={30} />
            </Grid>
            <Grid item xs sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Skeleton variant="circular" width={25} height={25} />
            </Grid>
          </Grid>
        </Box>
      )
    }
  })

  return (
    <Box sx={{ width: { xs: '100%', md: '50%' } }}>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Skeleton style={{ height: '70px', width: '50%' }} />
      </Box>
      <Box>{skeletons}</Box>
    </Box>
  )
}

LoadingMenu.propTypes = {
  restaurantType: PropTypes.string
}

export default LoadingMenu
