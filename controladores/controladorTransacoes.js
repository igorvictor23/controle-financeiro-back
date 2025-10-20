const Transacao = require('../modelo/Transacoes');

async function cadastrarTransacao(req,res) {
    try {
        const id = req.user.idUsuario;
        const dados = {...req.body,idUsuario: id}
        const novaTransacao = await Transacao.create(dados);
        return res.status(201).json(novaTransacao);
    } catch (error) {
        return res.status(400).json({message: "Erro ao cadastrar a Transação!", error: error.message});
    };
};


async function deletarTransacao(req,res) {
    try {
        const id = req.user.idUsuario;
        const transacao = req.params.id;
        const tarefaDeletada = await Transacao.findOneAndDelete({_id: transacao, idUsuario: id});
        if(!tarefaDeletada) {
            return res.status(404).json({ message: "Transação não encontrada ou você não tem permissão para deletá-la!" });
        };
        return res.status(200).json({message: "Transação deletada com sucesso!"});
    } catch (error) {
        return res.status(400).json({message: "Erro ao deletar a Transação!", error: error.message});
    };
};

async function atualizarTransacao(req, res) {
    try {
        const userId = req.user.id; 
        const idTransacao = req.params.id;
        const novosDados = req.body;

        
        const tarefaAtualizada = await Transacao.findOneAndUpdate(
            { _id: idTransacao, userId: userId }, 
            novosDados,                          
            { new: true, runValidators: true }   
        );

        if (!tarefaAtualizada) {
           
            return res.status(404).json({ message: "Transação não encontrada ou você não tem permissão para editá-la!" });
        }
        
        return res.status(200).json(tarefaAtualizada); 

    } catch (error) {
        return res.status(400).json({ message: "Erro ao atualizar a Transação!", error: error.message });
    };
};


async function mostrarTransacoes(req, res) {
    try {
        const userId = req.user.id; 
        const { descricao, tipo, valor } = req.query;

        
        const filtro = { userId: userId }; 

        if (descricao) {
            filtro.descricao = { $regex: descricao, $options: 'i' };
        }
        if (tipo) {
            filtro.tipo = tipo;
        }
        if (valor) {
            
            const valorNumerico = parseFloat(valor); 
            if (!isNaN(valorNumerico)) { 
                 filtro.valor = valorNumerico;
            }
        }
        
        
        const transacoes = await Transacao.find(filtro); 
        return res.status(200).json(transacoes);
    } catch (error) {
         
        return res.status(500).json({ message: "Erro ao buscar as Transações!", error: error.message }); 
    };
};

async function mostrarTransacao(req, res) {
    try {
        const userId = req.user.id; 
        const idTransacao = req.params.id;

        
        const transacao = await Transacao.findOne({ _id: idTransacao, userId: userId }); 

       
        if (!transacao) { 
            return res.status(404).json({ message: "Transação não encontrada!" });
        }
        return res.status(200).json(transacao);
    } catch (error) {
        return res.status(400).json({ message: "Erro ao buscar a Transação!", error: error.message });
    };
};

async function calcularSaldo(req, res) {
    try {
        const userId = req.user.id; 

       
        const transacoes = await Transacao.find({ userId: userId }); 

        let totalReceitas = 0;
        let totalDespesas = 0;

        transacoes.forEach(transacao => {
            if (transacao.tipo === 'receita') {
                totalReceitas += transacao.valor;
            } else { 
                totalDespesas += transacao.valor;
            }
        });

        const saldo = totalReceitas - totalDespesas;

        return res.status(200).json({ 
            receitas: totalReceitas, 
            despesas: totalDespesas, 
            saldo: saldo 
        });

    } catch (error) {
         
        return res.status(500).json({ message: "Erro ao calcular o saldo!", error: error.message }); 
    }
}







module.exports = {
    cadastrarTransacao,
    deletarTransacao,
    atualizarTransacao,
    mostrarTransacoes,
    mostrarTransacao,
    calcularSaldo
}