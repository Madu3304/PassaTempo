const Login = require("../models/login_model").default;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { sendMail, sendMailTo } = require("../helpers/mail");
const { EmailValido } = require("../helpers/Validacoes");
const db = require("../").default;

const CriarUsuarioToken = require("../helpers/CriarUsuarioToken");
const ObterToken = require("../helpers/ObterToken");
const ObterUsuarioToken = require("../helpers/ObterUsuarioToken");

module.exports = class UsuarioController {

  // Função para cadastrar usuário
  static async CadastroUsuario(req, res) {
    const { SENHA, EMAIL } = req.body;

    // Validações
    if (!SENHA) {
      return res.status(422).json({ message: "A senha é obrigatória" });
    }
    if (!EMAIL) {
      return res.status(422).json({ message: "O e-mail é obrigatório" });
    }

    try {
      // Criando a senha criptografada
      const salt = await bcrypt.genSalt(12);
      const senhaHash = await bcrypt.hash(SENHA, salt);

      // Criando o usuário
      const usuario = new Login({
        EMAIL,
        SENHA: senhaHash,
      });

      const novoUsuario = await usuario.save();
      return res
        .status(201)
        .json({ message: "Usuário cadastrado com sucesso", usuario: novoUsuario });
    } catch (error) {
      return res.status(500).json({ message: "Erro ao cadastrar o usuário", error: error.message });
    }
  }

  // Função de login
  static async login(req, res) {
    const { SENHA, EMAIL } = req.body;

    // Validações
    if (!SENHA) {
      return res.status(422).json({ message: "A senha é obrigatória" });
    }
    if (!EMAIL) {
      return res.status(422).json({ message: "O e-mail é obrigatório" });
    }

    try {
      // Verificar se o usuário existe
      const usuario = await Login.findOne({
        where: { EMAIL },
      });
      if (!usuario) {
        return res.status(422).json({ message: "Usuário não encontrado!" });
      }

      // Verificar se a senha está correta
      const checarSenha = await bcrypt.compare(SENHA, usuario.SENHA);
      if (!checarSenha) {
        return res.status(422).json({ message: "Senha inválida!" });
      }

      // Criar token
      await CriarUsuarioToken(usuario, req, res);
    } catch (error) {
      return res.status(500).json({ message: "Erro no servidor. Tente novamente mais tarde.", error: error.message });
    }
  }

  // Função de login com token
  static async login2(req, res) {
    const { token } = req.body;

    try {
      const user = await ObterUsuarioToken(token);

      const usuario = await Login.findOne({
        where: { CD_USUARIO: user.CD_USUARIO },
      });

      return res.json({
        ok: usuario.NIVEL_ACESSO,
      });
    } catch (error) {
      return res.status(500).json({ message: "Erro no servidor. Tente novamente mais tarde.", error: error.message });
    }
  }

  // Solicitar senha temporária
  static async solicitarSenhaTemporaria(req, res) {
    const { email, senhaTemporaria } = req.body;

    try {
      // Criptografar a senha temporária
      const salt = await bcrypt.genSalt(12);
      const senhaHash = await bcrypt.hash(senhaTemporaria, salt);

      // Atualizar a senha no banco
      const usuario = await Login.findOne({ where: { EMAIL: email } });
      if (!usuario) {
        return res.status(404).json({ message: "Usuário não encontrado!" });
      }

      usuario.SENHA = senhaHash;
      await usuario.save();

      // Enviar a senha temporária por e-mail
      const htmlContent = `
        <div style="font-family: Arial, sans-serif; color: #333; position: relative;">
          <div style="padding: 10px; background-color: #f8f9fa; position: relative;">
            <h2 style="color: #ED5600;">Nova senha</h2>
            <p>Você solicitou uma nova senha. Use a senha abaixo para acessar sua conta:</p>
          </div>
          <div style="padding: 10px; background-color: #ffffff; border: 1px solid #ddd;">
            <p><strong>Senha:</strong> ${senhaTemporaria}</p>
          </div>
        </div>
      `;

      await sendMailTo("Senha Temporária", htmlContent, email);

      return res.status(200).json({ message: "Senha temporária enviada para o e-mail!" });
    } catch (error) {
      console.error("Erro ao solicitar a senha temporária:", error);
      return res.status(500).json({
        message: "Erro ao solicitar a senha temporária",
        error: error.message,
      });
    }
  }
};
