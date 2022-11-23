import React, { useContext } from 'react'
import {
  Box,
  Grid,
  CardContent,
  Typography,
  Chip,
  Paper,
  Collapse,
  Button,
  alpha
} from '@mui/material'
import PropTypes from 'prop-types'
import OccupancyHistogram from '../components/OccupancyHistogram'
import OpenStatus from '../components/OpenStatus'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useCookies } from 'react-cookie'
import getTranslation from '../utils/Translations'
import { ColorModeContext } from '../context/ColorModeContext'
import { getDesignTokens } from '../theme'
import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'
import dayjs from 'dayjs'
import 'dayjs/locale/fi'

/**
 * @Author Irina Konovalova
 * Header displaying restaurant info (name, address, lunch time) of campus restaurant.
 * Used in RestaurantSection component.
 * @param {string} name name of the restaurant
 * @param {string} address address of the restaurant
 * @param {string} postalcode postal code of the restaurant
 * @param {boolean} openStatus whether the restaurant is currently open or closed, from Google Places API
 * @param {string} lunchTime lunch time
 * @param {array} weeklyOpeningTimes opening times from Google Places API
 * @returns Component for displaying campus restaurant info and occupancy historam for restaurant Nokia One.
 */

const RestaurantHeader = ({
  name,
  address,
  postalcode,
  openStatus,
  lunchTime,
  weeklyOpeningTimes
}) => {
  const [cookies] = useCookies(['language'])
  const [open, setOpen] = React.useState(false)
  const { mode } = useContext(ColorModeContext)

  const myLanguage = cookies.language ? cookies.language : 'en'
  dayjs.locale(myLanguage)
  const mediumScreen = useMediaQuery('(min-width:750px)')
  const currentWeekday = dayjs().format('dddd')

  const fontStyle = {
    fontSize: '1rem'
  }

  const handleClick = () => {
    setOpen(!open)
  }

  return (
    <Box sx={{ width: '100%' }}>
      <CardContent sx={{ p: 0 }}>
        <Grid container sx={{ width: '100%' }}>
          <Grid item xs={12} sx={{ pl: { xs: 2, sm: 5 }, pt: 2 }}>
            <Typography
              variant="h4"
              sx={{ fontSize: { xs: '1.5rem', md: '2rem' }, pb: 0.5 }}
            >
              {name}
            </Typography>
          </Grid>
          <Grid item xs={12} sx={{ pl: { xs: 2, sm: 5 } }}>
            <Typography variant="body2" sx={fontStyle}>
              {address}
            </Typography>
            <Typography variant="body2" sx={fontStyle}>
              {postalcode}
            </Typography>
            <Box display="flex" sx={{ mb: 2 }}>
              <OpenStatus openStatus={openStatus} />
              <Chip
                label={`${getTranslation(myLanguage, 'lunch')} ${lunchTime}`}
                variant="outlined"
                sx={{ mt: 0.5, ml: 2 }}
              />
            </Box>
          </Grid>
          <Grid item xs={12} md={6} >
            <Button
              onClick={handleClick}
              sx={{
                ml: { xs: 2, sm: 5 },
                p: 1,
                color: getDesignTokens(mode).palette.text.primary
              }}
            >
              <Typography> {getTranslation(myLanguage, 'openinghours')}</Typography>
              {open ? <ExpandLess /> : <ExpandMore />}
            </Button>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ position: 'relative' }}>
                <Paper
                  component="div"
                  sx={{
                    width: '100%',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    zIndex: 10,
                    backgroundColor: alpha(
                      getDesignTokens(mode).palette.background.paper,
                      0.8
                    ),
                    color: getDesignTokens(mode).palette.text.primary,
                    backdropFilter: 'blur(15px)',
                    p: 4
                  }}
                >
                  {weeklyOpeningTimes?.map((day, index) => (
                    <Typography
                      key={index} sx={{ py: 0.5, px: 1, textTransform: 'capitalize' }}
                      style={ day?.includes(currentWeekday) ? { backgroundColor: alpha(getDesignTokens(mode).palette.primary.main, 0.3) } : { backgroundColor: 'transparent' }}>
                      {day}
                    </Typography>
                  ))}
                </Paper>
              </Box>
            </Collapse>
          </Grid>
          {name?.includes('Nokia One') && (
            <Grid item xs={12} sx={{ pb: 0 }}>
              <Box
                sx={{
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'center'
                }}
              >
                <OccupancyHistogram
                  width={mediumScreen ? 475 : 250}
                  height={mediumScreen ? 237 : 175}
                />
              </Box>
            </Grid>
          )}
        </Grid>
      </CardContent>
    </Box>
  )
}

RestaurantHeader.propTypes = {
  name: PropTypes.string,
  address: PropTypes.string,
  postalcode: PropTypes.string,
  openStatus: PropTypes.bool,
  lunchTime: PropTypes.string,
  weeklyOpeningTimes: PropTypes.array
}
export default RestaurantHeader
