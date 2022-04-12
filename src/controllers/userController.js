const connection = require('../database/connection');

const getUsers = async(request, response) => {
    return response.json('ola');
};

module.exports = {
    getUsers
}