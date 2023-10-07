import express from 'express';
import { atualizaUsuario, cadastrarUsuarios, deletarUsuario, listarUnicoUsuario, listarUsuarios } from './controllers/user';

const app = express();

app.use(express.json());


app.get('/users', listarUsuarios);
app.get('/users/:id', listarUnicoUsuario);
app.post('/users', cadastrarUsuarios);
app.patch('/users/:id', atualizaUsuario);
app.delete('/users/:id', deletarUsuario);

export default app;

