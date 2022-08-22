import { Router } from 'express';
import ContatosController from '../controller/contatosController.js';
import validarToken from '../middleware/validarToken.js';

const contatosRouter = Router();

contatosRouter.get('/contatos/:id', validarToken, ContatosController.exibir);
contatosRouter.get('/contatos', validarToken, ContatosController.listar);
contatosRouter.post('/contatos', validarToken, ContatosController.cadastrar);
contatosRouter.put('/contatos/:id', validarToken, ContatosController.atualizar);
contatosRouter.delete(
  '/contatos/:id',
  validarToken,
  ContatosController.deletar,
);

export default contatosRouter;
