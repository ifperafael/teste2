const PessoaModel = require("../models/PessoaModel");

class PessoaController{
    
    static async relatorio(req, res){
        const lista = await PessoaModel.find();
        res.render("pessoa/relatorio", {lista} );
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
        
        const lista = await PessoaModel.find();
        res.render("pessoa/listar", {lista, mensagem, cor} );
    }

    static async cadastrar(req, res){
        const cod = req.params.codigo;
        let pessoa = {};
        let escondido = "";
        // atualização
        if (cod){
            pessoa = await PessoaModel.findOne({codigo: cod});
            escondido = "hidden";
        }
        
        res.render("pessoa/cadastrar", {pessoa, escondido});
    }

    static async cadastrarPost(req, res){
        const pessoa = req.body;
        console.log(pessoa);
        // atualização
        if (pessoa.id){
            await PessoaModel.findOneAndUpdate({codigo: pessoa.codigo}, 
                {
                    nome: pessoa.nome,
                    idade: pessoa.idade
                });
            res.redirect("/pessoas?s=3");
        } else{ // cadastro
            const novaPessoa = new PessoaModel({
                codigo: pessoa.codigo,
                nome: pessoa.nome,
                idade: pessoa.idade
            });
            await novaPessoa.save();
            res.redirect("/pessoas?s=1");
        }
    }

    static async detalhar(req, res){
        const cod = req.params.codigo;
        const resultado = await PessoaModel.findOne({codigo: cod});
        res.render("pessoa/detalhar", {resultado} );
    }

    static async remover(req, res){
        const cod = req.params.codigo;
        const resultado = await PessoaModel.findOneAndDelete({codigo: cod});
        res.redirect("/pessoas?s=2");
    }

}

module.exports = PessoaController;