const { send } = require('express/lib/response')
const database = require('../models')

class PessoasController {
    //Selecionar todos os dados
    static async pegaTodasPessoas(req, res) {
        try{
            const todasAsPessoas = await database.Pessoas.findAll()
            return res.status(200).json(todasAsPessoas)
        }catch(error) {
            return res.status(500).json(error.message)
        }
    }
    //Selecionar um usuário especifico
    static async pegaUmaPessoa(req, res) {
        const { id } = req.params
        try {
            const umaPessoa = await database.Pessoas.findOne( {
                where: { 
                    id: Number(id)
                }
            })
            return res.status(200).json(umaPessoa)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }
    // Criar um novo usuario
    static async criaPessoas(req, res) {
        const novaPessoa = req.body
        try {
            const novaPessoaCriada = await database.Pessoas.create(novaPessoa)
            return res.status(200).json(novaPessoaCriada)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }
    //Atualizar um registro
    static async atualizaPessoa(req, res) {
        const novasInfos = req.body
        const { id } = req.params
        try {
            await database.Pessoas.update(novasInfos, { where: { id: Number(id) }})
            const pessoaAtualizada = await database.Pessoas.findOne( { where: { id: Number(id)}})
            return res.status(200).json(pessoaAtualizada)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }
    //Deletar um resgistro
    static async apagaPessoa(req,res) {
        const { id } = req.params
        try {
            await database.Pessoas.destroy({ where: { id: Number(id) }})
            return res.status(200).json({mensagem: `id ${id} deletado`})
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

}

module.exports = PessoasController