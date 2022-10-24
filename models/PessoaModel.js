const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const pessoaSchema = Schema({
    codigo: Number,
    nome: String,
    idade: Number 
});

module.exports = mongoose.model("Pessoa", pessoaSchema);