const UsuarioModel = require("../models/UsuarioModel");
const bcryptjs = require("bcryptjs");

class UsuarioController{
    
    static async relatorio(req, res){
        const lista = await UsuarioModel.find();
        res.render("usuario/relatorio", {lista} );
    }
    
    static async login(req, res){
        const erro = req.query.e;
        res.render("usuario/login", {erro});
    }
    
    static async loginPost(req, res){
        const usuario = req.body;
        const resultado = await UsuarioModel.findOne({email: usuario.email});
        if(resultado){ // encontrou e-mail
            if(bcryptjs.compareSync(usuario.senha, resultado.senha)){ // senha confere
                req.session.usuario = resultado.email;
                res.redirect("/");
            } else{ // senha não confere
                res.redirect("/usuarios/login?e=1");
            }
        } else{ // e-mail não encontrado
            res.redirect("/usuarios/login?e=1");
        }
    }

    static async listar(req, res){
        const s = req.query.s;
        let mensagem;
        let cor;
        if (s == "1"){
            mensagem = "Cadastrado com sucesso";
            cor = "Green";
        } else if (s == "2"){
            mensagem = "Removido com sucesso";
            cor = "Red";
        } else if (s == "3"){
            mensagem = "Atualizado com sucesso";
            cor = "Yellow";
        }
        
        const lista = await UsuarioModel.find();
        res.render("usuario/listar", {lista, mensagem, cor} );
    }

    static async cadastrar(req, res){
        const email = req.params.email;
        const erro = req.query.e;
        let usuario = {};
        let escondido = "";
        // atualização
        if (email){
            usuario = await UsuarioModel.findOne({email: email});
            escondido = "hidden";
        }
        
        res.render("usuario/cadastrar", {usuario, escondido, erro});
    }

    static async cadastrarPost(req, res){
        const usuario = req.body;
        const salt = bcryptjs.genSaltSync();
        const hash = bcryptjs.hashSync(usuario.senha, salt);
        // atualização
        if (usuario.id){
            await UsuarioModel.findOneAndUpdate({email: usuario.email}, 
                {
                    nome: usuario.nome,
                    senha: hash
                });
            res.redirect("/usuarios?s=3");
        } else{ // cadastro
            const resultado = await UsuarioModel.findOne({email: usuario.email});
            if(resultado){ // e-mail já existe
                res.redirect("/usuarios/cadastrar?e=1");
            } else{
                const novoUsuario = new UsuarioModel({
                    email: usuario.email,
                    nome: usuario.nome,
                    senha: hash
                });
                await novoUsuario.save();
                res.redirect("/usuarios?s=1");
            }            
        }
    }

    static async detalhar(req, res){
        const email = req.params.email;
        const resultado = await UsuarioModel.findOne({email: email});
        res.render("usuario/detalhar", {resultado} );
    }

    static async remover(req, res){
        const email = req.params.email;
        const resultado = await UsuarioModel.findOneAndDelete({email: email});
        res.redirect("/usuarios?s=2");
    }

}

module.exports = UsuarioController;