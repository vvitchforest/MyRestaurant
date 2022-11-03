import { React, useEffect, useState } from 'react'
import {
  AppBar,
  Toolbar,
  Typography,
  Drawer,
  List,
  Box,
  Divider,
  ToggleButtonGroup,
  ToggleButton as MUIToggleButton
} from '@mui/material'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import CloseIcon from '@mui/icons-material/Close'
import HomeIcon from '@mui/icons-material/Home'
import RestaurantIcon from '@mui/icons-material/Restaurant'
import MapIcon from '@mui/icons-material/Map'
import { styled } from '@mui/material/styles'
import { useCookies } from 'react-cookie'
import getTranslation from '../utils/Translations'

import { Link } from 'react-router-dom'

import NavItem from './NavItem'
import { useDispatch } from 'react-redux'
import * as actions from '../store/actions/index'

const Navbar = () => {
  const [cookies, setCookie] = useCookies(['language'])
  const language = cookies.language ? cookies.language : 'en'
  const [alignment, setAlignment] = useState(
    language
  )
  const [openDrawer, setOpenDrawer] = useState(false)
  const dispatch = useDispatch()

  const changeLanguage = (newName) => {
    if (newName !== 'fi' && newName !== 'en') {
      setCookie('language', 'en', { path: '/' })
    } else setCookie('language', newName, { path: '/' })
  }

  useEffect(() => {
    console.log('navbar useEffect runs')
    if (!cookies.language) {
      changeLanguage('en')
      handleChange('en')
    } else console.log('language already set')
  })

  const handleDrawerToggle = () => {
    setOpenDrawer(!openDrawer)
  }

  const ToggleButton = styled(MUIToggleButton)({
    '&.Mui-selected, &.Mui-selected:hover': {
      color: 'white',
      backgroundColor: '#42A5F5'
    }
  })

  const handleChange = (event, newAlignment) => {
    if (newAlignment) {
      setAlignment(newAlignment)
      changeLanguage(newAlignment)
      dispatch(actions.setLanguage(newAlignment))
    } else {
      setAlignment('en')
      changeLanguage('en')
      dispatch(actions.setLanguage('en'))
    }
  }

  return (
    <>
      <AppBar position='static'>
        <Toolbar
          sx={{
            display: 'flex',
            justifyContent: { xs: 'flex-start', md: 'space-between' }
          }}
        >
          <IconButton
            color='inherit'
            aria-label='open drawer'
            edge='start'
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { md: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            color='#ffffff'
            variant='h6'
            sx={{ textDecoration: 'none' }}
            component={Link}
            to='/'
          >
            MyRestaurant
          </Typography>
          <ToggleButtonGroup
            sx={{
              marginLeft: '20px',
              marginRight: '20px',
              display: 'flex',
              flex: 1,
              justifyContent: 'flex-end'
            }}
            value={alignment}
            exclusive
            onChange={handleChange}
            aria-label='language'
          >
            <ToggleButton sx={{ color: 'white' }} value='en'>EN</ToggleButton>
            <ToggleButton sx={{ color: 'white' }} value='fi'>FI</ToggleButton>
          </ToggleButtonGroup>
          <List sx={{ display: { xs: 'none', md: 'flex' } }}>
            <NavItem
              text={getTranslation(
                language,
                'home'
              )}
              icon={<HomeIcon />}
              link={Link}
              to='/'
            />
            <NavItem
              text={getTranslation(
                language,
                'restaurants'
              )}
              icon={<RestaurantIcon />}
              link={Link}
              to='/restaurants'
            />
            <NavItem
              text={getTranslation(
                language,
                'map'
              )}
              icon={<MapIcon />}
              link={Link}
              to='/map'
            />
          </List>
        </Toolbar>
      </AppBar>
      <Drawer
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        variant='temporary'
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: '75%' }
        }}
      >
        <Box>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 1 }}>
            <IconButton
              color='inherit'
              aria-label='close drawer'
              edge='start'
              onClick={handleDrawerToggle}
              sx={{ display: { md: 'none' } }}
            >
              <CloseIcon />
            </IconButton>
          </Box>
          <Typography variant='h6' sx={{ flexGrow: 1, pl: 2, pb: 1 }}>
            MyRestaurant
          </Typography>
          <Divider />
          <List>
            <NavItem
              text={getTranslation(
                language,
                'home'
              )}
              icon={<HomeIcon />}
              link={Link}
              to='/'
              onClick={() => setOpenDrawer(false)}
            />
            <NavItem
              text={getTranslation(
                language,
                'restaurants'
              )}
              icon={<RestaurantIcon />}
              link={Link}
              to='/restaurants'
              onClick={() => setOpenDrawer(false)}
            />
            <NavItem
              text={getTranslation(
                language,
                'map'
              )}
              icon={<MapIcon />}
              link={Link}
              to='/map'
              onClick={() => setOpenDrawer(false)}
            />
          </List>
        </Box>
      </Drawer>
    </>
  )
}
export default Navbar
