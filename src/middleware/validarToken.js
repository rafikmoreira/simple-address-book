const { SECRET_KEY } = require("../configuracoes");
const { verify, decode } = require("jsonwebtoken");

const validarToken = async (req, res, next) => {
  const authToken = req.headers.authorization;

  if (!authToken) {
    return res.status(401).json({ message: "token inválido" });
  }

  const secret = SECRET_KEY;
  const [, token] = authToken.split(" ");

  try {
    verify(token, `${secret}`);
    req.body.usuarioLogado = decode(token);
    return next();
  } catch (e) {
    return res.status(401).json({ message: "token inválido" });
  }
};

module.exports = {
  validarToken,
};
