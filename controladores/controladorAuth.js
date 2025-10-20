const Usuario = require('../modelo/Usuario');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


exports.registro = async (req,res) => {
    try {
        const { nome , email, senha} = req.body;

        if(!nome || !email || !senha) {
            return res.status(400).json({message: "Por favor, preencha todos os campos!"});
        };

        const usuarioExistente = await Usuario.findOne({email: email});
        if (usuarioExistente) {
            return res.status(400).json({ message: 'Este email já está cadastrado.' });
        };

        const salt = await bcrypt.genSalt(10);
        const senhaHash = await bcrypt.hash(senha, salt);

        const novoUsuario = Usuario.create({
            nome : nome,
            email : email,
            senha: senhaHash
        });

        res.status(201).json({
            _id: novoUsuario._id,
            nome: novoUsuario.nome,
            email: novoUsuario.email
        });
    } catch (error) {
        return res.status(500).json({message: "Erro ao registrar o usuário!", error: error.message});
    };
};

exports.login = async (req, res) => {
    try {
        // 1. Pega email e senha do corpo da requisição
        const { email, senha } = req.body;

        // 2. Validação básica
        if (!email || !senha) {
            return res.status(400).json({ message: 'Por favor, forneça email e senha.' });
        }

        // 3. Procura o usuário no banco pelo email
        const usuario = await Usuario.findOne({ email: email });

        // 4. Se usuário NÃO existe OU a senha está INCORRETA...
        //    bcrypt.compare() retorna true se a senha bate com o hash, false caso contrário
        if (!usuario || !(await bcrypt.compare(senha, usuario.senha))) {
             // Usamos uma mensagem genérica por segurança (não dizer se foi o email ou a senha que errou)
            return res.status(401).json({ message: 'Email ou senha inválidos.' });
        }

        // 5. Se chegou aqui, o usuário existe E a senha está correta! Gerar o token.
        //    jwt.sign(payload, secret, options)
        const token = jwt.sign(
            { id: usuario._id }, // Payload: Informação que queremos guardar no token (o ID do usuário)
            process.env.JWT_SECRET, // A chave secreta que definimos no .env
            { expiresIn: '1d' } // Opções: Define a validade do token (ex: 1 dia)
        );

        // 6. Envia o token de volta para o cliente
        res.status(200).json({
            _id: usuario._id,
            nome: usuario.nome,
            email: usuario.email,
            token: token // O token JWT que o frontend vai precisar guardar
        });

    } catch (error) {
        // Erros inesperados no servidor
        res.status(500).json({ message: 'Erro ao fazer login.', error: error.message });
    }
};