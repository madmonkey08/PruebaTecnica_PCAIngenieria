import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import Swal from "sweetalert2";
import { axiosPetition } from "../helpers/Axios";

export const NavBar = () => {

    const [usuario, setUsuario] = useState({});

    const cedula = localStorage.getItem("usuario");

    const navigate = useNavigate();

    useEffect(() => {

        buscarUsuario();

    }, []);

    const buscarUsuario = async () => {

        const peticion = await axiosPetition(`/api/usuarios/${cedula}`);

        if (!peticion.ok) {
            navigate("/login");
        }
        setUsuario(peticion.usuario);
    }

    return (
        <ul id="navbar" className="flex w-screen items-center pl-4 text-white py-6 absolute">
            <li className="cursor-pointer pr-8 font-bold"><Link to="/">Logo</Link></li>
            <li className="cursor-pointer pr-8 hover:underline"><Link to="/">Jugar</Link></li>
            <li className={`cursor-pointer pr-8 hover:underline ${usuario.rol !== "admin" ? "hidden" : ""}`}><Link to="/usuarios">Gestionar usuarios</Link></li>
            <li
                className="cursor-pointer hover:underline"
                onClick={() => {
                    localStorage.removeItem("token");
                    localStorage.removeItem("usuario");
                    navigate("/login");
                }}><Link to="/login">Salir</Link></li>
        </ul>
    );
}
