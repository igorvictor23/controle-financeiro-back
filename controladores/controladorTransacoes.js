const Transacao = require('../modelo/modelos');

async function cadastrarTransacao(req,res) {
    try {
        const novaTransacao = await Transacao.create(req.body);
        return res.status(201).json(novaTransacao);
    } catch (error) {
        return res.status(400).json({message: "Erro ao cadastrar a Transação!", error: error.message});
    };
};


async function deletarTransacao(req,res) {
    try {
        const tarefaDeletada = await Transacao.findByIdAndDelete(req.params.id);
        if(!tarefaDeletada) {
            return res.status(404).json({message: "Transação não encontrada!"});
        };
        return res.status(200).json({message: "Transação deletada com sucesso!"});
    } catch (error) {
        return res.status(400).json({message: "Erro ao deletar a Transação!", error: error.message});
    };
};

async function atualizarTransacao(req,res) {
    try {
        const id = req.params.id;
        const novosDados = req.body;
        const tarefaAtualizada = await Transacao.findByIdAndUpdate(id,novosDados,{new: true});
        if(!tarefaAtualizada) {
            return res.status(404).json({message: "Transação não encontrada!"});
        }; 
        return res.status(200).json({message: "Transação atualizada com sucesso!"});

    } catch (error) {
        return res.status(400).json({message: "Erro ao atualizar a Transação!", error: error.message});
    };
};


async function mostrarTransacoes(req,res) {
    try {
        const filtro = {};
        const {descricao,tipo,valor} = req.query;

        if(descricao) {
            filtro.descricao = {$regex:descricao, $options: 'i' };
        };

        if(tipo) {
            filtro.tipo = tipo;       
        };

        if(valor) {
            filtro.valor = valor;
        };
        const transacoes = await Transacao.find(filtro);
        return res.status(200).json(transacoes);
    } catch (error) {
        return res.status(400).json({message: "Erro ao buscar as Transações!", error: error.message});
    };
};

async function mostrarTransacao(req,res) {
    try {
        const id = req.params.id;
        const transacao = await Transacao.findById(id);
        if(!Transacao) {
            return res.status(404).json({message: "Transação não encontrada!"});
        };
        return res.status(200).json(transacao);
    } catch (error) {
        return res.status(400).json({message: "Erro ao buscar a Transação!", error: error.message});
    };
};

async function calcularSaldo(req,res) {
    try {
        const receitas = await Transacao.find({tipo: 'receita'});
        const despesas = await Transacao.find({tipo: 'despesa'});
        const totalReceitas = receitas.reduce((acumulador, valorAtual)=> {
            return acumulador + valorAtual.valor;
        },0);
        const totalDespesas = despesas.reduce((acumulador, valorAtual) => {
            return acumulador + valorAtual.valor;
        },0);
        const saldo = totalReceitas - totalDespesas;
        return res.status(200).json({receitas:totalReceitas,despesas:totalDespesas,saldo: saldo});
        
    } catch (error) {
        return res.status(400).json({message: "Erro ao calcular o saldo!", error: error.message});
    };
};







module.exports = {
    cadastrarTransacao,
    deletarTransacao,
    atualizarTransacao,
    mostrarTransacoes,
    mostrarTransacao,
    calcularSaldo
}