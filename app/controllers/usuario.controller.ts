import Usuario from "../models/usuario";
import { Response, Request } from "express";
import bcrypt from "bcrypt";
import generarJWT from "../helpers/validar-jwt";

const crearUsuario = async (req: Request, res: Response) => {

    const { body } = req;

    try {

        let usuario = await Usuario.findOne({ cedula: body.cedula });

        if (usuario != null) {
            return res.json({
                ok: false,
                msg: `Usted ya se encuentra registrado, por favor inicie sesión.`,
            });
        } else {

            // Encriptar la contraseña
            const salt = bcrypt.genSaltSync();

            body.contrasena = bcrypt.hashSync(body.contrasena, salt);

            const usuario = new Usuario({
                cedula: body.cedula,
                nombre: body.nombre,
                contrasena: body.contrasena,
                rol: body.rol,
                monto: body.monto
            });

            await usuario.save();

            res.status(201).json({
                ok: true,
                msg: "Usuario registrado exitosamente.",
                usuario,
            });
        }
    } catch (err) {
        res.json({
            ok: false,
            msg: "Error interno, por favor hable con el administrador.",
            err: err,
        });
    }
}

const login = async (req: Request, res: Response) => {

    try {

        const { cedula, contrasena } = req.body;

        // Verificar si la cédula existe
        const usuario = await Usuario.findOne({ cedula });

        // Si el usuario no existe en la BD
        if (!usuario) {
            return res.json({
                ok: false,
                msg: 'El usuario no se encuentra registrado en la base de datos.'
            });
        }

        // Verificar la contraseña
        const validPassword = bcrypt.compareSync(contrasena, usuario.get("contrasena") as string);

        if (!validPassword) {
            return res.json({
                ok: false,
                msg: 'Contraseña incorrecta'
            });
        }

        // Generar JWT
        const token = await generarJWT(usuario.get("cedula") as string);

        res.json({
            ok: true,
            usuario: usuario.get("cedula"),
            token
        });

    } catch (err) {
        res.json({
            ok: false,
            msg: "Error interno, por favor hable con el administrador.",
            err: err,
        });
    }
}

const obtenerUsuarios = async (req: Request, res: Response) => {

    try {

        const usuarios = await Usuario.find();

        res.json({
            ok: true,
            usuarios
        });

    } catch (err) {
        res.json({
            ok: false,
            msg: "Error interno, por favor hable con el administrador.",
            err: err,
        });
    }
}

const buscarUsuario = async (req: Request, res: Response) => {

    try {

        const { cedula } = req.params;

        const usuario = await Usuario.findOne({ cedula });

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

    } catch (err) {
        res.json({
            ok: false,
            msg: "Error interno, por favor hable con el administrador.",
            err: err,
        });
    }
}

const eliminarUsuario = async (req: Request, res: Response) => {

    try {

        const { cedula } = req.params;


        const eliminar = await Usuario.findOneAndDelete({ cedula });

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

    } catch (err) {
        res.json({
            ok: false,
            msg: "Error interno, por favor hable con el administrador.",
            err: err,
        });
    }
}

export const actualizarUsuario = async (req: Request, res: Response) => {

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
            const salt = bcrypt.genSaltSync();
            body.contrasena = bcrypt.hashSync(body.contrasena, salt);
        }

        let actualizar;

        if (body.contrasena.length === 0) {
            actualizar = await Usuario.findOneAndUpdate({ cedula }, { nombre: body.nombre, monto: body.monto });
        } else {
            actualizar = await Usuario.findOneAndUpdate({ cedula }, { nombre: body.nombre, monto: body.monto, contrasena: body.contrasena });
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

    } catch (err) {
        res.json({
            ok: false,
            msg: 'Error interno, comuníquese con los desarrolladores.',
            err
        });
    }
}

const actualizarMonto = async (req: Request, res: Response) => {

    try {

        const { cedula } = req.params;
        const { monto } = req.body;

        const actualizar = await Usuario.findOneAndUpdate({ cedula }, { monto });

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

    } catch (err) {
        res.json({
            ok: false,
            msg: 'Error interno, comuníquese con los desarrolladores.',
            err
        });
    }
}

export { crearUsuario, login, obtenerUsuarios, buscarUsuario, eliminarUsuario, actualizarMonto };