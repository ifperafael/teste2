const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const usuarioSchema = Schema({
    email: String,
    nome: String,
    senha: String 
});

module.exports = mongoose.model("Usuario", usuarioSchema);