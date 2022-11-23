import React, { useContext, memo } from 'react'
import PropTypes from 'prop-types'
import { Chip } from '@mui/material'
import { useCookies } from 'react-cookie'
import getTranslation from '../utils/Translations'
import { ColorModeContext } from '../context/ColorModeContext'
import { getDesignTokens } from '../theme'

/**
 * @Author Irina Konovalova
 * For displaying whether a campus restaurant is open or closed.
 * Used in RestaurantHeader component.
 * @param {boolean} openStatus whether the restaurant is currently open or closed, from Google Places API
 * @returns Component for displaying whether a restaurant is open or closed
 */
const OpenStatus = ({ openStatus }) => {
  const [cookies] = useCookies(['language'])
  const myLanguage = cookies.language ? cookies.language : 'en'
  const { mode } = useContext(ColorModeContext)

  const chipColor = openStatus
    ? getDesignTokens(mode).palette.success.main
    : getDesignTokens(mode).palette.error.main

  const openOrClosed = openStatus ? 'open' : 'closed'

  return (
    <Chip
      label={`${getTranslation(myLanguage, openOrClosed)}`}
      sx={{ mt: 0.5, backgroundColor: chipColor }}
    />
  )
}

OpenStatus.propTypes = {
  openStatus: PropTypes.bool
}

export default memo(OpenStatus)
