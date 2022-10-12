import { React, useState } from 'react'
import PropTypes from 'prop-types'
import {
  ListItem,
  Box,
  Grid,
  Typography,
  Divider,
  IconButton
} from '@mui/material'
import InfoIcon from '@mui/icons-material/Info'
import CustomModal from '../components/CustomModal'
import { useCookies } from 'react-cookie'

const RestaurantMenuItem = ({
  menuItem,
  mealType,
  price,
  dietInfo,
  dietCodes,
  restaurantType
}) => {
  const [cookies] = useCookies(['language'])
  const [modalOpen, setModalOpen] = useState(false)
  const toggleModal = () => setModalOpen(!modalOpen)

  return (
    <>
      <ListItem>
        <Box sx={{ width: '100%' }}>
          <Grid container sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Grid item xs>
              <Typography
                color="text.secondary"
                variant="h6"
                component="div"
                textTransform="uppercase"
              >
                {mealType}
              </Typography>
            </Grid>
            <Grid item>
              <Typography
                gutterBottom
                variant="subtitle2"
                component="div"
                sx={{ pt: 1 }}
              >
                {price}
              </Typography>
            </Grid>
          </Grid>

          <Typography color="text.primary" variant="body2">
            {menuItem}
          </Typography>
          <Grid
            container
            sx={{ display: 'flex', justifyContent: 'space-between' }}
          >
            <Grid item>
              <Typography
                color="text.secondary"
                variant="body2"
                sx={{ pt: 0.5 }}
              >
                {dietCodes}
              </Typography>
            </Grid>
            <Grid item>
              {restaurantType === 'sodexo' && (
                <IconButton color='info' onClick={toggleModal}>
                  <InfoIcon />
                </IconButton>
              )}
            </Grid>
          </Grid>
        </Box>
      </ListItem>
      <Divider variant="middle" />
      <CustomModal
        open={modalOpen}
        handleClose={() => setModalOpen(false)}
        title={cookies.language === 'en' ? 'Allergies' : 'Allergiat'}
      >
        <Typography>{dietInfo}</Typography>
      </CustomModal>
    </>
  )
}

RestaurantMenuItem.propTypes = {
  menuItem: PropTypes.string,
  mealType: PropTypes.string,
  price: PropTypes.string,
  dietInfo: PropTypes.string,
  dietCodes: PropTypes.string,
  restaurantType: PropTypes.string
}
export default RestaurantMenuItem
