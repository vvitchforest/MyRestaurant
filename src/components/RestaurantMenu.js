import React from 'react'
import PropTypes from 'prop-types'
import { List } from '@mui/material'
import RestaurantMenuItem from '../components/RestaurantMenuItem'

const RestaurantMenu = ({ menu }) => {
  return (
    <List>
       {Object.values(menu).map((item, index) => (
                <RestaurantMenuItem
                  key={index}
                  menuItem={item.title_fi}
                  mealType={item.category}
                  price={item.price}
                  dietInfo={Object.values(item.additionalDietInfo).map(
                    (allergen) => allergen
                  )}
                  dietCodes={item.recipes.hideAll.dietcodes}
                />
       ))}
    </List>
  )
}

RestaurantMenu.propTypes = {
  menu: PropTypes.object
}
export default RestaurantMenu
