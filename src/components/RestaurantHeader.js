import React, { useContext } from 'react'
import {
  Avatar,
  Box,
  Grid,
  CardContent,
  Typography,
  Chip,
  Paper,
  Collapse,
  Button,
  alpha,
  ClickAwayListener
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
 * @param {any} logo restaurant logo either sodefo or food and co
 * @param {boolean} openStatus whether the restaurant is currently open or closed, from Google Places API
 * @param {string} lunchTime lunch time
 * @param {array} weeklyOpeningTimes opening times from Google Places API
 * @returns Component for displaying campus restaurant info and occupancy historam for restaurant Nokia One.
 */

const RestaurantHeader = ({
  name,
  address,
  postalcode,
  logo,
  openStatus,
  lunchTime,
  weeklyOpeningTimes
}) => {
  const [cookies] = useCookies(['language'])
  const [open, setOpen] = React.useState(false)
  const { mode } = useContext(ColorModeContext)

  const myLanguage = cookies.language ? cookies.language : 'en'
  dayjs.locale(myLanguage)
  const mediumScreen = useMediaQuery('(min-width:550px)')
  const currentWeekday = dayjs().format('dddd')

  const openingHoursStyle = {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 10,
    backgroundColor: alpha(getDesignTokens(mode).palette.background.paper, 0.8),
    color: getDesignTokens(mode).palette.text.primary,
    backdropFilter: 'blur(15px)',
    p: { xs: 2, sm: 5 }
  }

  const handleClick = () => {
    setOpen(!open)
  }

  const handleClickAway = () => {
    setOpen(false)
  }

  return (
      <CardContent sx={{ p: 0 }}>
        <Grid container sx={{ pt: { xs: 0, sm: 2 } }}>
          <Grid item xs={3} md={2} sx={{ pl: { xs: 2, sm: 5 }, pt: 2 }}>
            <Avatar
              alt="logo"
              src={logo}
              sx={{ width: { xs: 36, sm: 56 }, height: { xs: 36, sm: 56 } }}
            />
          </Grid>
          <Grid item xs={9} md={10} sx={{ pt: 2, display: 'flex', alignItems: 'center' }}>
            <Typography
              variant="h4"
              sx={{ fontSize: { xs: '1.5rem', sm: '2rem' }, pb: 0.5 }}
            >
              {name}
            </Typography>
          </Grid>
          <Grid item xs={12} sx={{ pl: { xs: 2, sm: 5 }, pt: { xs: 1, sm: 2 } }}>
            <Typography variant="body2">
              {address}
            </Typography>
            <Typography variant="body2">
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
          <Grid item xs={12}>
            <Button
              onClick={handleClick}
              sx={{
                width: '100%',
                display: 'flex',
                justifyContent: 'flex-start',
                pl: { xs: 2, sm: 5 },
                p: 1,
                color: getDesignTokens(mode).palette.text.primary
              }}
            >
              <Typography>
                {getTranslation(myLanguage, 'openinghours')}
              </Typography>
              {open ? <ExpandLess /> : <ExpandMore />}
            </Button>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <ClickAwayListener onClickAway={handleClickAway}>
              <Box sx={{ position: 'relative' }}>
                <Paper component="div" sx={openingHoursStyle}>
                  {weeklyOpeningTimes?.map((day, index) => (
                    <Box
                      key={index}
                      display="flex"
                      sx={{ width: { xs: '100%', md: '70%' }, justifyContent: 'space-between' }}
                      style={
                        day?.dayOfTheWeek?.includes(currentWeekday)
                          ? { backgroundColor: alpha(getDesignTokens(mode).palette.primary.main, 0.3) }
                          : { backgroundColor: 'transparent' }
                      }
                    >
                      <Typography
                        sx={{ py: 0.5, px: 1, textTransform: 'capitalize', fontSize: { xs: '0.85rem', sm: '1rem' } }}
                      >
                        {day?.dayOfTheWeek}
                      </Typography>
                      <Typography sx={{ py: 0.5, px: 1, fontSize: { xs: '0.85rem', sm: '1rem' } }}>
                        {day?.timeOpen}
                      </Typography>
                    </Box>
                  ))}
                </Paper>
              </Box>
              </ClickAwayListener>
            </Collapse>
          </Grid>
          {name?.includes('Nokia One') && (
            <Grid item xs={12} sx={{ pb: 0, width: '100%', display: 'flex', justifyContent: 'center' }}>
              <OccupancyHistogram
                width={mediumScreen ? 475 : 250}
                height={mediumScreen ? 237 : 175}
              />
            </Grid>
          )}
        </Grid>
      </CardContent>
  )
}

RestaurantHeader.propTypes = {
  name: PropTypes.string,
  address: PropTypes.string,
  postalcode: PropTypes.string,
  logo: PropTypes.any,
  openStatus: PropTypes.bool,
  lunchTime: PropTypes.string,
  weeklyOpeningTimes: PropTypes.array
}
export default RestaurantHeader
