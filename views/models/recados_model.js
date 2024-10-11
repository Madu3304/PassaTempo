import { Sequelize } from 'sequelize';
import Sequelize from ".../config/banco.js";


const Recados = sequelize.define('recados', {
    id_recados:{
        type:Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },

    descricaoa:{
        type:Sequelize.STRING,
        allowNull: false

    },

    descricaob:{
        type:Sequelize.STRING,
        allowNull: false
    },

    descricaoc:{
        type: Sequelize.STRING,
        allowNull: false
    },

    descricaod: {
        type: Sequelize.STRING,
        allowNull: false
    },

    
    descricaoe: {
        type: Sequelize.STRING,
        allowNull: false
    }

 })

 export default Recados;
