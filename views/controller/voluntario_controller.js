import { where } from "sequelize";
import Voluntario from "../models/voluntario_model.js";

const voluntario = {};


// verificar CPF
voluntario.verificarVoluntario = async (req, res) => {
  const { cpf, email } = req.body;

  // Validações de CPF e E-mail
  if (!cpf) {
    return res.status(422).json({ message: "O CPF é obrigatório" });
  }
  if (!email) {
    return res.status(422).json({ message: "O e-mail é obrigatório" });
  }

  try {
    // Verificar se o voluntário com o CPF e e-mail fornecidos existe no banco de dados
    const voluntario = await Voluntario.findOne({
      where: {
        cpf: cpf,
        email: email,
      },
    });

    // Caso o voluntário exista, retorna a mensagem de confirmação
    if (voluntario) {
      return res.status(200).json({ message: "Usuário já registrado no evento" });
    } else {
      // Caso não exista, solicita que informe o evento desejado
      return res.status(404).json({ message: "Informe o evento que deseja participar" });
    }
  } catch (error) {
    console.error("Erro ao verificar o voluntário:", error);
    
  }
};

// Função para listar todos os voluntários
voluntario.getVoluntarios = async (req, res) => {
  try {
    const voluntarios = await Voluntario.findAll();
    res.status(200).json(voluntarios);
  } catch (error) {
    console.error("Erro ao buscar voluntários:", error);
    
  }
};

// Função para criar um novo voluntário
voluntario.createVoluntario = async (req, res) => {
  try {
    const { nome_voluntario, email_voluntario, cpf_voluntario, evento_voluntario } = req.body;

    const novoVoluntario = await Voluntario.create({
      nome_voluntario,
      email: email_voluntario,
      cpf: cpf_voluntario,
      evento_voluntario,
    });

    res.status(201).json(novoVoluntario);
  } catch (error) {
    console.error("Erro ao tentar adicionar um novo voluntário:", error);
    
  }
};

// Função para atualizar um voluntário
voluntario.updateVoluntario = async (req, res) => {
  try {
    const { id_voluntario } = req.params;
    const { nome_voluntario, email_voluntario, cpf_voluntario, evento_voluntario } = req.body;

    await Voluntario.update(
      {
        nome_voluntario,
        email: email_voluntario,
        cpf: cpf_voluntario,
        evento_voluntario,
      },
      { where: { id_voluntario: id_voluntario } }
    );

    const voluntarioAtualizado = await Voluntario.findByPk(id_voluntario);
    res.status(200).json(voluntarioAtualizado);
  } catch (error) {
    console.error("Erro ao atualizar voluntário:", error);
    
  }
};

// Função para deletar um voluntário
voluntario.deleteVoluntario = async (req, res) => {
  try {
    const { id_voluntario } = req.params;

    await Voluntario.destroy({
      where: { id_voluntario: id_voluntario },
    });

    res.status(200).json({ message: "Voluntário deletado com sucesso" });
  } catch (error) {
    console.error("Erro ao tentar deletar o voluntário:", error);
  
  }
};

export {voluntario};