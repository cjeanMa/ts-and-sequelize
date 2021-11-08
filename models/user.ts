import { DataTypes } from "sequelize";
import sequelize from "../database/connection";

const User= sequelize.define('User', {
    name: {
        type: DataTypes.STRING
    },
    email:{
        type: DataTypes.STRING
    },
    state:{
        type: DataTypes.BOOLEAN
    }
})

export default User;