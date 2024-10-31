import { where } from "sequelize";
import Home from "../models/home_model.js";

const home = {};


// verificar Id_home
home.verificarHome = async (req, res) => {
  const { id_home } = req.body;

  // Validações de Id Home
  if (!id_home) {
    return res.status(422).json({ message: "Usuário nao encontrado" });
  }


  try {
    // Verificar se existe ID_HOME fornecidos existe no banco de dados
    const home = await Home.findOne({
      where: {
        id_home: id_home
      },
    });

    // Caso encontre retorna mensagem de bem vindo
    if (home) {
      return res.status(200).json({ message: "Bem vindo" });
    } else {
      // Caso não exista, solicita que informe o evento desejado
      return res.status(404).json({ message: "Informe o evento que deseja participar" });
    }
  } catch (error) {
    console.error("Erro ao verificar o evento", error);
    
  }
};

// Função para listar os comentários
home.getHome = async (req, res) => {
  try {
    const coment = await Home.findOne();
    res.status(200).json(coment);
  } catch (error) {
    console.error("Erro ao buscar comentário", error);
    
  }
};



export default home;