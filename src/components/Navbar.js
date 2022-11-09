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
import { RiMenu2Line } from 'react-icons/ri'
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
import { green } from '@mui/material/colors'

/**
 * @Author Irina Konovalova, Oskar Wiiala
 * @returns Component for navigating between pages of the app
 */

const Navbar = () => {
  const [cookies, setCookie] = useCookies(['language'])
  const language = cookies.language ? cookies.language : 'en'
  const [alignment, setAlignment] = useState(
    language
  )
  const [openDrawer, setOpenDrawer] = useState(false)
  const [position, setPosition] = useState({ position: 'relative' })
  const dispatch = useDispatch()

  const navbarScrollStyle = {
    position: 'fixed',
    top: '0',
    animation: 'slide-in 500ms'
  }

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
  }, [])

  const handleDrawerToggle = () => {
    setOpenDrawer(!openDrawer)
  }

  const ToggleButton = styled(MUIToggleButton)({
    '&.Mui-selected, &.Mui-selected:hover': {
      color: 'white',
      backgroundColor: green[500]
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

  useEffect(() => {
    window.addEventListener('scroll', stickNavbar)
    return () => {
      window.removeEventListener('scroll', stickNavbar)
    }
  }, [scroll])

  const stickNavbar = () => {
    if (window !== undefined) {
      const windowHeight = window.scrollY
      windowHeight > 50 ? setPosition(navbarScrollStyle) : setPosition({ position: 'relative' })
    }
  }
  return (
    <>
      <AppBar style={position} elevation={2}
        sx={{ backgroundColor: 'RGBA(255, 255, 255, 0.7)', backdropFilter: 'blur(15px)' } }>
        <Toolbar
          sx={{
            display: 'flex',
            justifyContent: { xs: 'flex-start', md: 'space-between' },
            mx: { xs: 0, md: 5 }
          }}
        >
          <IconButton
            color='inherit'
            aria-label='open drawer'
            edge='start'
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { md: 'none' } }}
          >
            <RiMenu2Line color='black' />
          </IconButton>
          <Typography
            color={green[500]}
            fontWeight='bold'
            fontFamily= 'Roboto Mono'
            variant='h6'
            sx={{ textDecoration: 'none' }}
            component={Link}
            to='/'
          >
            MyRestaurant
          </Typography>
          <List sx={{ display: { xs: 'none', md: 'flex' }, ml: 'auto' }}>
            <NavItem
              text={getTranslation(
                language,
                'home'
              )}
              icon={<HomeIcon />}
              component={Link}
              to='/'
            />
            <NavItem
              text={getTranslation(
                language,
                'restaurants'
              )}
              icon={<RestaurantIcon />}
              component={Link}
              to='/restaurants'
            />
            <NavItem
              text={getTranslation(
                language,
                'map'
              )}
              icon={<MapIcon />}
              component={Link}
              to='/map'
            />
          </List>
          <ToggleButtonGroup
            sx={{ ml: { xs: 'auto', md: 5 }, borderRadius: '0.25rem' }}
            value={alignment}
            exclusive
            onChange={handleChange}
            aria-label='language'
          >
            <ToggleButton sx={{ color: 'black', fontFamily: 'Montserrat' }} value='en' >EN</ToggleButton>
            <ToggleButton sx={{ color: 'black', fontFamily: 'Montserrat' }} value='fi' border='none'>FI</ToggleButton>
          </ToggleButtonGroup>
        </Toolbar>
      </AppBar>
      { /* On small screen sizes, navigation links are displayed in a drawer */}
      <Drawer
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        variant='temporary'
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: { xs: '75%', sm: '50%' } }
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
          <List sx={{ '& a': { borderRadius: 0 } }}>
            <NavItem
              text={getTranslation(
                language,
                'home'
              )}
              icon={<HomeIcon />}
              component={Link}
              to='/'
              onClick={() => setOpenDrawer(false)}
            />
            <NavItem
              text={getTranslation(
                language,
                'restaurants'
              )}
              icon={<RestaurantIcon />}
              component={Link}
              to='/restaurants'
              onClick={() => setOpenDrawer(false)}
            />
            <NavItem
              text={getTranslation(
                language,
                'map'
              )}
              icon={<MapIcon />}
              component={Link}
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
