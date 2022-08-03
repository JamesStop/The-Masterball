# Hello and welcome to The Gitz Carlton
<img width="2038" alt="Screen Shot" src="assets/teamspage.png">

Here you will find...

## Getting Started/Installation Instructions:
### `Code`

Follow these links for the front-end:
[Website Link](https://cosmic-croissant-fd8656.netlify.app/), 
[Github Link](https://github.com/JamesStop/The-Masterball)</br>
and these links are for the back-end:
[API Link](https://the-link-cable.herokuapp.com/api/), 
[Github Link](https://github.com/JamesStop/The-Link-Cable)</br>
On each page, click on the green `Code` button and copy the link under the SSH tab.

### `git clone`

You will need two terminals to run both the back-end and front-end.

Within your front-end folder terminal, enter 'git clone' followed by the link you copied and then press 'enter'.

Within your back-end folder terminal, enter 'git clone' followed by the link you copied and then press 'enter'.

### Install Dependencies:

In your terminal, you will need to install the following dependencies for the front-end:

- `npm install`

In the other terminal, you will need to install the following dependencies for the back-end:

- `npm install`
- `npm i nodemon`
- `touch .env .gitignore`

For the Back end, fill in the ".env" file with text reading "DATABASE_URL=YOUR_URL_HERE" and replace the "YOUR_URL_HERE" part with a link to a mongodb url of your own.

To get the front-end working with your database url you will need to go through the front end and replace any instance of https://the-link-cable.herokuapp.com/ with http://localhost:1738/ .

### `npm start and nodemon`

Next you will need to run the front-end in your terminal by using the `npm start` command. 
Runs the app in the development mode.

To run the back-end, in your terminal use the `nodemon` command. 
Runs the app in the development mode.

### Technologies Used:

- React
- React Router 
- Heroku
- Axios
- Netlify
- Express
- MongoDB/Mongoose
- nodemon
- node.js
- react-draggable
- chart.js/react-chartjs-2

## Features and Description:

- This application is a pokemon team builder to display, create, delete, and edit teams and pokemon information for you're specific user.
- This application has get, create, update and delete functions for team and pokemon information, and has two post functions for user sign up and sign in. (full CRUD)
- All information is stored in a mongodb database updates in real time.
- This application is built with phone in mind while also being scalable to larger screens.

## Contribution Guidelines:

If you would like to add any contributes, simply 'fork' the project on the Github page by clicking on the `fork` link in the upper right. From there, follow the steps above starting with copying the `code` link. Please feel free to identify any bugs, propose improvements, and if you have any additional questions or recommendations, please feel free to make an issue request to either github repository.
