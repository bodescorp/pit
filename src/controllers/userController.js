const crypto = require('crypto');
const connection = require('../database/connection');

const listUsers = async(request, response) => {
    const users = await connection('users').select('*');
    return response.json(users);
};

const createUsers = async(request, response) => {
    const { nome, whatsApp, email, formacao, titulacao, regime_trabalho } = request.body;

    const id = crypto.randomBytes(4).toString('HEX');

    await connection('users').insert({
        id,
        nome,
        whatsApp,
        email,
        formacao,
        titulacao,
        regime_trabalho
    });
    return response.json();
};

module.exports = {
    listUsers,
    createUsers
}