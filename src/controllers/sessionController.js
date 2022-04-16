const connection = require('../database/connection');

const login = async(request, response) => {
    const { email } = request.body;

    const user = await connection('users')
        .where('email', email)
        .select('nome')
        .first();

    if (user) {
        return response.json(user);
    };

    return response.json({ error: 'usuario nao encontrado'});

};

module.exports = {
    login
}