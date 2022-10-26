/**
 * @Author Oskar Wiiala
 * All translations for the app are here
 */

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
    ariapicturerestaurant: 'picture of the restaurant',
    restaurant: 'Restaurant',
    occupancy: 'Visitors',
    menu: 'Menu today',
    openinghours: 'Opening hours',
    choosetraveloption: 'Choose travel option',
    cancel: 'Cancel',
    day: 'Day',
    hours: 'Hours'
  },
  fi: {
    map: 'Kartta',
    home: 'Koti',
    restaurants: 'Ravintolat',
    closed: 'Suljettu',
    open: 'Avoinna',
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
    ariapicturerestaurant: 'kuva ravintolasta',
    restaurant: 'Ravintola',
    occupancy: 'Kävijät',
    menu: 'Päivän ruokalista',
    openinghours: 'Aukioloajat',
    choosetraveloption: 'Valitse matkavaihtoehto',
    cancel: 'Peru',
    day: 'Päivä',
    hours: 'Tunnit'
  }
}

const getTranslation = (lang, text) => {
  return translations[lang][text]
}

export default getTranslation
