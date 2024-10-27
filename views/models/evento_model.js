import { Sequelize } from 'sequelize';
import sequelize from "../config/banco.js";


const Evento = sequelize.define('evento', {

    id_evento:{
        type:Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },

    nome_evento:{
        type:Sequelize.STRING,
        allowNull: false
    },

    categoria_evento:{
        type:Sequelize.STRING,
        allowNull: false
    },

    local: {
        type: Sequelize.STRING,
        allowNull: false
    },


    data: {
        type: Sequelize.DATE,
        allowNull: false
    },

    inicio: {
        type: Sequelize.TIME,
        allowNull: false
    },

    descricao: {
        type: Sequelize.STRING,
        allowNull: false
    },

})

export default Evento;