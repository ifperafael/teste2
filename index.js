const express = require("express");
const app = express();

const path = require('path');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static("public"));

require('dotenv/config');

const session = require("express-session");
app.use(session({
    secret: 'ifpe',
    saveUninitialized:false,
    resave: false 
}));

const auth = require("./middlewares/usuarioAuth");

const pessoaRoutes = require("./routes/pessoaRoutes");
app.use(pessoaRoutes);

const usuarioRoutes = require("./routes/usuarioRoutes");
app.use(usuarioRoutes);

// configurações de banco de dados
const mongoose = require("mongoose");
mongoose.connect(process.env.MONGO_URI);

app.get("/", auth, function(req, res){
    res.render("index");
});

app.use(function(req, res) {
    res.status(404).render("404");
});    

app.listen(process.env.PORT, function(){
    console.log("Servidor iniciado!");
});