'use strict';


// required packages
require('dotenv').config();
const express = require('express');
const cors = require('cors');
// const port = process.env.PORT || 3002;

// importing the routes

const v2Routes = require('./routes/v2');
const authRoutes = require('../src/auth/router');

// setting up Express
const app = express();

//setting up Auth0
// const { auth } = require('express-openid-connect');

// const config = {
//   authRequired: false,
//   auth0Logout: true,
//   secret: 'a long, randomly-generated string stored in env',
//   baseURL: 'http://localhost:3000',
//   clientID: 'N4Ao9cJBmJUJuRrnPkVwRXamoNpirFDd',
//   issuerBaseURL: 'https://dev-rekbfmk2.us.auth0.com',
// };

// middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// auth router attaches /login, /logout, and /callback routes to the baseURL
// app.use(auth(config));

app.use('/api/v2',  v2Routes);
app.use(authRoutes);

// route for proof-of-life
app.get('/dashboard', (request, response) => {
  response.status(200).send('Dashboard proof!');
});

// app.get('/tickets', (request, response) => {
//   response.status(200).send('Ticket proof!');
// });

app.get('/teams', (request, response) => {
  response.status(200).send('Teams proof!');
});

// req.isAuthenticated is provided from the auth router
app.get('/', (request, response) => {
  response.status(200).send('HELLLLLLO world~');
  // res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
});

// route for catching all non-existing endpoints
app.get('*', (request, response) => {
  response.status(404).send('Not available');
});

// error handler
app.use((error, request, response, next)  => {
  response.status(500).send(error.message);
});

module.exports = {
  server: app,
  start: port => {
    if (!port) { throw new Error ('No port provided.'); }
    app.listen(port, () => console.log(`Listening on ${port}`));
  },
};