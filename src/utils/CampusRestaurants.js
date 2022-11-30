import sodexoLogo from '../images/sodexo.jpg'
import foodandcoLogo from '../images/foodandco.png'

const campusRestaurants = [
  {
    id: '80',
    name: 'Nokia One',
    type: 'sodexo',
    address: 'Karakaari 7',
    postalcode: '02610 Espoo',
    logo: sodexoLogo,
    lunchTime: '11:00-13.30',
    diet_codes_explanation: {
      en: '(G) Gluten free, (L) Lactose free, (VL) Low lactose, (M) Milk-free',
      fi: '(G) Gluteeniton, (L) Laktoositon, (VL) Vähälaktoosinen, (M) Maidoton'
    },
    footer_text: {
      en: 'Changes in menus and ingredient information are possible. Persons with allergies are advised every time to check the suitability of the offered food choices to their diet at the restaurant.',
      fi: 'Muutokset ruokalistoilla ja tuoteselosteissa mahdollisia. Kehotamme allergisia henkilöitä aina tarkastamaan tarjotun ruuan soveltuvuus omaan ruokavalioon ravintolassa.'
    }
  },
  {
    id: '3202',
    name: 'Dreams Cafe',
    type: 'foodandco',
    address: 'Karaportti 4',
    postalcode: '02610 Espoo',
    logo: foodandcoLogo,
    lunchTime: '10.45-13.30',
    diet_codes_explanation: {
      en: '(G) Gluten free, (L) Lactose free, (VL) Low lactose, (M) Milk-free, (*) Comply with Finnish nutrition recommendations, (Veg) Suitable for vegans, (ILM) Low carbon footprint, (VS) Contains fresh garlic, (A) Contains allergens',
      fi: '(G) Gluteeniton, (L) Laktoositon, (VL) Vähälaktoosinen, (M) Maidoton, (*) Suomalaisten ravitsemussuositusten mukainen, (Veg) Soveltuu vegaaniruokavalioon, (ILM) Pieni hiilijalanjälki, (VS) Sis. tuoretta valkosipulia, (A) Sis. allergeeneja'
    },
    footer_text: {
      en: 'Changes in menus and ingredient information are possible. Persons with allergies are advised every time to check the suitability of the offered food choices to their diet at the restaurant.',
      fi: 'Muutokset ruokalistoilla ja tuoteselosteissa mahdollisia. Kehotamme allergisia henkilöitä aina tarkastamaan tarjotun ruuan soveltuvuus omaan ruokavalioon ravintolassa.'
    }
  },
  {
    id: '3208',
    name: 'Food & Co Metropolia',
    type: 'foodandco',
    address: 'Karakaarenkuja 6',
    postalcode: '02610 Espoo',
    logo: foodandcoLogo,
    lunchTime: '10.45-13.30',
    diet_codes_explanation: {
      en: '(G) Gluten free, (L) Lactose free, (VL) Low lactose, (M) Milk-free, (*) Comply with Finnish nutrition recommendations, (Veg) Suitable for vegans, (ILM) Low carbon footprint, (VS) Contains fresh garlic, (A) Contains allergens',
      fi: '(G) Gluteeniton, (L) Laktoositon, (VL) Vähälaktoosinen, (M) Maidoton, (*) Suomalaisten ravitsemussuositusten mukainen, (Veg) Soveltuu vegaaniruokavalioon, (ILM) Pieni hiilijalanjälki, (VS) Sis. tuoretta valkosipulia, (A) Sis. allergeeneja'
    },
    footer_text: {
      en: 'Changes in menus and ingredient information are possible. Persons with allergies are advised every time to check the suitability of the offered food choices to their diet at the restaurant.',
      fi: 'Muutokset ruokalistoilla ja tuoteselosteissa mahdollisia. Kehotamme allergisia henkilöitä aina tarkastamaan tarjotun ruuan soveltuvuus omaan ruokavalioon ravintolassa.'
    }
  }
]

export default campusRestaurants
