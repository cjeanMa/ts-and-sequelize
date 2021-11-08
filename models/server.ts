import express, { Application } from "express";
import userRoutes from "../routes/userRoutes";
import cors from "cors";

import sequelize from "../database/connection";

class Server {
    
    private app: Application;
    private port: String;
    private apiPaths = {
        users: "/api/users"
    }

    constructor(){
        this.app = express();
        this.port = process.env.PORT || "80";
        this.dbConnection();
        this.middlewares();
        this.routes();
    }
    
    async dbConnection(){
        try {
            await sequelize.authenticate();
            console.log("Conexion exitosa");
        } catch (err) {
            console.log(err)
            throw new Error( "Error al conectar a la DB" );
        }
    }

    middlewares(){
        this.app.use(cors());

        this.app.use( express.json());

        this.app.use( express.static("public") )
    }

    routes(){
        this.app.use(this.apiPaths.users, userRoutes)
    }

    listen(){
        this.app.listen(this.port, ()=>{
            console.log(`Servidor corriendo en el puerto ${this.port}`)
        })
    }


}

export default Server;