const translations = {
  en: {
    map: 'Map',
    home: 'Home',
    restaurants: 'Restaurants',
    closed: 'Closed',
    open: 'Open',
    people: 'people',
    hourofday: 'hour of day',
    highaverage: 'high average',
    lowaverage: 'low average',
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
    people: 'ihmiset',
    hourofday: 'tunnit',
    highaverage: 'korkea keskiarvo',
    lowaverage: 'matala keskiarvo',
    restaurant: 'Ravintola',
    occupancy: 'Kävijät',
    menu: 'Päivän ruokalista'
  }
}

const getTranslation = (lang, text) => {
  return translations[lang][text]
}

export default getTranslation
