/**
 * @Author Oskar Wiiala
 * Component dor displaying directions instructions in Map.js
 */

import React, { useState } from 'react'
import PropTypes from 'prop-types'
import {
  Box,
  IconButton,
  Typography,
  Drawer,
  Divider,
  Collapse
} from '@mui/material'
import { styled } from '@mui/material/styles'
import CloseIcon from '@mui/icons-material/Close'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import getTranslation from '../utils/Translations'

// Handles MUI Collapse component expansion when clicking "Steps" dropdown icon
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
 * @param {boolean} open is drawer open or not
 * @param {func} handleDrawerToggle handles opening and closing of restaurant info drawer in Map.js
 * @param {string} language language of app ('en', 'fi')
 * @param {array} instructions directions information
 * @returns drawer component for displaying a specific route's instructions
 */
const DirectionsDrawer = ({
  open,
  handleDrawerToggle,
  language,
  instructionsHeader,
  instructions
}) => {
  console.log('instructions', instructions)
  const [expanded, setExpanded] = useState(false)

  const handleExpandClick = () => {
    setExpanded(!expanded)
  }

  return (
    <Drawer
      anchor='bottom'
      open={open}
      onClose={handleDrawerToggle}
      variant='persistent'
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
          mr: '12px',
          mb: '12px'
        }}
      >
        {instructionsHeader.map((position) => (
          <Typography
            key={position}
            variant='body1'
            sx={{
              fontSize: { xs: '3.5vw', sm: '2.5vw', md: '2vw', lg: '2vw' },
              pl: '6px',
              pt: '2px',
              pb: '2px'
            }}
          >
            {position}
          </Typography>
        ))}
        <Divider />
        <Box sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'row' }}>
          <Typography sx={{ pl: '6px', pt: '5px' }}>
            {getTranslation(language, 'steps')}
          </Typography>
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label='show more'
          >
            <ExpandMoreIcon />
          </ExpandMore>
        </Box>
        <Collapse in={expanded} timeout='auto' unmountOnExit sx={{ maxHeight: '100px', overflowY: 'scroll' }}>
          {instructions.map((position) => (
            <Typography
              key={position.step}
              variant='body2'
              sx={{
                fontSize: { xs: '3vw', sm: '2vw', md: '1.5vw', lg: '1.5vw' },
                pl: '6px',
                pt: '2px'
              }}
            >
              {position.step}
            </Typography>
          ))}
        </Collapse>
      </Box>
    </Drawer>
  )
}

DirectionsDrawer.propTypes = {
  open: PropTypes.bool,
  handleDrawerToggle: PropTypes.func,
  language: PropTypes.string,
  instructionsHeader: PropTypes.array,
  instructions: PropTypes.array
}

export default DirectionsDrawer
