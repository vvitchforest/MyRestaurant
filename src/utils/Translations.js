/**
 * @Author Oskar Wiiala
 * All translations for the app should be put here
 * Currently supports English and Finnish
 */

const translations = {
  en: {
    null: 'null',
    undefined: 'undefined',
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
    menu: 'Lunch menu today',
    menuNull: 'There is no menu available for today.',
    menuError: 'Cannot get menu...',
    openinghours: 'Opening hours',
    choosetraveloption: 'Choose travel option',
    cancel: 'Cancel',
    day: 'Day',
    hours: 'Hours',
    unavailable: 'Unavailable',
    distance: 'Distance:',
    lessbusy: 'Less busy',
    busy: 'Busy',
    reviews: 'Reviews',
    only5: 'Only five of the latest reviews are shown',
    filter: 'Filter diets',
    clearFilter: 'Clear',
    glutenFree: 'Gluten free',
    lactoseFree: 'Lactose free',
    milkFree: 'Milk free',
    lowLactose: 'Low lactose',
    vegan: 'Vegan',
    showAll: 'Show all',
    noMeals: 'Cannot find any meals with this filter...',
    lunch: 'Lunch',
    restaurantsNearby: 'Other restaurants nearby',
    instructions: 'Instructions',
    steps: 'steps',
    showinstructions: 'Show instructions'
  },
  fi: {
    null: 'null',
    undefined: 'undefined',
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
    menu: 'Päivän lounas',
    menuNull: 'Tälle päivälle ei ole näytettävää ruokalistaa.',
    menuError: 'Ruokalistan latauksessa tapahtui virhe...',
    openinghours: 'Aukioloajat',
    choosetraveloption: 'Valitse matkavaihtoehto',
    cancel: 'Peru',
    day: 'Päivä',
    hours: 'Tunnit',
    unavailable: 'Ei saatavilla',
    distance: 'Etäisyys:',
    lessbusy: 'Ei ruuhkaa',
    busy: 'Ruuhkainen',
    reviews: 'Arvostelut',
    only5: 'Vain viisi viimeisintä arvostelua on näkyvissä',
    filter: 'Suodata ruokavalio',
    clearFilter: 'Poista',
    glutenFree: 'Gluteeniton',
    lactoseFree: 'Laktoositon',
    milkFree: 'Maidoton',
    lowLactose: 'Vähälaktoosinen',
    vegan: 'Vegaani',
    showAll: 'Näytä kaikki',
    noMeals: 'Tällä suodattimella ei löytynyt yhtään ruokalajia... ',
    lunch: 'Lounas',
    restaurantsNearby: 'Muut ravintolat lähellä',
    instructions: 'Ohjeet',
    steps: 'Askeleet',
    showinstructions: 'Näytä ohjeet'
  }
}

const getTranslation = (lang, text) => {
  return translations[lang || 'en'][text || 'null']
}

export default getTranslation
