import React from 'react'
import PropTypes from 'prop-types'
import { Box, Alert, Typography } from '@mui/material'

/**
 * Component for displaying notification to the user (e.g. when there is error in loading data).
 * Used in RestauratSection component.
 * @Author Irina Konovalova
 * @param {object} alert setting notification variant (color), icon and message
 * @returns Component that displays color coded notification with a custom icon and message
 */

const Notification = ({ alert }) => {
  return (
    <Box mt={2}>
      <Alert
        severity={alert.variant}
        icon={alert.icon}
        sx={{
          p: 2,
          m: { xs: 2, sm: 5 },
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: { xs: 'center', md: 'flex-start' },
          '& svg': { fontSize: '2.25rem' }
        }}
      >
        <Typography fontSize="1.25rem">{alert?.message}</Typography>
      </Alert>
    </Box>
  )
}

Notification.propTypes = {
  alert: PropTypes.object
}

export default Notification
