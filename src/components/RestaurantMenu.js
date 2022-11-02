import React from 'react'
import PropTypes from 'prop-types'
import { List } from '@mui/material'
import RestaurantMenuItem from '../components/RestaurantMenuItem'
import { useCookies } from 'react-cookie'

const RestaurantMenu = ({ menu, restaurantType }) => {
  const [cookies] = useCookies(['language'])

  if (restaurantType === 'sodexo') {
    return (
      <List>
        {Object.values(menu).map((item, index) => (
          <RestaurantMenuItem
            key={index}
            menuItem={cookies.language === 'en' ? item?.title_en : item?.title_fi}
            mealType={item?.category}
            price={item?.price}
            dietInfo={item?.additionalDietInfo?.allergens}
            dietCodes={item?.recipes?.hideAll?.dietcodes}
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
