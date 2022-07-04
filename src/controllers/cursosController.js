const connection = require("../database/connection");

module.exports = {
  async create(request, response) {
    const { nome } = request.body;

    if (!nome) {
      return response.json("Campos obrigatorios em branco");
    }

    const cursoExists = await connection("corses").where("nome", nome).first();

    if (cursoExists) {
      return response.json("Curso já existe");
    }

    try {
      await connection("corses").insert({
        nome,
      });
    } catch (error) {
      return response.json(
        " Erro ao criar novo curso entre em contato com o suporte"
      );
    }

    return response.json("Curso cadastrado com Sucesso");
  },

  async index(request, response) {
    const cursos = await connection("corses").select("*");

    return response.json(cursos);
  },

  async update(request, response) {
    const { corse_id } = request.params;

    const nome = request.body;

    const cursoExists = await connection("corses")
      .where("nome", nome)
      .whereNot("curso_id", corse_id)
      .first();

    if (cursoExists) {
      return response.json("Curso já existe");
    }
    await connection("corses").where("curso_id", corse_id).update(nome);

    return response.status(204).send();
  },

  async remove(request, response) {
    const { corse_id } = request.params;

    await connection("corses")
      .where("curso_id", corse_id)
      .delete();

    return response.status(204).send();
  },
};
