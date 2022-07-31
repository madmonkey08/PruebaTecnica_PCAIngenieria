import { Router } from "express";
import { check } from "express-validator";

import { crearUsuario, login, obtenerUsuarios } from "../controllers/usuario.controller";

import validarCampos from "../middlewares/validarCampos";

const router = Router();

router.get("/", obtenerUsuarios);

router.post("/", [
    check("cedula", "La cédula es obligatoria!").not().isEmpty(),
    check("cedula", "La cédula debe ser un valor numérico!").isNumeric(),
    check("cedula", "La cédula debe tener al menos 6 caracteres!").isLength({ min: 6 }),
    check("nombre", "El nombre del usuario es obligatorio!").not().isEmpty(),
    check("nombre", "El nombre del usuario debe tener al menos 4 caracteres!").isLength({ min: 4 }),
    check("contrasena", "La contraseña es obligatoria!").not().isEmpty(),
    check("contrasena", "La contraseña debe tener al menos 4 caracteres!").isLength({ min: 4 }),
    check("rol", "El rol es obligatorio!").not().isEmpty(),
    validarCampos
], crearUsuario);

router.post("/login", [
    check("cedula", "La cédula es obligatoria!").not().isEmpty(),
    check("cedula", "La cédula debe ser un valor numérico!").isNumeric(),
    check("contrasena", "La contraseña es obligatoria!").not().isEmpty(),
    validarCampos
], login);

export default router;
