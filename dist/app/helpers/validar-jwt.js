"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generarJWT = (uid = '') => {
    return new Promise((res) => {
        const payload = { uid };
        jsonwebtoken_1.default.sign(payload, process.env.SECRETORPRIVATEKEY, {
            expiresIn: '12h'
        }, (err, token) => {
            if (err) {
                console.log(err);
                res('No se pudo generar el token');
            }
            else {
                res(token);
            }
        });
    });
};
exports.default = generarJWT;
//# sourceMappingURL=validar-jwt.js.map