import React from 'react'
import { TablaUsuarios } from '../components/TablaUsuarios';
import { NavBar } from '../components/NavBar';

export const UsuariosPage = () => {
    return (
        <div className="w-screen h-screen overflow-hidden">
            <NavBar />
            <TablaUsuarios />
        </div>
    );
}
