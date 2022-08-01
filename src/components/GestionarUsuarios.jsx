import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusSquare, faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { FormNuevoUsuario } from './FormNuevoUsuario';
import { TablaUsuarios } from './TablaUsuarios';
import { FormActualizar } from './FormActualizar';

export const GestionarUsuarios = () => {

    const [formulario, setFormulario] = useState("tabla");
    const [bandera, setBandera] = useState(false);
    const [data, setData] = useState({});

    return (
        <div className="w-full h-full flex justify-center items-start pt-36 text-white">
            <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
                <FontAwesomeIcon
                    title="Crear nuevo usuario"
                    icon={faPlusSquare}
                    className={`text-blue-500 text-2xl cursor-pointer ${formulario !== "tabla" ? "hidden" : ""}`}
                    onClick={() => setFormulario("registrar")}
                />
                <FontAwesomeIcon icon={faAngleLeft}
                    className={`text-2xl cursor-pointer ${formulario !== "registrar" && formulario !== "actualizar" ? "hidden" : ""}`}
                    onClick={() => setFormulario("tabla")} />
                {formulario === "registrar" ?
                    <FormNuevoUsuario setFormulario={setFormulario} bandera={bandera} setBandera={setBandera} />
                    :
                    formulario === "tabla" ?
                        <TablaUsuarios bandera={bandera} setFormulario={setFormulario} setData={setData} />
                        :
                        <FormActualizar setFormulario={setFormulario} bandera={bandera} setBandera={setBandera} data={data} />
                }
            </div>
        </div>
    );
}
