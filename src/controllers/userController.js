const connection = require("../database/connection");
const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const sgMail = require("@sendgrid/mail");

require("dotenv").config();
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

module.exports = {
  async create(request, response) {
    const {
      chapa,
      nome,
      whatsApp,
      email,
      formacao,
      password,
      regime_id,
      titulacao_id,
    } = request.body;

    const email_token = crypto.randomBytes(64).toString("hex");

    const hashPassword = await bcrypt.hash(password, 8);

    const validadeEmail = /\S+@fsm+\.edu+\.(br+)?$/i;

    const msg = {
      to: email,
      from: "glaymar2010@live.com",
      subject: "verificação de email",
      text: `Ola ${nome}, obrigado por se registrar na plataforma de Plano Individual de Trabalho.
            link para copiar e colar para verificação de email
            http://localhost:3333/verify-email?email_token=${email_token}
        `,
      html: `
            <h1>Ola, ${nome}</h1>
            <p>obrigado por se registrar na plataforma de Plano Individual de Trabalho.</p>
            <p>Link para verificação de email</p>
            <a href="http://localhost:3333/verify-email?email_token=${email_token}"> Verifique seu conta</a>
        `,
    };

    if (
      !chapa ||
      !nome ||
      !whatsApp ||
      !email ||
      !formacao ||
      !password ||
      !regime_id ||
      !titulacao_id
    ) {
      return response.json("Campos obrigatorios em branco");
    }

    if (!validadeEmail.test(email)) {
      return response.json(
        "Email não existe no dominio da Santa Maria, utilize seu email institucional "
      );
    }

    const userExists = await connection("users").where("chapa", chapa).first();

    if (userExists) {
      return response
        .status(400)
        .json(
          "Usuario ja possui cadastro nessa plataforma, entre em contato com o suporte para resolver a situação"
        );
    }

    const regimeTrabExists = await connection("work_regime")
      .where("regime_trab_id", regime_id)
      .first();

    if (!regimeTrabExists) {
      return response.json("Regime de Trabalho não existe");
    }

    const titulacaoExists = await connection("titration")
      .where("titulacao_id", titulacao_id)
      .first();

    if (!titulacaoExists) {
      return response.json("Titulação não existe");
    }

    try {
      await connection("users").insert({
        chapa,
        nome,
        whatsApp,
        email,
        formacao,
        password: hashPassword,
        email_token: email_token,
        regime_id,
        titulacao_id,
      });
    } catch (error) {
      return response
        .status(400)
        .json(" Erro ao criar seu usuario entre em contato com o suporte");
    }

    try {
      sgMail.send(msg);
      return response.json(
        "email para verificação enviado, obrigado por se registrar"
      );
    } catch (error) {
      return response.json(error);
    }

    // return response.json('Usuario cadastrado verifique seu email para fazer login');
  },

  async index(request, response) {
    const users = await connection("users").select("*");
    return response.json(users);
  },

  async update(request, response) {
    const user_id = request.user_id;
    const {
      chapa,
      nome,
      whatsApp,
      email,
      formacao,
      password,
      regime_id,
      titulacao_id,
      adm,
    } = request.body;

    const hashPassword = await bcrypt.hash(password, 8);

    const titulacaoExists = await connection("titration")
      .where("titulacao_id", titulacao_id)
      .first();

    if (!titulacaoExists) {
      return response.json("Titulação não existe");
    }

    const regimeTrabExists = await connection("work_regime")
      .where("regime_trab_id", regime_id)
      .first();

    if (!regimeTrabExists) {
      return response.json("Regime de Trabalho não existe");
    }

    try {
      await connection("users").where("chapa", user_id).update({
        chapa,
        nome,
        whatsApp,
        email,
        formacao,
        password: hashPassword,
        regime_id,
        titulacao_id,
        adm,
      });
    } catch (error) {
      console.log(error);

      return response
        .status(400)
        .json(" Erro ao atualizar dados entre em contato com o suporte");
    }

    return response.status(204).send();
  },

  async remove(request, response) {
    const user_id = request.user_id;

    await connection("users").where("chapa", user_id).delete();

    return response.status(204).send();
  },
};
