
// import { config } from "dotenv-safe";
// config ();
// import express from "express";
// import path from "path";
// // import sincronizarBanco from "./views/config/server.js";
// import { authenticateToken } from "./views/src/middleware/auth.js";
// import { fileURLToPath } from "url";
// import jwt from "jsonwebtoken";
// import cors from "cors";
// import bodyParser from "body-parser";
// import { verify  } from "crypto";
// import { Session } from "express-session";
// import dotenv from "dotenv";

// import { router as evento_routes } from "./views/routes/evento_routes.js";
// import { router as home_routes } from "./views/routes/home_routes.js";
// import { router as participacao_routes } from "./views/routes/participacao_routes.js";
// import { router as voluntario_routes } from "./views/routes/voluntario_routes.js";


// const  index = express();
const conn = "./views/congig/banco.";

// index.use(express.json());
// index.use(express.urlencoded({ extended: true }));
// index.use(cors());
// index.use(bodyParser.json());

// index.use(evento_routes)
// index.use(home_routes)
// index.use(participacao_routes)
// index.use(voluntario_routes)




// const PORT = process.env.PORT || 8080
// index.listen(PORT, () => {
//   console.log(`Servidor rodando na porta ${PORT}`)
//  }
// ) 

// conn
//   .sync()
//   //.sync({force: true}) // Apaga todas as tabelas e faz novamente
//   .then(() => {
//     app.listen(8080);
//   })
//   .catch((err) => console.log(err));

const { Sequelize } = require('sequelize');

const con = new Sequelize('gestao_voluntarios', 'root', '', {
  host: 'localhost',
  dialect: 'mysql', // ou 'postgres', 'sqlite', 'mariadb', 'mssql', dependendo do banco de dados
});

// Testa a conexão com o banco de dados
con.authenticate()
  .then(() => console.log('Conexão com o banco de dados estabelecida com sucesso.'))
  .catch((err) => console.error('Erro ao conectar com o banco de dados:', err));

// Sincroniza os modelos com o banco de dados e inicia o servidor
con.sync()
  //.sync({ force: true }) // Use com cautela em ambiente de desenvolvimento
  .then(() => {
    app.listen(8080, () => console.log('Servidor rodando na porta 8080.'));
  })
  .catch((err) => console.error('Erro ao sincronizar com o banco de dados:', err));
