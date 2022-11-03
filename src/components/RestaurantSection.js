import React from 'react'
import PropTypes from 'prop-types'
import { Box, Card, Typography } from '@mui/material'
import { useCookies } from 'react-cookie'
import getTranslation from '../utils/Translations'
import RestaurantHeader from './RestaurantHeader'
import Moment from 'moment'
import 'moment/locale/fi'

const RestaurantSection = ({ name, address, postalcode, lunchTime, children }) => {
  const [cookies] = useCookies(['language'])
  const myLanguage = cookies.language ? cookies.language : 'en'
  Moment.locale(myLanguage)
  const currentDate = Moment().format('dddd DD-MM-YYYY')

  return (
    <Box display="flex" justifyContent="center" sx={ { pb: 6 }}>
      <Card
        elevation={3}
        sx={{ width: { xs: '100%', md: '75%', lg: '60%' }, mb: 2, mt: 0.5 }}>
        <RestaurantHeader name={name} address={address} postalcode={postalcode} lunchTime={lunchTime}/>
        <Typography variant="h5" sx={{ pl: { xs: 2, sm: 5 } }}>
              {getTranslation(myLanguage, 'menu')}
        </Typography>
        <Typography sx={{ pl: { xs: 2, sm: 5 }, textTransform: 'capitalize' }}>
                {currentDate}
        </Typography>
        {children}
      </Card>
    </Box>
  )
}

RestaurantSection.propTypes = {
  name: PropTypes.string,
  address: PropTypes.string,
  postalcode: PropTypes.string,
  lunchTime: PropTypes.string,
  children: PropTypes.node
}
export default RestaurantSection
