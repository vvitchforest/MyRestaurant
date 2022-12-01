# Link to app
https://users.metropolia.fi/~irinakon/my-restaurant

# Description

This project is a React application made during the Innovation Project course for Nokia. It is meant to be used internally by Nokia employees. The functionalities of this application are to view the daily menu for Nokia One, Dreams Cafe and Metropolia campus restaurants. Occupancy data (currently faked) are also available for Nokia One. Information about other restaurants within a 2 km radius is also one of the core functionalities. The app also supports directions and instructions to other restaurants with real-time location updates.

### Technologies used
APIs:  
  Google Places API  
  Google Maps JavaScript API  
  Google directions API  
  Sodexo API  
  Foodandco API  
   
 NPM packages:  
  "@emotion/react": "^11.10.4",  
  "@emotion/styled": "^11.10.4",  
  "@mui/icons-material": "^5.10.6",  
  "@mui/material": "^5.10.6",  
  "@react-google-maps/api": "^2.13.1",  
  "@reduxjs/toolkit": "^1.8.6",  
  "@testing-library/jest-dom": "^5.16.5",  
  "@testing-library/react": "^13.4.0",  
  "@testing-library/user-event": "^13.5.0",  
  "axios": "^0.27.2",  
  "classnames": "^2.3.2", <----------- not used but did not uninstall due to fears of pipeline bugs  
  "dayjs": "^1.11.6",  
  "devextreme": "22.1.5",  
  "devextreme-react": "22.1.5",  
  "focus-trap-react": "^10.0.0", <----------- not used but did not uninstall due to fears of pipeline bugs  
  "moment": "^2.29.4", <----------- not used but did not uninstall due to fears of pipeline bugs  
  "react": "^18.2.0",  
  "react-cookie": "^4.1.1",  
  "react-dom": "^18.2.0",  
  "react-icons": "^4.6.0",  
  "react-redux": "^8.0.4",  
  "react-router-dom": "^6.4.1",  
  "react-scripts": "^5.0.1",  
  "redux": "^4.2.0",  
  "redux-thunk": "^2.4.1",  
  "web-vitals": "^2.1.4"  
  
## Navigation

![appbar](https://github.com/vvitchforest/MyRestaurant/blob/master/public/appbar.png)

1. Button to home page
2. Navigation
3. Language selector
4. Dark/light mode selector

## Home page

![home](https://github.com/vvitchforest/MyRestaurant/blob/master/public/home.png)

1. Tab bar selection of restaurant
2. View opening hours by clicking dropdown
3. Occupancy data for restaurant. Only for Nokia One
4. Filter diets by selecting type in dropdown
5. View information, such as allergies
6. Button links to Restaurants-page

## Nearby restaurants as a list

![restaurants](https://github.com/vvitchforest/MyRestaurant/blob/master/public/restaurants.png)

1. Filter restaurants by selecting type in dropdown
2. Link to restaurant web-page if available
3. Amount of ratings. Click to see 5 latest reviews.
4. View opening hours by clicking dropdown

## Nearby restaurants in map

### Get nearby restaurants

![map1](https://github.com/vvitchforest/MyRestaurant/blob/master/public/map1.png)

1. User's current location
2. Restaurant (click icon to view the information of that restaurant)
3. Pan to user's current location and activate nearby restaurants search
4. Show directions instructions drawer (displays directions instructions of last restaurant with which directions have been requested to)

### View info about selected restaurant

![map2](https://github.com/vvitchforest/MyRestaurant/blob/master/public/map2.png)

1. Link to restaurant web-page if available
2. Click to display "get directions" modal

### Modal for handling directions fetch

![map3](https://github.com/vvitchforest/MyRestaurant/blob/master/public/map3.png)

1. Select desired method for getting directions by clicking any of the three icons
2. Accept/cancel directions fetch

### Map after directions fetch

![map4](https://github.com/vvitchforest/MyRestaurant/blob/master/public/map4.png)

1. User's current location (updates every 500 milliseconds) and starting location A
2. Click blue circle icon to display a popup of a specific instruction step, such as "turn left" or "board bus"
3. End location B
4. Click to view all directions instructions in a drawer, including start and end addresses, estimated time and distance of travel

## Installation and deploy to localhost:3000

1. Download code to desired location
2. Create .env file in top of file hierarchy (same level as src or public folders) with variables:
```
REACT_APP_GOOGLE_MAPS_API_KEY=<insert-your-google-maps-api-key-here>
REACT_APP_REVERSE_PROXY_URL=<insert-your-reverse-proxy-api-key-here>
```

Heroku app proxy url is only required for Dreams Cafe, so it is not necessary for overall app functionality.

Next, run
```
npm install
npm start
```

Congratulations, your app should now be up and running in localhost:3000

## link to folder structure and React Component diagram
https://drive.google.com/file/d/1zUceDf1e7FIFU9rJZZGua-fycjaOx2tX/view?usp=share_link

## Deploy to server

Go to file App.js and then add "basename" property to the Router component with your website base url (remember it might have to be shorter than the whole url)
Then, run code in terminal: 
```
npm run build
```
Move build contents to server  
Finally, if your server is Apache based, create a .htaccess file to your root folder structure with variables:
```
RewriteEngine on
RewriteCond %{REQUEST_FILENAME} -f [OR]
RewriteCond %{REQUEST_FILENAME} -d
RewriteRule ^ - [L]
RewriteRule ^ index.html [L]
```

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
