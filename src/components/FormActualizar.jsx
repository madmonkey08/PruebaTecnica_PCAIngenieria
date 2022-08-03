import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { axiosPetition } from '../helpers/Axios';

export const FormActualizar = ({ setFormulario, bandera, setBandera, data }) => {

    const [cedula, setCedula] = useState(data.cedula);
    const [nombre, setNombre] = useState(data.nombre);
    const [contrasena, setContrasena] = useState("");
    const [monto, setMonto] = useState(data.monto);

    const actualizarUsuario = async (e) => {

        e.preventDefault();

        const datos = {
            nombre,
            contrasena,
            monto
        }

        const registro = await axiosPetition(`/api/usuarios/${cedula}`, datos, "PUT");
        if (registro.ok) {
            Swal.fire({
                title: 'Bien hecho!',
                text: registro.msg,
                icon: 'success',
                confirmButtonText: 'Entendido'
            }).then(() => {
                setFormulario("tabla");
                setBandera(!bandera);
            })
        } else {
            Swal.fire({
                title: 'Uy!',
                text: registro.msg,
                icon: 'error',
                confirmButtonText: 'Entendido'
            });
        }
    }

    return (
        <div className="flex flex-col items-center justify-center">
            <form onSubmit={actualizarUsuario} className="w-96 px-16 flex flex-col justify-center items-center">
                <label className="text-white block mt-4 w-full">Cédula:</label>
                <input
                    type="number"
                    value={cedula}
                    onChange={(e) => setCedula(e.target.value)}
                    readOnly
                    className="outline-none rounded-lg pl-3 bg-transparent text-white py-1 w-full bg-gray-800 cursor-not-allowed"
                />
                <label className="text-white block mt-4 w-full">Nombre:</label>
                <input
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    className="outline-none rounded-lg pl-3 bg-transparent text-white bg-gray-800 py-1 w-full"
                />
                <label className="text-white block mt-4 w-full">Contraseña (opcional):</label>
                <input
                    type="password"
                    value={contrasena}
                    onChange={(e) => setContrasena(e.target.value)}
                    className="outline-none rounded-lg pl-3 bg-transparent text-white bg-gray-800 py-1 w-full"
                />
                <label className="text-white block mt-4 w-full">Monto:</label>
                <input
                    type="number"
                    value={monto}
                    onChange={(e) => setMonto(e.target.value)}
                    className="outline-none rounded-lg pl-3 bg-transparent text-white bg-gray-800 py-1 w-full"
                />
                <div className="flex mt-8">
                    <input type="submit" id="btnIngresar" className="rounded-lg text-center px-3 outline-none py-1 mr-6 cursor-pointer" value="Actualizar" />
                    <input
                        type="submit"
                        className="rounded-lg text-center px-3  bg-red-600 outline-none cursor-pointer"
                        value="Cancelar"
                        onClick={() => setFormulario("tabla")}
                    />
                </div>
            </form>
        </div>
    );
}
