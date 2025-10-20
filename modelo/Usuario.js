const mongoose = require('mongoose');

const modeloUsuario = new mongoose.Schema({
    nome: {
        type: String,
        required: [true, 'O nome é obrigatório.'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'O email é obrigatório!'],
        unique: true,
        lowercase: true,
        trim: true
    }, 
    senha: {
        type: String,
        required: [true, 'A senha é obrigatória!'],
        minlength: [6, 'A senha deve ter no mínimo 6 caracteres!']
    }
});

module.exports = mongoose.model('Usuario', modeloUsuario);