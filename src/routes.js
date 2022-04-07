const express = require('express');

const connection = require('./database/connection');

const routes = express.Router();

routes.get('/pit', async(request, response) => {
    return response.json('ola');
});


module.exports = routes;