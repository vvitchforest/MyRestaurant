import React from 'react'
import { PropTypes } from 'prop-types'

import OutlinedInput from '@mui/material/OutlinedInput'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'

const FilterMenu = ({ filterValues, handleChange }) => {
  const ITEM_HEIGHT = 48
  const ITEM_PADDING_TOP = 8
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250
      }
    }
  }

  return (
    <div>
      <FormControl sx={{ m: 1, width: 250 }}>
        <InputLabel id="filter-label">Filter diets</InputLabel>
        <Select
          labelId="filter-label"
          id="filter"
          value={filterValues}
          onChange={handleChange}
          input={<OutlinedInput id="select-filter" label="Filter" />}
          MenuProps={MenuProps}
        >
          <MenuItem value='G'>Gluten free</MenuItem>
          <MenuItem value='M'>Milk free</MenuItem>
          <MenuItem value='L'>Lactose free</MenuItem>
        </Select>
      </FormControl>
    </div>
  )
}

FilterMenu.propTypes = {
  filterValues: PropTypes.string,
  handleChange: PropTypes.func
}
export default FilterMenu
