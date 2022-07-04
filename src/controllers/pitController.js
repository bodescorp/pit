const connection = require("../database/connection");

module.exports = {
  async create(request, response) {
    const { semestre_id } = request.body;
    const user_id = request.user_id;

    if (!semestre_id) {
      return response.json("Campos obrigatorios em branco");
    }

    const semestreExists = await connection("semester")
      .where("semestre_id", semestre_id)
      .first();

    if (!semestreExists) {
      return response.json("Esse semestre ainda não esta disponivel");
    }

    const pitExists = await connection("pits")
      .where("semestre_id", semestre_id)
      .andWhere("user_id", user_id)
      .first();

    if (pitExists) {
      return response.json("Pit desse semestre ja esta cadastrado no sistema");
    }

    try {
      await connection("pits").insert({
        semestre_id,
        user_id,
      });
    } catch (error) {
      return response
        .status(400)
        .json(" Erro ao criar novo Pit entre em contato com o suporte");
    }

    return response.json("Novo Pit cadastrado com Sucesso");
  },

  async index(request, response) {
    const pits = await connection("pits").select("*");

    return response.json(pits);
  },

  // async update(request, response) {
  //   const { pit_extra_id } = request.params;

  //   const nome = request.body;

  //   const cursoExists = await connection("corses")
  //     .where("nome", nome)
  //     .whereNot("curso_id", corse_id)
  //     .first();

  //   if (cursoExists) {
  //     return response.json("Curso já existe");
  //   }
  //   await connection("corses").where("curso_id", corse_id).update(nome);

  //   return response.status(204).send();
  // },

  async remove(request, response) {
    const { pit_extra_id } = request.params;

    await connection("activities_pit_extra")
      .where("pit_extra_id", pit_extra_id)
      .delete();

    return response.status(204).send();
  },
};
