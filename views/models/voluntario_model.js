import { Sequelize } from 'sequelize';
import sequelize from "../config/banco.js";


const Voluntario = sequelize.define('voluntario', {
    id_voluntario:{
        type:Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },

    nome:{
        type:Sequelize.STRING,
        allowNull: false

    },

    email:{
        type:Sequelize.STRING,
        allowNull: false
    },

    cpf:{
        type: Sequelize.STRING,
        allowNull: false
    },

    evento: {
        type: Sequelize.STRING,
        allowNull: false
    }


 })

 export default Voluntario;
