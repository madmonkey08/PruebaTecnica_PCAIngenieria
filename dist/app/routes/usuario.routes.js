"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const usuario_controller_1 = require("../controllers/usuario.controller");
const validarCampos_1 = __importDefault(require("../middlewares/validarCampos"));
const router = (0, express_1.Router)();
router.get("/", usuario_controller_1.obtenerUsuarios);
router.post("/", [
    (0, express_validator_1.check)("cedula", "La cédula es obligatoria!").not().isEmpty(),
    (0, express_validator_1.check)("cedula", "La cédula debe ser un valor numérico!").isNumeric(),
    (0, express_validator_1.check)("cedula", "La cédula debe tener al menos 6 caracteres!").isLength({ min: 6 }),
    (0, express_validator_1.check)("nombre", "El nombre del usuario es obligatorio!").not().isEmpty(),
    (0, express_validator_1.check)("nombre", "El nombre del usuario debe tener al menos 4 caracteres!").isLength({ min: 4 }),
    (0, express_validator_1.check)("contrasena", "La contraseña es obligatoria!").not().isEmpty(),
    (0, express_validator_1.check)("contrasena", "La contraseña debe tener al menos 4 caracteres!").isLength({ min: 4 }),
    (0, express_validator_1.check)("rol", "El rol es obligatorio!").not().isEmpty(),
    validarCampos_1.default
], usuario_controller_1.crearUsuario);
router.post("/login", [
    (0, express_validator_1.check)("cedula", "La cédula es obligatoria!").not().isEmpty(),
    (0, express_validator_1.check)("cedula", "La cédula debe ser un valor numérico!").isNumeric(),
    (0, express_validator_1.check)("contrasena", "La contraseña es obligatoria!").not().isEmpty(),
    validarCampos_1.default
], usuario_controller_1.login);
exports.default = router;
//# sourceMappingURL=usuario.routes.js.map