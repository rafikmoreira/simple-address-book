const { Contato, Usuario } = require("../banco-de-dados/modelo");

class ContatosController {
  async listar(req, res) {
    const usuarioLogado = req.body.usuarioLogado;

    const usuario = await Usuario.findOne({ where: { id: usuarioLogado.id } });

    const contatos = await usuario.getContatos();

    res.status(200).json(contatos);
  }

  async exibir(req, res) {
    const usuarioLogado = req.body.usuarioLogado;

    const contato = await Contato.findOne({
      where: {
        UsuarioId: usuarioLogado.id,
        id: req.params.id,
      },
    });

    if (!contato) {
      return res.status(404).json({ mensagem: "contato não encontrado" });
    }

    res.status(200).json(contato);
  }

  async cadastrar(req, res) {
    const usuarioLogado = req.body.usuarioLogado;

    const contato = await Contato.create({
      nome: req.body.nome,
      telefone: req.body.telefone,
      cpf: req.body.cpf,
      email: req.body.email,
      UsuarioId: usuarioLogado.id,
    });

    res.status(200).json(contato);
  }

  async atualizar(req, res) {
    const usuarioLogado = req.body.usuarioLogado;

    const update = await Contato.update(
      {
        nome: req.body.nome,
        telefone: req.body.telefone,
        cpf: req.body.cpf,
        email: req.body.email,
      },
      {
        where: {
          UsuarioId: usuarioLogado.id,
          id: req.params.id,
        },
      }
    );

    if (!update) {
      return res.status(404).json({ mensagem: "contato não encontrado" });
    }

    const contato = await Contato.findOne({
      where: {
        id: req.params.id,
      },
    });

    res.status(200).json(contato);
  }

  async deletar(req, res) {
    const usuarioLogado = req.body.usuarioLogado;

    const contato = await Contato.findOne({
      where: {
        UsuarioId: usuarioLogado.id,
        id: req.params.id,
      },
    });

    if (!contato) {
      return res.status(404).json({ mensagem: "contato não encontrado" });
    }

    await Contato.destroy({
      where: {
        UsuarioId: usuarioLogado.id,
        id: req.params.id,
      },
    });

    res.status(200).json({ mensagem: "contato deletado" });
  }
}

module.exports = {
  ContatosController,
};
