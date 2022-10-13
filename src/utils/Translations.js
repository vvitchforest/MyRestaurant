const translations = {
  en: {
    map: 'Map',
    home: 'Home',
    restaurants: 'Restaurants',
    closed: 'Closed',
    open: 'Open',
    restaurant: 'Restaurant',
    occupancy: 'Visitors',
    menu: 'Menu today'
  },
  fi: {
    map: 'Kartta',
    home: 'Koti',
    restaurants: 'Ravintolat',
    closed: 'Suljettu',
    open: 'Avattu',
    restaurant: 'Ravintola',
    occupancy: 'Kävijät',
    menu: 'Päivän ruokalista'
  }
}

const getTranslation = (lang, text) => {
  return translations[lang][text]
}

export default getTranslation
