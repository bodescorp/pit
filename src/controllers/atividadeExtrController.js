const connection = require("../database/connection");

module.exports = {
  async create(request, response) {
    const { descricao, ch_semanal } = request.body;

    if (!descricao || !ch_semanal) {
      return response.json("Campos obrigatorios em branco");
    }

    const ativExtraExists = await connection("activities_extra")
      .where("descricao", descricao)
      .first();

    if (ativExtraExists) {
      return response.json("Atividade já existe");
    }

    try {
      await connection("activities_extra").insert({
        descricao,
        ch_semanal,
      });
    } catch (error) {
      return response.json(
        " Erro ao criar nova atividade extra entre em contato com o suporte"
      );
    }

    return response.json("atividade cadastrada com Sucesso");
  },

  async index(request, response) {
    const ativExtras = await connection("activities_extra").select("*");

    return response.json(ativExtras);
  },

  async remove(request, response) {
    const { activities_extra_id } = request.params;
    const user_id = request.user_id;

    const userAdm = await connection("users")
      .where("user_id", user_id)
      .andWhere("adm", true)
      .first();

    if (!userAdm) {
      return response.status(404).send("Você não tem permissao para fazer essa ação");
    }

    await connection("activities_extra")
      .where("extra_id", activities_extra_id)
      .delete();

    return response.status(204).send();
  },

  async update(request, response) {
    const { activities_extra_id } = request.params;

    const { descricao, ch_semanal } = request.body;

    const ativExtraExists = await connection("activities_extra")
      .where("descricao", descricao)
      .whereNot("extra_id", activities_extra_id)
      .first();

    if (ativExtraExists) {
      return response.json("Atividade já existe");
    }

    await connection("activities_extra")
      .where("extra_id", activities_extra_id)
      .update({ descricao, ch_semanal });

    return response.status(204).send();
  },
};
