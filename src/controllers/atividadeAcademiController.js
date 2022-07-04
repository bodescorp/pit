const connection = require("../database/connection");

module.exports = {
  async create(request, response) {
    const { unidade_curricular, ch_semanal, curso_id, pit_id } = request.body;
    const user_id = request.user_id;

    if (!pit_id) {
      return response.json("Crie seu pit primeiro");
    }

    if (!unidade_curricular || !ch_semanal || !curso_id) {
      return response.json("Campos obrigatorios em branco");
    }

    const cursoExists = await connection("corses")
      .where("curso_id", curso_id)
      .first();

    if (!cursoExists) {
      return response.json("Curso não existe");
    }

    const userCh = await connection("users")
      .join("work_regime", "regime_id", "=", "regime_trab_id")
      .select("ch_semanal")
      .where("chapa", user_id);

    const activitiesUser = await connection("activities_teaching")
      .where("user_id", user_id)
      .andWhere("pit_id", pit_id);

    let activitiesCh = 0;

    activitiesUser.map((atividade) => {
      activitiesCh += atividade.ch_semanal;
    });

    if (userCh[0].ch_semanal === 20 && activitiesCh + ch_semanal > 12) {
      return response.json("Limite de Carga horaria Excedido ");
    }

    if (userCh[0].ch_semanal === 40 && activitiesCh + ch_semanal > 20) {
      return response.json("Limite de Carga horaria Excedido ");
    }

    try {
      await connection("activities_teaching").insert({
        unidade_curricular,
        ch_semanal,
        user_id,
        curso_id,
        pit_id,
      });
    } catch (error) {
      console.log(error);
      return response.json(
        " Erro ao cadastrar suas atividade Academica entre em contato com o suporte"
      );
    }

    return response.json("Nova atividade academica cadastrada com Sucesso");
  },

  async index(request, response) {
    const activities_teachings = await connection("activities_teaching").select(
      "*"
    );

    return response.json(activities_teachings);
  },

  async update(request, response) {
    const { academica_id } = request.params;
    const user_id = request.user_id;

    const { unidade_curricular, ch_semanal, curso_id } = request.body;

    const cursoExists = await connection("corses")
      .where("curso_id", curso_id)
      .first();

    if (!cursoExists) {
      return response.json("Curso não existe");
    }
    try {
      await connection("activities_teaching")
        .where("user_id", user_id)
        .andWhere("academica_id", academica_id)
        .update({
          unidade_curricular,
          ch_semanal,
          curso_id,
        });
    } catch (error) {
      console.log(error);
      return response.json(
        " Erro ao atualizar suas atividade Academica entre em contato com o suporte"
      );
    }

    return response.status(204).send();
  },

  async remove(request, response) {
    const { academica_id } = request.params;
    const user_id = request.user_id;

    await connection("activities_teaching")
      .where("academica_id", academica_id)
      .andWhere("user_id", user_id)
      .delete();

    return response.status(204).send();
  },
};
