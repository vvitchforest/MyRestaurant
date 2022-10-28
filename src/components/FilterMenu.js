import React from 'react'
import { PropTypes } from 'prop-types'
import {
  OutlinedInput,
  MenuItem,
  InputLabel,
  FormControl,
  Select,
  Box,
  Button
} from '@mui/material'

const FilterMenu = ({ filterValues, handleChange, clearFilter, clearButtonDisplay }) => {
  const ITEM_HEIGHT = 48
  const ITEM_PADDING_TOP = 8
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: { xs: '50%', sm: '25%' },
        background: 'rgba(255, 255, 255, 0.08)',
        backdropFilter: 'blur(15px)'
      }
    },
    MenuListProps: {
      style: {
        background: 'rgba(255, 255, 255, 0.08)'
      }
    }
  }

  return (
    <Box width='100%' display='flex' justifyContent='flex-start' sx={{ pl: { xs: 2, sm: 5 } }}>
      <FormControl sx={{ mt: 2, width: { xs: '50%', sm: '25%' }, '& svg': { color: '#1976d2' } }}>
        <InputLabel id="filter-label">Filter diets</InputLabel>
        <Select
          labelId="filter-label"
          id="filter"
          value={filterValues}
          onChange={handleChange}
          input={<OutlinedInput id="select-filter" label="Filter diets" />}
          MenuProps={MenuProps}
        >
          <MenuItem value="">Show all</MenuItem>
          <MenuItem value="G">Gluten free</MenuItem>
          <MenuItem value="M">Milk free</MenuItem>
          <MenuItem value="L">Lactose free</MenuItem>
        </Select>
      </FormControl>
      <Button size='small' onClick={clearFilter} sx={{ display: `${clearButtonDisplay}` }}>Clear</Button>
    </Box>

  )
}

FilterMenu.propTypes = {
  filterValues: PropTypes.string,
  handleChange: PropTypes.func,
  clearFilter: PropTypes.func,
  clearButtonDisplay: PropTypes.string
}
export default FilterMenu
