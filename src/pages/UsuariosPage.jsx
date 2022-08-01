import React from 'react'
import { GestionarUsuarios } from '../components/GestionarUsuarios';
import { NavBar } from '../components/NavBar';

export const UsuariosPage = () => {
    return (
        <div className="w-screen h-screen overflow-hidden">
            <NavBar />
            <GestionarUsuarios />
        </div>
    );
}
