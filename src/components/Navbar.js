import { React, useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Drawer,
  List,
  Box,
  Divider,
  ToggleButtonGroup,
  ToggleButton as MUIToggleButton,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import HomeIcon from "@mui/icons-material/Home";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import MapIcon from "@mui/icons-material/Map";
import { styled } from "@mui/material/styles";
import { useCookies } from "react-cookie";

import { Link } from "react-router-dom";

import NavItem from "./NavItem";

const Navbar = () => {
  const [cookies, setCookie, removeCookie] = useCookies(["language"]);
  const [alignment, setAlignment] = useState(
    cookies.language ? cookies.language : "en"
  );
  const [openDrawer, setOpenDrawer] = useState(false);

  const changeLanguage = (newName) => {
    console.log(`changeLanguage: ${newName}, cookies: ${cookies.language}`);
    if (newName != "fi" && newName != "en") {
      console.log("language not found. language set to en");
      setCookie("language", "en", { path: "/" });
    } else setCookie("language", newName, { path: "/" });
  };

  useEffect(() => {
    console.log("navbar useEffect runs");
    if (!cookies.language) {
      console.log("language not set. setting laguage to en");
      changeLanguage("en");
      handleChange("en");
    } else console.log("language already set");
  });

  const languages = [
    { code: "en", name: "English" },
    { code: "fi", name: "Finnish" },
  ];

  const translations = {
    en: {
      map: "Map",
      home: "Home",
      restaurants: "Restaurants",
    },
    fi: {
      map: "Kartta",
      home: "Koti",
      restaurants: "Ravintolat",
    },
  };

  const getTranslation = (lang, text) => {
    return translations[lang][text];
  };

  const handleDrawerToggle = () => {
    setOpenDrawer(!openDrawer);
  };

  const ToggleButton = styled(MUIToggleButton)({
    "&.Mui-selected, &.Mui-selected:hover": {
      color: "white",
      backgroundColor: "#42A5F5",
    },
  });

  const handleChange = (event, newAlignment) => {
    if (newAlignment) {
      console.log(`handleChange: ${newAlignment}`);
      setAlignment(newAlignment);
      changeLanguage(newAlignment);
    } else {
      console.log("handleChange else");
      setAlignment("en");
      changeLanguage("en");
    }
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: { xs: "flex-start", md: "space-between" },
          }}
        >
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { md: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            color="#ffffff"
            variant="h6"
            sx={{ textDecoration: "none" }}
            component={Link}
            to="/"
          >
            MyRestaurant
          </Typography>
          <ToggleButtonGroup
            sx={{
              marginLeft: "20px",
              marginRight: "20px",
              display: "flex",
              flex: 1,
              justifyContent: "flex-end",
            }}
            value={alignment}
            exclusive
            onChange={handleChange}
            aria-label="language"
          >
            <ToggleButton value="en">EN</ToggleButton>
            <ToggleButton value="fi">FI</ToggleButton>
          </ToggleButtonGroup>
          <List sx={{ display: { xs: "none", md: "flex" } }}>
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
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: "75%" },
        }}
      >
        <Box>
          <Box sx={{ display: "flex", justifyContent: "flex-end", p: 1 }}>
            <IconButton
              color="inherit"
              aria-label="close drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ display: { md: "none" } }}
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
  );
};
export default Navbar;
