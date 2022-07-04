const { verify } = require("jsonwebtoken");
require("dotenv").config();

module.exports = () => {
  return (request, response, next) => {
    const authToken = request.headers.authorization;

    if (!authToken) {
      return response
        .status(401)
        .send("Acesso negado, entre em contato com o suporte");
    }
    const [, token] = authToken.split(" ");

    try {
      const dados = verify(token, `${process.env.CHAVE_TOKEN}`);

      request.user_id = dados.chapa;
      
      return next();
    } catch (error) {
      return response
        .status(401)
        .send("Acesso negado, entre em contato com o suporte");
    }
  };
};
