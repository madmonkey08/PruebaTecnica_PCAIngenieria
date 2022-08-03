import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2';
import { useNavigate } from "react-router-dom";
import { axiosPetition } from '../helpers/Axios';

export const FormIngresar = ({ setFormulario }) => {

    const [cedula, setCedula] = useState("1113692937");
    const [contrasena, setContrasena] = useState("admin");

    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem("token") !== null) {
            navigate("/");
        }
    }, []);

    const iniciarSesion = async (e) => {

        e.preventDefault();

        const peticion = await axiosPetition("/api/usuarios/login", { cedula, contrasena }, "POST");

        if (peticion.ok) {
            localStorage.setItem("token", peticion.token);
            localStorage.setItem("usuario", peticion.usuario);
            navigate("/");
        } else {
            Swal.fire({
                title: 'Ay!',
                text: peticion.msg,
                icon: 'error',
                confirmButtonText: 'Entendido'
            });
        }
    }

    return (
        <form className="flex flex-col w-full px-12 md:px-36" onSubmit={iniciarSesion}>
            <h2 className="text-md">Bienvenido a</h2>
            <h2 className="text-3xl mb-8 font-bold">Gira y gana</h2>
            <input
                name="cedula"
                type="number"
                className="rounded-full outline-none text-black py-2 px-3"
                placeholder="Ingresa tu cédula"
                value={cedula}
                onChange={(e) => {
                    setCedula(e.target.value);
                }}
            />
            <input name="contraseña"
                type="password"
                className="rounded-full outline-none text-black py-2 px-3 mt-6"
                placeholder="Ingresa tu contraseña"
                value={contrasena}
                onChange={(e) => {
                    setContrasena(e.target.value);
                }}
            />
            <input id="btnIngresar" type="submit" value="Ingresar" className="rounded-full mt-6 py-2 px-3 cursor-pointer" />
            <input
                id="btnRegistrar"
                type="submit"
                value="Registrarme!"
                className="rounded-full mt-6 py-2 px-3 cursor-pointer"
                onClick={(e) => {
                    e.preventDefault();
                    setFormulario("Registrar");
                }} />
        </form>
    )
}
