const { Usuario } = require("../banco-de-dados/modelo");
const { sign } = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { SECRET_KEY } = require("../configuracoes");

class UsuariosController {
  async exibir(req, res) {
    const usuarioLogado = req.body.usuarioLogado;

    const perfilAtualizado = await Usuario.findOne({
      where: {
        id: usuarioLogado.id,
      },
    });

    res.status(200).json(perfilAtualizado);
  }

  async cadastrar(req, res) {
    const usuario = {
      email: req.body.email,
      senha: req.body.senha,
    };

    const usuarioCheckEmail = await Usuario.findOne({
      where: { email: usuario.email },
    });

    if (usuarioCheckEmail) {
      return res.status(401).json({ mensagem: "e-mail já cadastrado" });
    }

    const usuarioProtegido = await Usuario.create({
      email: usuario.email,
      senha: await bcrypt.hash(usuario.senha, 8),
    });

    res.status(200).json(usuarioProtegido);
  }

  async atualizar(req, res) {
    const usuarioLogado = req.body.usuarioLogado;
    if (!req.body.email || !req.body.senha) {
      return res.status(422).json({ mensagem: "dados inválidos" });
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

    res.status(200).json(perfilAtualizado);
  }

  async deletar(req, res) {
    const usuarioLogado = req.body.usuarioLogado;
    const perfilAtualizado = await Usuario.destroy({
      where: {
        id: usuarioLogado.id,
      },
    });
  }

  async login(req, res) {
    const email = req.body.email;
    const senha = req.body.senha;

    let usuario = await Usuario.findOne({ where: { email } });

    usuario = JSON.parse(JSON.stringify(usuario));

    const resultadoDaValidacao = await bcrypt.compare(senha, usuario.senha);

    if (!resultadoDaValidacao) {
      return res.status(401).json({ mensagem: "E-mail ou senha inválidos" });
    }

    const token = sign(usuario, `${SECRET_KEY}`, {
      subject: `${usuario.email}`,
      expiresIn: "1d",
    });

    return res.status(200).json({ token });
  }
}

module.exports = {
  UsuariosController,
};
