const connection = require("../database/connection");
const { update } = require("./userController");

module.exports = {
  async create(request, response) {
    const descricao = request.body;
    const users_id = request.headers.authorization;

    if (!descricao) {
      return response.json("Campo obrigatorios em branco");
    }

    const semestreExists = await connection("semester")
      .where("descricao", descricao)
      .first();

    if (semestreExists) {
      return response.json("semestre já existe");
    }

    try {
      await connection("semester").insert(descricao);
      return response.json("Semestre cadastrado com Sucesso");
    } catch (error) {
      return response.json(
        " Erro ao criar novo semestre entre em contato com o suporte"
      );
    }
  },

  async index(request, response) {
    const semestres = await connection("semester").select("*");

    return response.json(semestres);
  },

  async update(request, response) {
    const { semestre_id } = request.params;

    const descricao = request.body;

    const semestreExists = await connection("semester")
      .where("descricao", descricao)
      .whereNot("semestre_id", semestre_id)
      .first();

    if (semestreExists) {
      return response.json("Semestre já existe");
    }
    await connection("semester")
      .where("semestre_id", semestre_id)
      .update(descricao);

    return response.status(204).send();
  },
  async remove(request, response) {
    const { semestre_id } = request.params;

    await connection("semester").where("semestre_id", semestre_id).delete();

    return response.status(204).send();
  },
};
