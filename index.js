const express = require('express');
const app = express();
app.use(express.json());

const cors = require("cors");
app.use(cors());

const conexaoDB = require('./config/bancodedados');
conexaoDB();

const router = require('./rotas/rotasTransacao')
app.use('/transacoes', router);

const authrouter = require('./rotas/rotasAutenticacao')
app.use('/auth', authrouter);

const porta = 3000;
app.listen(porta, () => {
    console.log(`Servidor rodando na porta ${porta}`);
});


