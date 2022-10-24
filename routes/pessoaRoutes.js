const express = require("express");
const routes = express.Router();

const auth = require("../middlewares/usuarioAuth");

const pessoaController = require('../controllers/PessoaController');

routes.get("/pessoas/", auth, pessoaController.listar);
routes.get("/pessoas/relatorio", auth, pessoaController.relatorio);
routes.get("/pessoas/cadastrar/:codigo?", auth, pessoaController.cadastrar);
routes.post("/pessoas", auth, pessoaController.cadastrarPost);
routes.get("/pessoas/remover/:codigo", auth, pessoaController.remover);
routes.get("/pessoas/:codigo", auth, pessoaController.detalhar);

module.exports = routes;