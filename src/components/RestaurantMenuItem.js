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
      <ListItem sx={{ pl: { xs: 2, sm: 5 } }}>
        <Box sx={{ width: '100%' }}>
          <Grid container sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Grid item xs>
              <Typography
                color="text.secondary"
                variant="subtitle2"
                component="div"
                textTransform="uppercase"
                fontSize="1.125rem"
              >
                {mealType}
              </Typography>
            </Grid>
            <Grid item>
              <Typography
                gutterBottom
                variant="subtitle2"
                component="div"
                fontSize="1rem"
              >
                {price}
              </Typography>
            </Grid>
          </Grid>

          <Grid
            container
            sx={{ display: 'flex', justifyContent: 'space-between' }}
          >
            <Grid item sx={{ flex: 8 }}>
              <Typography
                color="text.primary"
                variant="body2"
                sx={{ fontSize: '1rem' }}
              >
                {menuItem}
              </Typography>
              <Typography
                color="text.secondary"
                variant="body2"
                sx={{ pt: 0.5 }}
              >
                {dietCodes}
              </Typography>
            </Grid>
            <Grid item sx={{ flex: 1 }}>
              {restaurantType === 'sodexo' && (
                <IconButton color="info" onClick={toggleModal}>
                  <InfoIcon sx={{ height: '2.25rem', width: '2.25rem', pl: 2 }} />
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
