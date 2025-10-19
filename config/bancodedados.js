const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const conexaoDB = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URL);
        console.log('Conexão com o banco de dados realizada com sucesso!');
    } catch (error) {
        console.log('Erro ao conectar com o banco de dados:', error);
        process.exit(1);
    }
};

module.exports = conexaoDB;