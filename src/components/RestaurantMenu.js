import React from 'react'
import PropTypes from 'prop-types'
import { List } from '@mui/material'
import RestaurantMenuItem from '../components/RestaurantMenuItem'

const RestaurantMenu = ({ menu, restaurantType }) => {
  if (restaurantType === 'sodexo') {
    return (
      <List>
        {Object.values(menu).map((item, index) => (
          <RestaurantMenuItem
            key={index}
            menuItem={item?.dish}
            mealType={item?.title}
            price={item?.price}
            dietInfo={item?.allergens}
            dietCodes={item?.diets}
            restaurantType={restaurantType}
          />
        ))}
      </List>
    )
  }

  if (restaurantType === 'foodandco') {
    return (
      <List>
        {Object.values(menu).map((item, index) => (
          <RestaurantMenuItem
            key={index}
            menuItem={item.dish}
            dietCodes={item.diets}
        />
        ))}
      </List>
    )
  }
}

RestaurantMenu.propTypes = {
  menu: PropTypes.object.isRequired,
  restaurantType: PropTypes.string.isRequired
}
export default RestaurantMenu
