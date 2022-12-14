import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Box, Card, Typography, CircularProgress } from '@mui/material'
import { useCookies } from 'react-cookie'
import getTranslation from '../utils/Translations'
import RestaurantHeader from './RestaurantHeader'
import Notification from './Notification'
import FilterMenu from './FilterMenu'
import RestaurantMenu from './RestaurantMenu'
import dayjs from 'dayjs'
import 'dayjs/locale/fi'
import { useSodexoData } from '../hooks/useSodexoData'
import { useFoodAndCoData } from '../hooks/useFoodAndCoData'
import { BiSad } from 'react-icons/bi'
import { TbFaceIdError } from 'react-icons/tb'
import { useOpeningTimes } from '../hooks/useOpeningTimes'

/**
 * @Author Irina Konovalova
 * Section displaying all info and menu data of a campus restaurant. Used in Home page.
 * @param {string} name name of the campus restaurant
 * @param {string} address address of the campus restaurant
 * @param {string} postalcode postal code of the restaurant
 * @param {any} logo restaurant logo either sodexo or foodandco
 * @param {string} lunchTime lunch time at the restaurant
 * @param {string} restaurantType whether a restaurant is of type sodexo or foodandco
 * @param {string} id id of the restaurant
 * @returns section displaying restaurant info, menu and menu filter (& possible notifications)
 */

const RestaurantSection = ({ name, address, postalcode, logo, lunchTime, restaurantType, id }) => {
  const [cookies] = useCookies(['language'])
  const { menu, loading, error } = restaurantType === 'sodexo' ? useSodexoData(id) : useFoodAndCoData(id)
  const { openingHours, weeklyOpeningHours } = useOpeningTimes(name)
  const [filterDiet, setFilterDiet] = useState([])

  const myLanguage = cookies.language ? cookies.language : 'en'
  dayjs.locale(myLanguage)
  const currentDate = dayjs().format('dddd DD-MM-YYYY')

  /* Show unfiltered menu if filter is empty.
    Else show items in which diets array contains every diet that is filterDiet state */
  const menuToShow = !filterDiet.length
    ? menu
    : {
        ...Object.values(menu)?.filter((menuItem) =>
          filterDiet.every(diet => menuItem?.diets?.includes(diet)))
      }

  const handleFilterChange = (event) => {
    setFilterDiet(event.target.value)
  }

  if (loading) {
    return (
    <Box width='100%' height='92vh' display='flex' justifyContent='center' alignItems='center'>
      <CircularProgress/>
    </Box>)
  }

  let content

  /* If there is error in data fetch, show notification with appropriate message */
  if (error) content = <Notification alert={{ variant: 'error', message: getTranslation(myLanguage, 'menuError'), icon: <TbFaceIdError/> }} />

  /* If menu is null or undefined or empty, show notification with appropriate message */
  else if (!menu || !Object.keys(menu).length) content = <Notification alert={{ variant: 'info', message: getTranslation(myLanguage, 'menuNull') }} />

  /* If there is no error and menu is not null, undefined or empty object, show filter and menu list */
  else {
    content = (
      <>
        <FilterMenu
          filterValue={filterDiet}
          handleChange={handleFilterChange}
          clearFilter={() => setFilterDiet([])}
          clearButtonDisplay={!filterDiet.length ? 'none' : 'block'}
          restaurantType={restaurantType}
        />
          { filterDiet.length !== 0 && Object.keys(menuToShow).length === 0 &&
          <Notification alert={{ variant: 'info', message: getTranslation(myLanguage, 'noMeals'), icon: <BiSad/> }} />}
        <RestaurantMenu
          menu={menuToShow}
          restaurantType={restaurantType}
        />
      </>
    )
  }

  return (
    <Box display="flex" justifyContent="center" sx={ { pb: { xs: 2, sm: 4 } }}>
      <Card
        elevation={3}
        sx={{ width: { xs: '100%', md: '75%', lg: '60%' }, mt: 0.5 }}>
        <RestaurantHeader
          name={name}
          address={address}
          postalcode={postalcode}
          logo={logo}
          openStatus={openingHours}
          lunchTime={lunchTime}
          weeklyOpeningTimes={weeklyOpeningHours}
        />
        <Typography variant="subtitle2" fontSize="1.25rem" sx={{ pl: { xs: 2, sm: 5 } }}>
              {getTranslation(myLanguage, 'menu')}
        </Typography>
        <Typography sx={{ pl: { xs: 2, sm: 5 }, textTransform: 'capitalize' }}>
                {currentDate}
        </Typography>
        { content }
      </Card>
    </Box>
  )
}

RestaurantSection.propTypes = {
  name: PropTypes.string,
  address: PropTypes.string,
  postalcode: PropTypes.string,
  logo: PropTypes.any,
  lunchTime: PropTypes.string,
  restaurantType: PropTypes.string,
  id: PropTypes.string
}
export default RestaurantSection
