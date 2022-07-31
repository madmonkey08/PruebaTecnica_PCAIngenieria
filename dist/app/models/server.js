"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const usuario_routes_1 = __importDefault(require("../routes/usuario.routes"));
// import authRoutes from "../routes/auth.routes";
// import operationRoutes from "../routes/operation.routes";
const cors_1 = __importDefault(require("cors"));
const db_1 = __importDefault(require("../database/db"));
class Server {
    constructor() {
        this.paths = {
            usuarios: "/api/usuarios"
        };
        this.app = (0, express_1.default)();
        this.port = process.env.PORT || "8080";
        // Middlewares
        this.middlewares();
        // Routes definition
        this.routes();
    }
    middlewares() {
        // CORS
        this.app.use((0, cors_1.default)());
        // Body lecture
        this.app.use(express_1.default.json());
    }
    routes() {
        this.app.use(this.paths.usuarios, usuario_routes_1.default);
        // this.app.use(this.paths.auth, authRoutes);
        // this.app.use(this.paths.operations, operationRoutes);
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log("Server running on port", this.port);
        });
    }
}
(0, db_1.default)();
exports.default = Server;
//# sourceMappingURL=server.js.map