import React from 'react';
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

export const NavBar = () => {

    const navigate = useNavigate();

    return (
        <ul id="navbar" className="flex w-screen items-center pl-4 text-white py-6 absolute">
            <li className="cursor-pointer pr-8 font-bold"><Link to="/">Logo</Link></li>
            <li className="cursor-pointer pr-4 hover:underline"><Link to="/">Jugar</Link></li>
            <li className="cursor-pointer pr-4 hover:underline"><Link to="/usuarios">Gestionar usuarios</Link></li>
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
