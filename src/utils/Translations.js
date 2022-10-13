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
    monday: 'Monday',
    tuesday: 'Tuesday',
    wednesday: 'Wednesday',
    thursday: 'Thursday',
    friday: 'Friday',
    saturday: 'Saturday',
    sunday: 'Sunday',
    loadingrestaurants: 'Loading restaurants...',
    ariasettings: 'settings',
    ariapicturerestaurant: 'picture of the restaurant'
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
    monday: 'Maanantai',
    tuesday: 'Tiistai',
    wednesday: 'Keskiviikko',
    thursday: 'Torstai',
    friday: 'Perjantai',
    saturday: 'Lauantai',
    sunday: 'Sunnuntai',
    loadingrestaurants: 'Ladataan ravintoloita...',
    ariasettings: 'asetukset',
    ariapicturerestaurant: 'kuva ravintolasta'
  }
}

const getTranslation = (lang, text) => {
  return translations[lang][text]
}

export default getTranslation
