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
                monto: 15000
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
            usuario: usuario.get("nombre"),
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

export { crearUsuario, login, obtenerUsuarios };