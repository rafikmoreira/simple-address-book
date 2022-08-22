import { Contato, Usuario } from '../banco-de-dados/modelo.js';

class ContatosController {
  static async listar(req, res) {
    const { usuarioLogado } = req.body;

    const usuario = await Usuario.findOne({ where: { id: usuarioLogado.id } });

    const contatos = await usuario.getContatos();

    res.status(200).json(contatos);
  }

  static async exibir(req, res) {
    const { usuarioLogado } = req.body;

    const contato = await Contato.findOne({
      where: {
        UsuarioId: usuarioLogado.id,
        id: req.params.id,
      },
    });

    if (!contato) {
      return res.status(404).json({ mensagem: 'contato não encontrado' });
    }

    return res.status(200).json(contato);
  }

  static async cadastrar(req, res) {
    const { usuarioLogado } = req.body;

    const contato = await Contato.create({
      nome: req.body.nome,
      telefone: req.body.telefone,
      cpf: req.body.cpf,
      email: req.body.email,
      UsuarioId: usuarioLogado.id,
    });

    res.status(200).json(contato);
  }

  static async atualizar(req, res) {
    const { usuarioLogado } = req.body;

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
      },
    );

    if (!update) {
      return res.status(404).json({ mensagem: 'contato não encontrado' });
    }

    const contato = await Contato.findOne({
      where: {
        id: req.params.id,
      },
    });

    return res.status(200).json(contato);
  }

  static async deletar(req, res) {
    const { usuarioLogado } = req.body;

    const contato = await Contato.findOne({
      where: {
        UsuarioId: usuarioLogado.id,
        id: req.params.id,
      },
    });

    if (!contato) {
      return res.status(404).json({ mensagem: 'contato não encontrado' });
    }

    await Contato.destroy({
      where: {
        UsuarioId: usuarioLogado.id,
        id: req.params.id,
      },
    });

    return res.status(200).json({ mensagem: 'contato deletado' });
  }
}

export default ContatosController;
