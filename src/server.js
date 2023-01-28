'use strict';

// required packages
require('dotenv').config();
const express = require('express');
const cors = require('cors');


// setting up Express
const app = express();

// middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes

// route for proof-of-life
app.get('/', (request, response) => {
  response.status(200).send('Hello World!');
});

// route for catching all non-existing endpoints

app.get('*', (request, response) => {
  response.status(404).send('Not available');
});

module.exports = {
  server: app,
  start: port => {
    if (!port) { throw new Error ('No port provided.'); }
    app.listen(port, () => console.log(`Listening on ${port}`));
  },
};