import express, { Application } from "express";
import usuariosRoutes from "../routes/usuario.routes";
// import authRoutes from "../routes/auth.routes";
// import operationRoutes from "../routes/operation.routes";
import cors from "cors";
import initDB from "../database/db";

class Server {

    private app: Application;
    private port: string;
    private paths = {
        usuarios: "/api/usuarios"
    }

    constructor() {

        this.app = express();
        this.port = process.env.PORT || "8080";

        // Middlewares
        this.middlewares();

        // Routes definition
        this.routes();

    }

    middlewares() {
        // CORS
        this.app.use(cors());

        // Body lecture
        this.app.use(express.json());
    }

    routes() {
        this.app.use(this.paths.usuarios, usuariosRoutes);
        // this.app.use(this.paths.auth, authRoutes);
        // this.app.use(this.paths.operations, operationRoutes);
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log("Server running on port", this.port);
        });
    }

}
initDB();
export default Server;