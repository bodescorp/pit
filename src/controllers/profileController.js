const connection = require("../database/connection");

module.exports = {
  async pitsUser(request, response) {
    const user_id = request.user_id;

    const pits = await connection("pits")
      .where("pits.user_id", user_id)
      .select("*");

    return response.json(pits);
  },
  async infoMe(request, response) {
    const user_id = request.user_id;
    try {
      const user = await connection("users")
        .innerJoin("titration", "titration.titulacao_id", "users.titulacao_id")
        .where("users.chapa", user_id)
        .select(
          "users.nome",
          "users.whatsApp",
          "users.email",
          "users.formacao",
          "titration.nome as titulação"
        );
      return response.json(user);
    } catch (error) {
      return response.json(error);
    }
  },

  async showPit(request, response) {
    const { id_pit } = request.params;
    const user_id = request.user_id;

    const atividades_ensino = await connection("activities_teaching")
      .innerJoin("corses", "corses.curso_id", "activities_teaching.curso_id")
      .where("user_id", user_id)
      .andWhere("pit_id", id_pit)
      .select("*");

    const atividades_extra = await connection("activities_pit_extra")
      .innerJoin(
        "activities_extra",
        "activities_extra.extra_id",
        "activities_pit_extra.extra_id"
      )
      .where("user_id", user_id)
      .andWhere("pit_id", id_pit)
      .select(
        "activities_pit_extra.pit_extra_id",
        "activities_extra.descricao as extra_nome",
        "activities_extra.ch_semanal",
        "activities_pit_extra.descricao as opcional"
        );

    return response.json({ atividades_ensino, atividades_extra });
  },

  async pit_semest(request, response) {
    const { semestre } = request.params;
    const user_id = request.user_id;

    const pit = await connection("pits")
      .where("user_id", user_id)
      .andWhere("semestre_id", semestre)
      .select("*");

    return response.json(pit);
  },
};
