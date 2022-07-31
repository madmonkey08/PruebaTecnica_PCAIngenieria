import React, { useState } from 'react';
import "../styles/login.css";
import { FormIngresar } from './FormIngresar';
import { FormRegistrar } from './FormRegistrar';

export const Login = () => {

    const [formulario, setFormulario] = useState("Ingresar");

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 text-white overflow-hidden">
            <div id="col-izq" className="h-screen flex pt-40 justify-center text-white">
                {
                    formulario === "Ingresar" ?
                        <FormIngresar setFormulario={setFormulario} />
                        :
                        <FormRegistrar setFormulario={setFormulario} />
                }
            </div>
            <div id="col-der" className="h-screen hidden md:block">
            </div>
        </div>
    );
}
