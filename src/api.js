const express = require("express");
const { contatosRouter } = require("./rotas/contatosRotas");
const { usuariosRouter } = require("./rotas/usuariosRotas");

const porta = 3000;
const app = express();

app.use(express.json());

app.use(contatosRouter);
app.use(usuariosRouter);

app.listen(porta, () => {
  console.log("Servidor online! Porta: " + porta);
});
