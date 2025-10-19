const mongoose = require('mongoose');

const modeloTransacao = new mongoose.Schema({
    descricao: {
        type: String,
        required: true
    },
    valor: {
        type: Number,
        required: true
    },
    tipo: {
        type : String,
        enum: ['despesa', 'receita'],
        required: true
    },
    data: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Transacao', modeloTransacao);