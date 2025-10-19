const express = require('express');
const router = express.Router();

const controladorTransacoes = require('../controladores/controladorTransacoes');

router.post('/transacoes', controladorTransacoes.cadastrarTransacao);
router.delete('/transacoes/:id', controladorTransacoes.deletarTransacao);
router.put('/transacoes/:id', controladorTransacoes.atualizarTransacao);
router.get('/transacoes', controladorTransacoes.mostrarTransacoes);
router.get('/transacoes/resumo', controladorTransacoes.calcularSaldo);
router.get('/transacoes/:id', controladorTransacoes.mostrarTransacao);



module.exports = router;