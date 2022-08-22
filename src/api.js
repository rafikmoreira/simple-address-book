import express from 'express';
import contatosRouter from './rotas/contatosRotas.js';
import usuariosRouter from './rotas/usuariosRotas.js';

const porta = 3000;
const app = express();

app.use(express.json());

app.use(contatosRouter);
app.use(usuariosRouter);

app.listen(porta, () => {
  console.log(`Servidor online! Porta: ${porta}`);
});
