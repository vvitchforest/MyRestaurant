const translations = {
  en: {
    map: 'Map',
    home: 'Home',
    restaurants: 'Restaurants'
  },
  fi: {
    map: 'Kartta',
    home: 'Koti',
    restaurants: 'Ravintolat'
  }
}

const getTranslation = (lang, text) => {
  return translations[lang][text]
}

export default getTranslation
