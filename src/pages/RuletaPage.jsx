import React, { useEffect } from 'react'
import { NavBar } from '../components/NavBar';
import Ruleta from '../components/Ruleta';
import { useNavigate } from 'react-router-dom';

export const RuletaPage = () => {

    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem("token") === null) {
            navigate("/login");
        }
    }, []);

    return (
        <div className="w-screen h-screen overflow-hidden">
            <NavBar />
            <Ruleta />
        </div>
    );
}
