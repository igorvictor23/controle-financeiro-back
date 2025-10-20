// middlewares/authMiddleware.js

const jwt = require('jsonwebtoken');
const User = require('../modelo/Usuario'); // Precisamos do modelo User para verificar se o usuário ainda existe

/**
 * Middleware para proteger rotas que exigem autenticação.
 */
const protect = async (req, res, next) => {
    let token;

    // 1. Verifica se o token está no cabeçalho Authorization e começa com "Bearer"
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        try {
            // 2. Extrai o token (remove o "Bearer " do início)
            token = req.headers.authorization.split(' ')[1];

            // 3. Verifica se o token é válido usando a chave secreta
            //    (Precisaremos definir JWT_SECRET no .env!)
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // 4. Se válido, busca o usuário no banco pelo ID contido no token
            //    '-senha' exclui o campo senha da busca
            req.user = await User.findById(decoded.id).select('-senha');

            if (!req.user) {
                 // Caso o usuário tenha sido deletado depois que o token foi gerado
                 throw new Error('Usuário não encontrado.');
            }

            // 5. Token válido e usuário existe! Chama o próximo middleware/controlador
            next();

        } catch (error) {
            console.error('Erro na autenticação do token:', error);
            res.status(401).json({ message: 'Não autorizado, token falhou.' });
        }
    }

    // 6. Se não encontrou token no cabeçalho
    if (!token) {
        res.status(401).json({ message: 'Não autorizado, nenhum token encontrado.' });
    }
};

module.exports = { protect };