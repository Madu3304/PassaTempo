import { Sequelize } from 'sequelize';
import Sequelize from ".../config/banco.js";


const Login = sequelize.define('login', {

    id_login:{
        type:Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },

    email: {
        type: Sequelize.STRING,
        allowNull: false
    },

    senha: {
        type: Sequelize.STRING,
        allowNull: false
    },


})

export default Login;