# Description

This project is a React application made during the Innovation Project course for Nokia. It is meant to be used internally by Nokia employees. The functionalities of this application are to view the daily menu for Nokia One, Dreams Cafe and Metropolia campus restaurants. Occupancy data (currently faked) are also available for Nokia One. Informtaion about other restaurants within a 2 km radius is also one of the core functionalities. The app also supports directions and instructions to other restaurants.

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

## Deploy to server

Dunno how to do dis

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
