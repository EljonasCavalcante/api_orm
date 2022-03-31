const { send } = require('express/lib/response')
const database = require('../models')

class PessoasController {
    //===Selecionar todos os usuários====
    static async pegaTodasPessoas(req, res) {
        try{
            const todasAsPessoas = await database.Pessoas.findAll()
            return res.status(200).json(todasAsPessoas)
        }catch(error) {
            return res.status(500).json(error.message)
        }
    }
    //===Selecionar UM USUÁRIO especifico====
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
    //===Criar um novo usuario=======
    static async criaPessoas(req, res) {
        const novaPessoa = req.body
        try {
            const novaPessoaCriada = await database.Pessoas.create(novaPessoa)
            return res.status(200).json(novaPessoaCriada)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }
    //===Atualizar um registro=======
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
    //====Deletar um resgistro=======
    static async apagaPessoa(req,res) {
        const { id } = req.params
        try {
            await database.Pessoas.destroy({ where: { id: Number(id) }})
            return res.status(200).json({mensagem: `id ${id} deletado`})
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }
        // Para visualizar a lógica
        //localhost:3000/pessoas/1/matricula/5
        //localhost:3000/pessoas/:estudanteId/matricula/:matriculaId
        //=== capturar uma matricula=========
    static async pegaUmaMatricula(req, res) {
        const { estudanteId, matriculaId } = req.params // pega matricula
        try {
            const umaMatricula = await database.Matriculas.findOne( {
                //Aqui seria a coluna na qual ele captura o dado
                // Vá id numero e depois vá em estudante_Id capture
                where: { 
                    id: Number(matriculaId),
                    estudante_id: Number(estudanteId)
                }
            })
            return res.status(200).json(umaMatricula)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }
    //===criar uma matricula Nova======
    //localhost:3000/pessoas/1/matricula
    //localhost:3000/pessoas/:estudanteId/matricula
    static async criaMatricula(req, res) {
        // pegar id da requisção
        const { estudanteId } = req.params 
        // escreve uma nova informa no corpo da req (...req.body) pegando o numero de id do estudante
        const novaMatricula = { ...req.body, estudante_id: Number(estudanteId) }
        try {
            const novaMatriculaCriada = await database.Matriculas.create(novaMatricula)
            return res.status(200).json(novaMatriculaCriada)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    //===Atualizar um MATRICULA=======
    //localhost:3000/pessoas/1/matricula/5
    //localhost:3000/pessoas/:estudanteId/matricula/:matriculaId
    static async atualizaMatricula(req, res) {
        const { estudanteId, matriculaId } = req.params
        const novasInfos = req.body
        try {
            await database.Matriculas.update(novasInfos, { 
            where: { 
                id: Number(matriculaId),
                estudante_id: Number(estudanteId) 
            }})
            const MatriculaAtualizada = await database.Matriculas.findOne( { 
                where: { 
                    id: Number(matriculaId) 
                }})
            return res.status(200).json(MatriculaAtualizada)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    } 
        // ===Paga matricula====
    static async apagaMatricula(req, res) {
        const { estudanteId, matriculaId } = req.params
        try {
            // (where) é importante para ele exclir local exato
            await database.Matriculas.destroy({
                 where: { 
                     id: Number(matriculaId) 
                 }})
            return res.status(200).json({ mensagem: `id ${matriculaId} deletado` })
    
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }
}

module.exports = PessoasController