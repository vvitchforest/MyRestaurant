/* eslint-disable react/prop-types */
import React from 'react'

import { ListItem, ListItemText } from '@mui/material'
import { useLocation } from 'react-router-dom'

const NavItem = ({ text, icon, link, to, onClick }) => {
  const location = useLocation()
  return (
    <ListItem
      button
      color="inherit"
      component={link}
      to={to}
      onClick={onClick}
      selected={to === location.pathname}
      sx={{ '&.Mui-selected': { backgroundColor: { xs: '#bbdefb', md: '#42a5f5' } } }}
    >
      {icon}
      <ListItemText sx={ { ml: 1 } }>{text}</ListItemText>
    </ListItem>
  )
}

export default NavItem
