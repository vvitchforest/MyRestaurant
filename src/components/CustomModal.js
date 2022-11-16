import { React } from 'react'
import PropTypes from 'prop-types'
import { Dialog, Box, Typography } from '@mui/material'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'

/**
 * @Author Irina Konovalova
 * Modal for displaying any content. Used in RestaurantMenuItem component.
 * @param {any} children element for displaying modal content
 * @param {string} title modal heading
 * @param {boolean} open whether modal is open or not
 * @param {function} handleClose handles closing of modal
 * @returns custom modal component for displaying any content
 */

const CustomModal = ({ children, title, open, handleClose }) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      sx={{
        '& .MuiDialog-paper': {
          boxSizing: 'border-box',
          width: { xs: '100%', md: '50%' }
        }
      }}>
      <Box
        style={{ padding: '1rem 1.5rem', maxWidth: '100vw' }}>
        <Box style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h6">{title}</Typography>
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        {children}
      </Box>
    </Dialog>
  )
}

CustomModal.propTypes = {
  children: PropTypes.any,
  title: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired
}
export default CustomModal
