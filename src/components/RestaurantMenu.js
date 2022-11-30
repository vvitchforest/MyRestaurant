import React from 'react'
import PropTypes from 'prop-types'
import { List } from '@mui/material'
import RestaurantMenuItem from '../components/RestaurantMenuItem'

/**
 * @Author Irina Konovalova
 * A component showing lunch menu of a campus restaurant. Used in RestaurantSection component.
 * @param {object} menu lunch menu of a campus restaurant
 * @param {string} restaurantType whether a restaurant is of type sodexo or foodandco
 * @returns a list of menu items
 */

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
            menuItem={item?.dish}
            dietCodes={item?.diets}
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
