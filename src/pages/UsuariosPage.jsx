import React, { useEffect } from 'react';
import { GestionarUsuarios } from '../components/GestionarUsuarios';
import { NavBar } from '../components/NavBar';
import { useNavigate } from 'react-router-dom';

export const UsuariosPage = () => {

    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem("token") === null) {
            navigate("/login");
        }
    }, []);

    return (
        <div className="w-screen h-screen overflow-hidden">
            <NavBar />
            <GestionarUsuarios />
        </div>
    );
}
