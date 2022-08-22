import jwt from 'jsonwebtoken';
import SECRET_KEY from '../configuracoes.js';

const { decode, verify } = jwt;

const validarToken = async (req, res, next) => {
  const authToken = req.headers.authorization;

  if (!authToken) {
    return res.status(401).json({ message: 'token inválido' });
  }

  const secret = SECRET_KEY;
  const [, token] = authToken.split(' ');

  try {
    verify(token, `${secret}`);
    req.body.usuarioLogado = decode(token);
    return next();
  } catch (e) {
    return res.status(401).json({ message: 'token inválido' });
  }
};

export default validarToken;
