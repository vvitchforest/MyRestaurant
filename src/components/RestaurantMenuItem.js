import React from 'react'
import PropTypes from 'prop-types'
import { ListItem, Box, Grid, Typography, Divider } from '@mui/material'

const RestaurantMenuItem = ({ menuItem, mealType, price, dietInfo, dietCodes }) => {
  return (
    <>
      <ListItem>
        <Box sx= {{ width: '100%' } }>
          <Grid container sx={ { display: 'flex', justifyContent: 'flex-end' }}>
            <Grid item xs>
              <Typography
                color="text.secondary"
                gutterBottom
                variant="h6"
                component="div"
                textTransform="uppercase"
              >
                {mealType}
              </Typography>
            </Grid>
            <Grid item>
              <Typography gutterBottom variant="subtitle2" component="div" sx= { { pt: 1 }}>
                {price}
              </Typography>
            </Grid>
          </Grid>
          <Typography color="text.primary" variant="body2">
            {menuItem}
          </Typography>
          <Typography color="text.secondary" variant="body2" sx={{ pt: 0.5 }}>
            Allergies: {dietInfo}
          </Typography>
          <Typography color="text.secondary" variant="body2" sx={{ pt: 0.5 }}>
            Dietcodes: {dietCodes}
          </Typography>
        </Box>
      </ListItem>
      <Divider variant="middle" />
    </>
  )
}

RestaurantMenuItem.propTypes = {
  menuItem: PropTypes.string,
  mealType: PropTypes.string,
  price: PropTypes.string,
  dietInfo: PropTypes.array,
  dietCodes: PropTypes.string
}
export default RestaurantMenuItem
