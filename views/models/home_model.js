import { Sequelize } from 'sequelize';
import sequelize from "../config/banco.js";


const Home = sequelize.define('home', {

    id_home:{
        type:Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },

    recado_um: {
        type: Sequelize.STRING,
        allowNull: false
    },

    recado_dois: {
        type: Sequelize.STRING,
        allowNull: false
    },

    
    comentario_um: {
        type: Sequelize.STRING,
        allowNull: false
    },

    comentario_dois: {
        type: Sequelize.STRING,
        allowNull: false
    },

    comentario_tres: {
        type: Sequelize.STRING,
        allowNull: false
    },
    

})

export default Home;