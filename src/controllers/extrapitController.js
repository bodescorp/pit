const connection = require("../database/connection");

module.exports = {
  async create(request, response) {
    const { extra_id, descricao, pit_id } = request.body;
    const user_id = request.user_id;

    if (!pit_id) {
      return response.json("Crie seu pit primeiro");
    }

    if (!extra_id) {
      return response.json("Campos obrigatorios em branco");
    }

    const userCh = await connection("users")
      .join("work_regime", "regime_id", "=", "regime_trab_id")
      .select("ch_semanal")
      .where("chapa", user_id);

    const ativExtraExists = await connection("activities_extra")
      .where("extra_id", extra_id)
      .first();

    if (!ativExtraExists) {
      return response.json("Atividade não existe na nossa base de dados");
    }

    const activitiesUser = await connection("activities_pit_extra")
      .join(
        "activities_extra",
        "activities_extra.extra_id",
        "=",
        "activities_pit_extra.extra_id"
      )
      .join("users", "user_id", "=", "chapa")
      .select("activities_extra.ch_semanal")
      .where("user_id", user_id);

    let activitiesCh = 0;

    activitiesUser.map((atividade) => {
      activitiesCh += atividade.ch_semanal;
    });

    if (
      (userCh[0].ch_semanal =
        20 && activitiesCh + ativExtraExists.ch_semanal > 8)
    ) {
      return response.json(
        "Essa atividade ira exceder o Limite de Carga horaria "
      );
    }

    if (
      (userCh[0].ch_semanal =
        40 && activitiesCh + ativExtraExists.ch_semanal > 20)
    ) {
      return response.json(
        "Essa atividade ira exceder o Limite de Carga horaria "
      );
    }

    try {
      await connection("activities_pit_extra").insert({
        descricao,
        extra_id,
        pit_id,
        user_id,
      });
    } catch (error) {
      return response.json(
        " Erro ao cadastrar suas atividades extras entre em contato com o suporte"
      );
    }

    return response.json("Nova atividade inserida com Sucesso");
  },

  async index(request, response) {
    const activities_pit_extra = await connection(
      "activities_pit_extra"
    ).select("*");

    return response.json(activities_pit_extra);
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
