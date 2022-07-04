const connection = require('../database/connection');

module.exports = {
    async verifyEmail(request, response) {
        const { email_token } = request.query
        try {
            const user = await connection('users').where('email_token', email_token)

            if (!user) {
                return response.status(400).json({ error: "Token invalido, entre em contato com o suporte" })
            }

            const verificado = await connection('users')
                .where('email_token', email_token)
                .update({
                    'email_token': null,
                    'email_verificado': true
                })
        } catch (error) {

        }


        return response.json("email verificado");
    }

}


