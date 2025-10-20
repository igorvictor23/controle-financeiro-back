const express = require('express');
const authrouter = express.Router();
const controladorAutenticacao = require('../controladores/controladorAuth')

authrouter.post('/registro',controladorAutenticacao.registro);
authrouter.post('/login',controladorAutenticacao.login);




module.exports = authrouter;