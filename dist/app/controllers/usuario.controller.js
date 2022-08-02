"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.actualizarMonto = exports.eliminarUsuario = exports.buscarUsuario = exports.obtenerUsuarios = exports.login = exports.crearUsuario = exports.actualizarUsuario = void 0;
const usuario_1 = __importDefault(require("../models/usuario"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const validar_jwt_1 = __importDefault(require("../helpers/validar-jwt"));
const crearUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    try {
        let usuario = yield usuario_1.default.findOne({ cedula: body.cedula });
        if (usuario != null) {
            return res.json({
                ok: false,
                msg: `Usted ya se encuentra registrado, por favor inicie sesión.`,
            });
        }
        else {
            // Encriptar la contraseña
            const salt = bcrypt_1.default.genSaltSync();
            body.contrasena = bcrypt_1.default.hashSync(body.contrasena, salt);
            const usuario = new usuario_1.default({
                cedula: body.cedula,
                nombre: body.nombre,
                contrasena: body.contrasena,
                rol: body.rol,
                monto: body.monto
            });
            yield usuario.save();
            res.status(201).json({
                ok: true,
                msg: "Usuario registrado exitosamente.",
                usuario,
            });
        }
    }
    catch (err) {
        res.json({
            ok: false,
            msg: "Error interno, por favor hable con el administrador.",
            err: err,
        });
    }
});
exports.crearUsuario = crearUsuario;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { cedula, contrasena } = req.body;
        // Verificar si la cédula existe
        const usuario = yield usuario_1.default.findOne({ cedula });
        // Si el usuario no existe en la BD
        if (!usuario) {
            return res.json({
                ok: false,
                msg: 'El usuario no se encuentra registrado en la base de datos.'
            });
        }
        // Verificar la contraseña
        const validPassword = bcrypt_1.default.compareSync(contrasena, usuario.get("contrasena"));
        if (!validPassword) {
            return res.json({
                ok: false,
                msg: 'Contraseña incorrecta'
            });
        }
        // Generar JWT
        const token = yield (0, validar_jwt_1.default)(usuario.get("cedula"));
        res.json({
            ok: true,
            usuario: usuario.get("cedula"),
            token
        });
    }
    catch (err) {
        res.json({
            ok: false,
            msg: "Error interno, por favor hable con el administrador.",
            err: err,
        });
    }
});
exports.login = login;
const obtenerUsuarios = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const usuarios = yield usuario_1.default.find();
        res.json({
            ok: true,
            usuarios
        });
    }
    catch (err) {
        res.json({
            ok: false,
            msg: "Error interno, por favor hable con el administrador.",
            err: err,
        });
    }
});
exports.obtenerUsuarios = obtenerUsuarios;
const buscarUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { cedula } = req.params;
        const usuario = yield usuario_1.default.findOne({ cedula });
        if (!usuario) {
            return res.json({
                ok: false,
                msg: "Usuario no encontrado."
            });
        }
        res.json({
            ok: true,
            usuario
        });
    }
    catch (err) {
        res.json({
            ok: false,
            msg: "Error interno, por favor hable con el administrador.",
            err: err,
        });
    }
});
exports.buscarUsuario = buscarUsuario;
const eliminarUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { cedula } = req.params;
        const eliminar = yield usuario_1.default.findOneAndDelete({ cedula });
        if (!eliminar) {
            return res.json({
                ok: false,
                msg: "El usuario no existe."
            });
        }
        res.json({
            ok: true,
            msg: "Usuario eliminado correctamente!"
        });
    }
    catch (err) {
        res.json({
            ok: false,
            msg: "Error interno, por favor hable con el administrador.",
            err: err,
        });
    }
});
exports.eliminarUsuario = eliminarUsuario;
const actualizarUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { cedula } = req.params;
        let { body } = req;
        if (body.monto < 0) {
            return res.json({
                ok: false,
                msg: "El monto no puede ser negativo."
            });
        }
        if (body.contrasena.length !== 0) {
            const salt = bcrypt_1.default.genSaltSync();
            body.contrasena = bcrypt_1.default.hashSync(body.contrasena, salt);
        }
        let actualizar;
        if (body.contrasena.length === 0) {
            actualizar = yield usuario_1.default.findOneAndUpdate({ cedula }, { nombre: body.nombre, monto: body.monto });
        }
        else {
            actualizar = yield usuario_1.default.findOneAndUpdate({ cedula }, { nombre: body.nombre, monto: body.monto, contrasena: body.contrasena });
        }
        if (!actualizar) {
            return res.json({
                ok: false,
                msg: "El usuario no existe."
            });
        }
        res.json({
            ok: true,
            msg: "Usuario actualizado correctamente!"
        });
    }
    catch (err) {
        res.json({
            ok: false,
            msg: 'Error interno, comuníquese con los desarrolladores.',
            err
        });
    }
});
exports.actualizarUsuario = actualizarUsuario;
const actualizarMonto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { cedula } = req.params;
        const { monto } = req.body;
        const actualizar = yield usuario_1.default.findOneAndUpdate({ cedula }, { monto });
        if (!actualizar) {
            return res.json({
                ok: false,
                msg: 'No se pudo actualizar el monto del usuario.'
            });
        }
        res.json({
            ok: true,
            msg: 'Monto actualizado correctamente.'
        });
    }
    catch (err) {
        res.json({
            ok: false,
            msg: 'Error interno, comuníquese con los desarrolladores.',
            err
        });
    }
});
exports.actualizarMonto = actualizarMonto;
//# sourceMappingURL=usuario.controller.js.map