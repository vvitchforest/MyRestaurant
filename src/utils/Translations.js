const translations = {
  en: {
    map: 'Map',
    home: 'Home',
    restaurants: 'Restaurants',
    closed: 'Closed',
    open: 'Open'
  },
  fi: {
    map: 'Kartta',
    home: 'Koti',
    restaurants: 'Ravintolat',
    closed: 'Suljettu',
    open: 'Avattu'
  }
}

const getTranslation = (lang, text) => {
  return translations[lang][text]
}

export default getTranslation
