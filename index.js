
import http, { Server } from "http";
import { config } from "dotenv-safe";
config ();
import express from "express";
import path from "path";
// import sincronizarBanco from "./views/config/server.js";
import { authenticateToken } from "./views/middleware/auth.js";
import { fileURLToPath } from "url";
import jwt from "jsonwebtoken";
import cors from "cors";
import bodyParser from "body-parser";
import { verify  } from "crypto";
import { Session } from "express-session";
import dotenv from "dotenv";

import { router as evento_routes } from "./views/routes/evento_routes.js";
import { router as home_routes } from "./views/routes/home_routes.js";
import { router as participacao_routes } from "./views/routes/participacao_routes.js";
import { router as voluntario_routes } from "./views/routes/voluntario_routes.js";


const  index = express();

index.use(express.json());
index.use(express.urlencoded({ extended: true }));
index.use(cors());
index.use(bodyParser.json());

index.use(evento_routes)
index.use(home_routes)
index.use(participacao_routes)
index.use(voluntario_routes)




const PORT = process.env.PORT || 8080
server.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`)
 }
) 