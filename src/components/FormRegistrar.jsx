import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { axiosPetition } from "../helpers/Axios";
import { useNavigate } from "react-router-dom";

export const FormRegistrar = ({ setFormulario }) => {

    const [cedula, setCedula] = useState("");
    const [nombre, setNombre] = useState("");
    const [contrasena, setContrasena] = useState("");
    const [confirmcontra, setConfirmContra] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem("token") !== null) {
            navigate("/");
        }
    }, []);

    const registrarUsuario = async (e) => {
        e.preventDefault();

        const datos = {
            cedula,
            nombre,
            contrasena,
            rol: "jugador"
        }

        const registro = await axiosPetition("/api/usuarios", datos, "POST");

        if (registro.ok) {
            Swal.fire({
                title: 'Bien hecho!',
                text: 'Ya estás registrado! pon aprueba tu suerte girando la ruleta!',
                icon: 'success',
                confirmButtonText: 'A girar!'
            }).then(() => {
                reiniciarForm();
                setFormulario("Ingresar");
            });
        } else {
            Swal.fire({
                title: 'Uy!',
                text: registro.msg,
                icon: 'error',
                confirmButtonText: 'Entendido'
            });
        }
    }

    const reiniciarForm = () => {
        setCedula("");
        setNombre("");
        setContrasena("");
        setConfirmContra("");
    }

    return (
        <form className="flex flex-col w-full px-36" onSubmit={registrarUsuario}>
            <h2 className="text-md">Registrate</h2>
            <h2 className="text-3xl mb-8 font-bold">Gira y gana</h2>
            <input
                name="cedula"
                type="number"
                className="rounded-full outline-none text-black py-2 px-3"
                placeholder="Ingresa tu cédula"
                value={cedula}
                onChange={(e) => setCedula(e.target.value)}
            />
            <input
                name="nombre"
                type="text"
                className="rounded-full outline-none text-black py-2 px-3 mt-6"
                placeholder="Ingresa tu nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
            />
            <input
                name="contraseña"
                type="password"
                className="rounded-full outline-none text-black py-2 px-3 mt-6"
                placeholder="Ingresa tu contraseña"
                value={contrasena}
                onChange={(e) => setContrasena(e.target.value)}
            />
            <input
                name="confirmcontraseña"
                type="password"
                className="rounded-full outline-none text-black py-2 px-3 mt-6"
                placeholder="Confirma tu contraseña"
                value={confirmcontra}
                onChange={(e) => setConfirmContra(e.target.value)}
            />
            <input id="btnIngresar" type="submit" value="Registrarme!" className="rounded-full mt-6 py-2 px-3 cursor-pointer" />
            <input
                id="btnRegistrar"
                type="submit"
                value="Ya tengo cuenta"
                className="rounded-full mt-6 py-2 px-3 cursor-pointer"
                onClick={() => setFormulario("Ingresar")} />
        </form>
    );
}
