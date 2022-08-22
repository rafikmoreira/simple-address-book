import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Usuario } from '../banco-de-dados/modelo.js';
import SECRET_KEY from '../configuracoes.js';

const { sign } = jwt;

class UsuariosController {
  static async exibir(req, res) {
    const { usuarioLogado } = req.body;

    const perfilAtualizado = await Usuario.findOne({
      where: {
        id: usuarioLogado.id,
      },
    });

    res.status(200).json(perfilAtualizado);
  }

  static async cadastrar(req, res) {
    const usuario = {
      email: req.body.email,
      senha: req.body.senha,
    };

    const usuarioCheckEmail = await Usuario.findOne({
      where: { email: usuario.email },
    });

    if (usuarioCheckEmail) {
      return res.status(401).json({ mensagem: 'e-mail já cadastrado' });
    }

    const usuarioProtegido = await Usuario.create({
      email: usuario.email,
      senha: await bcrypt.hash(usuario.senha, 8),
    });

    return res.status(200).json(usuarioProtegido);
  }

  static async atualizar(req, res) {
    const { usuarioLogado } = req.body;
    if (!req.body.email || !req.body.senha) {
      return res.status(422).json({ mensagem: 'dados inválidos' });
    }

    const dados = {
      email: req.body.email,
      senha: await bcrypt.hash(req.body?.senha, 8),
    };

    await Usuario.update(dados, {
      where: {
        id: usuarioLogado.id,
      },
    });

    const perfilAtualizado = await Usuario.findOne({
      where: { id: usuarioLogado.id },
    });

    return res.status(200).json(perfilAtualizado);
  }

  static async deletar(req, res) {
    const { usuarioLogado } = req.body;
    await Usuario.destroy({
      where: {
        id: usuarioLogado.id,
      },
    });

    return res.status(200).json({ message: 'Usuário deletado' });
  }

  static async login(req, res) {
    const { email } = req.body;
    const { senha } = req.body;

    let usuario = await Usuario.findOne({ where: { email } });

    usuario = JSON.parse(JSON.stringify(usuario));

    const resultadoDaValidacao = await bcrypt.compare(senha, usuario.senha);

    if (!resultadoDaValidacao) {
      return res.status(401).json({ mensagem: 'E-mail ou senha inválidos' });
    }

    const token = sign(usuario, `${SECRET_KEY}`, {
      subject: `${usuario.email}`,
      expiresIn: '1d',
    });

    return res.status(200).json({ token });
  }
}

export default UsuariosController;
