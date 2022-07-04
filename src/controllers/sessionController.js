const { compare } = require('bcryptjs');
const { sign } = require('jsonwebtoken')
const connection = require('../database/connection');
require('dotenv').config();

module.exports = {
    async create(request, response) {
        const { chapa, password } = request.body

        const user = await connection('users')
            .where('chapa', chapa).andWhere('email_verificado', 1).first()

        if (!user) {
            return response.status(400).json({ error: "Usuario ainda não foi verificado" })
        }
        const passwordMach = await compare(password, user.password);

        if (!passwordMach) {
            return response.status(400).json({ error: "Email/senha incorreto" })
        }

        const token = sign({
            chapa: user.chapa,
        }, `${process.env.CHAVE_TOKEN}`, {
            expiresIn: '1d'
        });


        return response.json(token)
    }
}