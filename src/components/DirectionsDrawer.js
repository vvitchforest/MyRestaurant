/**
 * @Author Oskar Wiiala
 * Component dor displaying directions instructions in Map.js
 */

import React from 'react'
import PropTypes from 'prop-types'
import { Box, Drawer, IconButton, Typography } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import getTranslation from '../utils/Translations'

/**
 * @param {boolean} open is drawer open or not
 * @param {func} handleDrawerToggle handles opening and closing of restaurant info drawer in Map.js
 * @param {string} language language of app ('en', 'fi')
 * @param {array} directions directions information
 * @returns drawer component for displaying a specific route's instructions
 */
const DirectionsDrawer = ({
  open,
  handleDrawerToggle,
  language,
  directions
}) => {
  console.log('directions', directions)

  return (
    <Drawer
      anchor='bottom'
      open={open}
      onClose={handleDrawerToggle}
      variant='temporary'
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          ml: '12px',
          mr: '12px'
        }}
      >
        <Typography
          variant='body1'
          sx={{
            fontSize: { xs: '5vw', sm: '3vw', md: '2.5vw', lg: '2.5vw' },
            pl: '6px',
            alignSelf: 'center'
          }}
        >
          {getTranslation(language, 'instructions')}
        </Typography>
        <IconButton type='button' onClick={handleDrawerToggle}>
          <CloseIcon sx={{ height: '25px', width: '25px' }} />
        </IconButton>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          ml: '12px',
          mr: '12px'
        }}
      >
        {directions.map((step) => (
          <Typography key={step}>{step}</Typography>
        ))}
      </Box>
    </Drawer>
  )
}

DirectionsDrawer.propTypes = {
  open: PropTypes.bool,
  handleDrawerToggle: PropTypes.func,
  language: PropTypes.string,
  directions: PropTypes.array
}

export default DirectionsDrawer
