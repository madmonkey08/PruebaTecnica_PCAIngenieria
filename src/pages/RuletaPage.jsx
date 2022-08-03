import React, { useEffect, useState } from 'react'
import { NavBar } from '../components/NavBar';
import { Ruleta } from '../components/Ruleta';
import { useNavigate } from 'react-router-dom';
import { FormApuesta } from '../components/FormApuesta';
import { axiosPetition } from '../helpers/Axios';

export const RuletaPage = () => {

    const [usuario, setUsuario] = useState({});
    const cedula = localStorage.getItem("usuario");
    const [color, setColor] = useState(0);
    const [apuesta, setApuesta] = useState(0);
    const [formulario, setFormulario] = useState("apuesta");
    const [bandera, setBandera] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {

        buscarUsuario();

    }, [bandera]);

    useEffect(() => {
        if (localStorage.getItem("token") === null) {
            navigate("/login");
        }
    }, []);

    const buscarUsuario = async () => {

        const peticion = await axiosPetition(`/api/usuarios/${cedula}`);

        if (!peticion.ok) {
            navigate("/login");
        }
        setUsuario(peticion.usuario);
    }

    return (
        <div className="w-screen h-screen overflow-hidden">
            <NavBar />
            {
                formulario === "apuesta" ?
                    <FormApuesta usuario={usuario} color={color} setColor={setColor} apuesta={apuesta} setApuesta={setApuesta} setFormulario={setFormulario} />
                    :
                    <Ruleta setFormulario={setFormulario} usuario={usuario} color={color} apuesta={apuesta} setBandera={setBandera} bandera={bandera} />
            }
        </div>
    );
}
