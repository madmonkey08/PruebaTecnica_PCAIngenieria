require("dotenv").config({ path: "./.env" });
import Server from "./app/models/server";

const server = new Server();

server.listen();