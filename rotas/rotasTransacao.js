const express = require('express');
const router = express.Router();
const { protect } = require('../middlewares/authmiddlewares');
const controladorTransacoes = require('../controladores/controladorTransacoes');

router.use(protect); 

router.post('/', controladorTransacoes.cadastrarTransacao);
router.delete('/:id', controladorTransacoes.deletarTransacao);
router.put('/:id', controladorTransacoes.atualizarTransacao);
router.get('/', controladorTransacoes.mostrarTransacoes);
router.get('/resumo', controladorTransacoes.calcularSaldo);
router.get('/:id', controladorTransacoes.mostrarTransacao);



module.exports = router;