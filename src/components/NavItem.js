import React from 'react'
import PropTypes from 'prop-types'
import { ListItem, ListItemText } from '@mui/material'
import { useLocation } from 'react-router-dom'
import { green } from '@mui/material/colors'

/**
 * @Author Irina Konovalova
 * @param {string} text text shown in link button
 * @param {element} icon icon shown in link button
 * @param {object} component React Router Link
 * @param {string} to path to route
 * @param {function} onClick handle close navigation menu drawer when a link is clicked (on small screen size)
 * @returns Navigation link item component used in Navbar component.
 */

const NavItem = ({ text, icon, component, to, onClick }) => {
  const location = useLocation()
  return (
    <ListItem
      button
      variant='navlink'
      component={component}
      to={to}
      onClick={onClick}
      selected={to === location.pathname}
      sx={{
        '&.Mui-selected':
      { backgroundColor: { xs: green[100], md: green[500] }, color: { xs: 'black', md: 'white' } },
        '&.Mui-selected:hover': { md: { backgroundColor: green[600] } }
      }}
    >
      {icon}
      <ListItemText sx={ { ml: 1 } }>{text}</ListItemText>
    </ListItem>
  )
}

NavItem.propTypes = {
  text: PropTypes.string.isRequired,
  icon: PropTypes.element,
  component: PropTypes.object,
  to: PropTypes.string.isRequired,
  onClick: PropTypes.func
}

export default NavItem
