const connection = require("../database/connection");

module.exports = {
  async create(request, response) {
    const { nome } = request.body;

    if (!nome) {
      return response.json("Campos obrigatorios em branco");
    }

    const titulacaoExists = await connection("titration")
      .where("nome", nome)
      .first();

    if (titulacaoExists) {
      return response.json("Titulação já existe");
    }

    try {
      await connection("titration").insert({
        nome,
      });
    } catch (error) {
      return response.json(
        " Erro ao criar nova Titulação entre em contato com o suporte"
      );
    }

    return response.json("Nova Titulação cadastrada com Sucesso");
  },

  async index(request, response) {
    const titulacoes = await connection("titration").select("*");

    return response.json(titulacoes);
  },
  async update(request, response) {
    const { titulacao_id } = request.params;

    const nome = request.body;

    const titulacaoExists = await connection("titration ")
      .where("nome", nome)
      .whereNot("titulacao_id", titulacao_id)
      .first();

    if (titulacaoExists) {
      return response.json("Titulação já existe");
    }
    await connection("titration ").where("titulacao_id", titulacao_id).update(nome);

    return response.status(204).send();
  },

  async remove(request, response) {
    const { titulacao_id } = request.params;

    await connection("titration").where("titulacao_id", titulacao_id).delete();

    return response.status(204).send();
  },
};
