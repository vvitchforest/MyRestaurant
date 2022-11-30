import { React, useState } from 'react'
import PropTypes from 'prop-types'
import {
  ListItem,
  Box,
  Grid,
  Typography,
  Divider,
  IconButton,
  Alert
} from '@mui/material'
import InfoIcon from '@mui/icons-material/Info'
import CustomModal from '../components/CustomModal'
// import Notification from '../components/Notification'
import { useCookies } from 'react-cookie'

/**
 * @Author Irina Konovalova
 * Component showing menu item. Used in RestaurantMenu.
 * @param {string} menuItem dish name
 * @param {string} mealType menu item title
 * @param {string} price price of menu item
 * @param {string} dietInfo menu item's allergy info
 * @param {array} dietCodes diet codes of a menu item
 * @param {string} restaurantType whether a campus restaurant is of type sodexo or foodandco
 * @returns MenuItem component
 */

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
  const myLanguage = cookies.language ? cookies.language : 'en'
  const toggleModal = () => setModalOpen(!modalOpen)

  return (
    <>
      <ListItem sx={{ px: { xs: 2, sm: 5 } }}>
        <Box sx={{ width: '100%' }}>
          <Grid container sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Grid item xs>
              <Typography
                variant="subtitle"
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
                variant="subtitle"
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
                sx={{ fontSize: '1rem', pr: 1 }}
              >
                {menuItem}
              </Typography>
              <Typography
                color="text.secondary"
                variant="body2"
                sx={{ pt: 0.5 }}
              >
                {dietCodes?.join(', ')}
              </Typography>
            </Grid>
            <Grid item sx={{ flex: 1 }}>
              {restaurantType === 'sodexo' && (
                <IconButton color="info" onClick={toggleModal}>
                  <InfoIcon sx={{ height: '2.25rem', width: '2.25rem' }} />
                </IconButton>
              )}
            </Grid>
            <Grid item xs={12}>
              <Divider sx={{ mt: { xs: 0.5, sm: 1 } }}/>
            </Grid>
          </Grid>
        </Box>
      </ListItem>
      <CustomModal
        open={modalOpen}
        handleClose={() => setModalOpen(false)}
        title={myLanguage === 'en' ? 'Allergies' : 'Allergiat'}
      >
      {dietInfo
        ? <Typography>{dietInfo}</Typography>
        : <Alert severity='info'>{myLanguage === 'en' ? 'No allergies information to show.' : 'Ei näytettäviä allergiatietoja.'}</Alert>
      }
      </CustomModal>
    </>
  )
}

RestaurantMenuItem.propTypes = {
  menuItem: PropTypes.string,
  mealType: PropTypes.string,
  price: PropTypes.string,
  dietInfo: PropTypes.string,
  dietCodes: PropTypes.array,
  restaurantType: PropTypes.string
}
export default RestaurantMenuItem
