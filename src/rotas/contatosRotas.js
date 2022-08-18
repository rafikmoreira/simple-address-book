const { ContatosController } = require("../controller/contatosController");
const { validarToken } = require("../middleware/validarToken");

const Router = require("express").Router;

const contatosRouter = Router();
const contatosController = new ContatosController();

contatosRouter.get("/contatos/:id", validarToken, contatosController.exibir);
contatosRouter.get("/contatos", validarToken, contatosController.listar);
contatosRouter.post("/contatos", validarToken, contatosController.cadastrar);
contatosRouter.put("/contatos/:id", validarToken, contatosController.atualizar);
contatosRouter.delete(
  "/contatos/:id",
  validarToken,
  contatosController.deletar
);

module.exports = {
  contatosRouter,
};
