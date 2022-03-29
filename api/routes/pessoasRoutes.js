const { Router } = require('express')
const PessoasController = require('../controllers/PessoaController')

const router = Router()

router.get('/pessoas', PessoasController.pegaTodasPessoas)
router.get('/pessoas/:id', PessoasController.pegaUmaPessoa)
router.post('/pessoas', PessoasController.criaPessoas)



module.exports = router