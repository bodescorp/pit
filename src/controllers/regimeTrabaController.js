const connection = require("../database/connection");

module.exports = {
  async create(request, response) {
    const { descricao, ch_semanal } = request.body;
    const users_id = request.headers.authorization;

    if (!descricao || !ch_semanal) {
      return response.json("Campos obrigatorios em branco");
    }

    const regimeTrabExists = await connection("work_regime")
      .where("descricao", descricao)
      .first();

    if (regimeTrabExists) {
      return response.json("Regime de Trabalho já existe");
    }

    try {
      await connection("work_regime").insert({
        descricao,
        ch_semanal,
      });
    } catch (error) {
      return response.json(
        " Erro ao criar novo Regime de Trabalho entre em contato com o suporte"
      );
    }

    return response.json("Regime de Trabalho cadastrado com Sucesso");
  },

  async index(request, response) {
    const regimesTrab = await connection("work_regime").select("*");

    return response.json(regimesTrab);
  },
  async update(request, response) {
    const { regime_trab_id } = request.params;

    const { descricao, ch_semanal } = request.body;

    const regimeTrabExists = await connection("work_regime")
      .where("descricao", descricao)
      .whereNot("regime_trab_id", regime_trab_id)
      .first();

    if (regimeTrabExists) {
      return response.json("Curso já existe");
    }
    await connection("work_regime")
      .where("regime_trab_id", regime_trab_id)
      .update({ descricao, ch_semanal });

    return response.status(204).send();
  },

  async remove(request, response) {
    const { regime_trab_id } = request.params;

    await connection("work_regime")
      .where("regime_trab_id", regime_trab_id)
      .delete();

    return response.status(204).send();
  },
};
