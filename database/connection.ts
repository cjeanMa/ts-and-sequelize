import { Sequelize } from "sequelize";

const sequelize = new Sequelize('ts', 'root', '', {
    host: 'localhost',
    dialect: "mysql",
    //logging: false
  });

  export default sequelize;