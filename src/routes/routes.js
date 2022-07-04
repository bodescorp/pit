const express = require("express");

const semestrerController = require("../controllers/semestreController");
const cursoController = require("../controllers/cursosController");
const titulacaoController = require("../controllers/titulacaoController");
const regimeTrabaController = require("../controllers/regimeTrabaController");
const atividadeExtrController = require("../controllers/atividadeExtrController");
const userController = require("../controllers/userController");
const verifyemailController = require("../controllers/VerifyemailController");
const SessionController = require("../controllers/sessionController");
const pitController = require("../controllers/pitController");
const ensinoacademicController = require("../controllers/atividadeAcademiController");
const extrapitController = require("../controllers/extrapitController");
const profilleController = require("../controllers/profileController");

const ensureAuthenticated = require("../middlewares/ensureAuthenticated");

const routes = express.Router();

// routes.post('/pit/sessions', login);

routes.post("/semestre", semestrerController.create);
routes.get("/semestres", semestrerController.index);
routes.put("/semestre/:semestre_id", semestrerController.update);
routes.delete("/semestre/:semestre_id", semestrerController.remove);

routes.post("/curso", cursoController.create);
routes.get("/cursos", cursoController.index);
routes.put("/cursos/:corse_id", cursoController.update);
routes.delete("/cursos/:corse_id", cursoController.remove);

routes.post("/titulacao", titulacaoController.create);
routes.get("/titulacoes", titulacaoController.index);
routes.put("/titulacao/:titulacao_id", titulacaoController.update);
routes.delete("/titulacao/:titulacao_id", titulacaoController.remove);

routes.post("/regime", regimeTrabaController.create);
routes.get("/regimes", regimeTrabaController.index);
routes.put("/regime/:regime_trab_id", regimeTrabaController.update);
routes.delete("/regime/:regime_trab_id", regimeTrabaController.remove);

routes.post("/extraclass", atividadeExtrController.create);
routes.get("/extraclass", atividadeExtrController.index);
routes.delete(
  "/extraclass/:activities_extra_id",
  atividadeExtrController.remove
);
routes.put("/extraclass/:activities_extra_id", atividadeExtrController.update);

routes.get("/users", userController.index);
routes.post("/user", userController.create);
routes.put("/user", ensureAuthenticated(), userController.update);
routes.delete("/user/delete", ensureAuthenticated(), userController.remove);

routes.post("/pit", ensureAuthenticated(), pitController.create);
routes.get("/pits", pitController.index);

routes.post(
  "/ensinoacademic",
  ensureAuthenticated(),
  ensinoacademicController.create
);
routes.get("/ensinoacademics", ensinoacademicController.index);
routes.put(
  "/ensinoacademic/:academica_id",
  ensureAuthenticated(),
  ensinoacademicController.update
);
routes.delete(
  "/ensinoacademic/:academica_id",
  ensureAuthenticated(),
  ensinoacademicController.remove
);

routes.post(
  "/pit/atividadextra",
  ensureAuthenticated(),
  extrapitController.create
);
routes.get("/pit/atividadextras", extrapitController.index);

routes.get("/pit/profile", ensureAuthenticated(), profilleController.pitsUser);
routes.get("/user/profile", ensureAuthenticated(), profilleController.infoMe);
routes.get(
  "/info/pit/:id_pit",
  ensureAuthenticated(),
  profilleController.showPit
);
routes.get(
  "/pit/info/:semestre",
  ensureAuthenticated(),
  profilleController.pit_semest
);

routes.get("/verify-email", verifyemailController.verifyEmail);

routes.post("/sessions", SessionController.create);

module.exports = routes;
