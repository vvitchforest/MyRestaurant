import React from 'react'
import { PropTypes } from 'prop-types'
import {
  OutlinedInput,
  MenuItem,
  InputLabel,
  FormControl,
  Select,
  Box,
  Button,
  Checkbox,
  ListItemText
} from '@mui/material'
import { useCookies } from 'react-cookie'
import getTranslation from '../utils/Translations'

/**
 * Filtering lunch menu of campus restaurants by diet code. Used in RestaurantSection component.
 * @Author Irina Konovalova
 * @param {string} filterValue value of selected filter option
 * @param {function} handleChange handles change of selected filter value
 * @param {function} clearFilter handles resetting filter
 * @param {string} clearButtonDisplay display of clear filter Button (none if filter is empty)
 * @param {string} restaurantType whether restaurant is of type sodexo or foodandco
 * @returns Component that filters lunch menu by diet type
 */

const FilterMenu = ({
  filterValue,
  handleChange,
  clearFilter,
  clearButtonDisplay,
  restaurantType
}) => {
  const [cookies] = useCookies(['language'])
  const myLanguage = cookies.language ? cookies.language : 'en'

  const ITEM_HEIGHT = 48
  const ITEM_PADDING_TOP = 8
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: { xs: '50%', sm: '25%' }
      }
    }
  }

  const dietCodes = [
    {
      code: 'G',
      name: getTranslation(myLanguage, 'glutenFree')
    },
    {
      code: 'M',
      name: getTranslation(myLanguage, 'milkFree')
    },
    {
      code: 'L',
      name: getTranslation(myLanguage, 'lactoseFree')
    },
    {
      code: 'VL',
      name: getTranslation(myLanguage, 'lowLactose')
    }
  ]

  const dietCodesToShow = restaurantType === 'sodexo'
    ? dietCodes
    : dietCodes.concat({ code: 'Veg', name: getTranslation(myLanguage, 'vegan') })

  return (
    <Box
      width="100%"
      display="flex"
      justifyContent="flex-start"
      sx={{
        pl: { xs: 2, sm: 5 },
        '& .MuiSelect-select': { p: 1.25 },
        '& .MuiInputLabel-formControl': { lineHeight: '0.8em' }
      }}
    >
      <FormControl
        sx={{
          mt: 2,
          width: { xs: '60%', sm: '30%' },
          '& svg': { color: 'primary' }
        }}
      >
        <InputLabel id="filter-label">
          {getTranslation(myLanguage, 'filter')}
        </InputLabel>
        <Select
          labelId="filter-label"
          id="filter"
          multiple
          value={filterValue}
          onChange={handleChange}
          input={
            <OutlinedInput
              id="select-filter"
              label={getTranslation(myLanguage, 'filter')}
            />
          }
          renderValue={(selected) => selected.join(', ')}
          MenuProps={MenuProps}
        >
          {dietCodesToShow.map((dietCode) => (
            <MenuItem key={dietCode.code} value={dietCode.code}>
              <Checkbox checked={filterValue.indexOf(dietCode.code) > -1} />
              <ListItemText>{dietCode.name}</ListItemText>
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Box
        height="inherit"
        display="flex"
        alignItems="flex-end"
        sx={{ ml: 0.5 }}
      >
        <Button
          variant="outlined"
          onClick={clearFilter}
          sx={{ display: `${clearButtonDisplay}`, py: 1 }}
        >
          {getTranslation(myLanguage, 'clearFilter')}
        </Button>
      </Box>
    </Box>
  )
}

FilterMenu.propTypes = {
  filterValue: PropTypes.array,
  handleChange: PropTypes.func,
  clearFilter: PropTypes.func,
  clearButtonDisplay: PropTypes.string,
  restaurantType: PropTypes.string
}
export default FilterMenu
