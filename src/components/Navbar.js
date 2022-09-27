import { React, useState } from 'react'
import {
  AppBar,
  Toolbar,
  Typography,
  Drawer,
  List,
  Box,
  Divider
} from '@mui/material'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import CloseIcon from '@mui/icons-material/Close'
import HomeIcon from '@mui/icons-material/Home'
import RestaurantIcon from '@mui/icons-material/Restaurant'
import MapIcon from '@mui/icons-material/Map'

import { Link } from 'react-router-dom'

import NavItem from './NavItem'

const Navbar = () => {
  const [openDrawer, setOpenDrawer] = useState(false)

  const handleDrawerToggle = () => {
    setOpenDrawer(!openDrawer)
  }

  return (
    <>
      <AppBar position="static">
        <Toolbar
          sx={{
            display: 'flex',
            justifyContent: { xs: 'flex-start', md: 'space-between' }
          }}
        >
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { md: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            color="#ffffff"
            variant="h6"
            sx={{ textDecoration: 'none' }}
            component={Link}
            to="/"
          >
            MyRestaurant
          </Typography>
          <List sx={{ display: { xs: 'none', md: 'flex' } }}>
            <NavItem text="Home" icon={<HomeIcon />} link={Link} to="/" />
            <NavItem
              text="Restaurants"
              icon={<RestaurantIcon />}
              link={Link}
              to="/restaurants"
            />
            <NavItem text="Map" icon={<MapIcon />} link={Link} to="/map" />
          </List>
        </Toolbar>
      </AppBar>
      <Drawer
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        variant="temporary"
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: '75%' }
        }}
      >
        <Box>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 1 }}>
            <IconButton
              color="inherit"
              aria-label="close drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ display: { md: 'none' } }}
            >
              <CloseIcon />
            </IconButton>
          </Box>
          <Typography variant="h6" sx={{ flexGrow: 1, pl: 2, pb: 1 }}>
            MyRestaurant
          </Typography>
          <Divider />
          <List>
            <NavItem
              text="Home"
              icon={<HomeIcon />}
              link={Link}
              to="/"
              onClick={() => setOpenDrawer(false)}
            />
            <NavItem
              text="Restaurants"
              icon={<RestaurantIcon />}
              link={Link}
              to="/restaurants"
              onClick={() => setOpenDrawer(false)}
            />
            <NavItem
              text="Map"
              icon={<MapIcon />}
              link={Link}
              to="/map"
              onClick={() => setOpenDrawer(false)}
            />
          </List>
        </Box>
      </Drawer>
    </>
  )
}
export default Navbar
