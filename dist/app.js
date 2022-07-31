"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config({ path: "./.env" });
const server_1 = __importDefault(require("./app/models/server"));
const server = new server_1.default();
server.listen();
//# sourceMappingURL=app.js.map