import { Router } from 'express';
import UsuariosController from '../controller/usuariosController.js';
import validarToken from '../middleware/validarToken.js';

const usuariosRouter = Router();

usuariosRouter.post('/login', UsuariosController.login);
usuariosRouter.get('/usuarios/perfil', validarToken, UsuariosController.exibir);
usuariosRouter.post('/usuarios', UsuariosController.cadastrar);
usuariosRouter.put('/usuarios/:id', validarToken, UsuariosController.atualizar);
usuariosRouter.delete(
  '/usuarios/:id',
  validarToken,
  UsuariosController.deletar,
);

export default usuariosRouter;
