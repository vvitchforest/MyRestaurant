import React from 'react'
import { useCookies } from 'react-cookie'
import getTranslation from '../utils/Translations'

const RestaurantsList = () => {
  const [cookies] = useCookies(['language'])

  return (
    <div>
      <h1>
        {getTranslation(
          cookies.language ? cookies.language : 'en',
          'restaurants'
        )}
      </h1>
    </div>
  )
}
export default RestaurantsList
