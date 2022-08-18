const { Router } = require("express");
const { UsuariosController } = require("../controller/usuariosController");
const { validarToken } = require("../middleware/validarToken");

const usuariosRouter = Router();
const usuariosController = new UsuariosController();

usuariosRouter.post("/login", usuariosController.login);
usuariosRouter.get("/usuarios/perfil", validarToken, usuariosController.exibir);
usuariosRouter.post("/usuarios", usuariosController.cadastrar);
usuariosRouter.put("/usuarios/:id", validarToken, usuariosController.atualizar);
usuariosRouter.delete(
  "/usuarios/:id",
  validarToken,
  usuariosController.deletar
);

module.exports = {
  usuariosRouter,
};
