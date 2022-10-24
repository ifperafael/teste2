const express = require("express");
const routes = express.Router();

const auth = require("../middlewares/usuarioAuth");

const usuarioController = require('../controllers/UsuarioController');

routes.get("/usuarios/", auth, usuarioController.listar);
routes.get("/usuarios/relatorio", auth, usuarioController.relatorio);
routes.get("/usuarios/cadastrar/:email?", usuarioController.cadastrar);
routes.post("/usuarios", auth, usuarioController.cadastrarPost);
routes.get("/usuarios/remover/:email", auth, usuarioController.remover);
routes.get("/usuarios/login", usuarioController.login);
routes.post("/usuarios/login", usuarioController.loginPost);
routes.get("/usuarios/:email", auth, usuarioController.detalhar);

module.exports = routes;