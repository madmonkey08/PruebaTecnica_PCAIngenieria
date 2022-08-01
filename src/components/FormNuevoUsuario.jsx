import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { axiosPetition } from '../helpers/Axios';

export const FormNuevoUsuario = ({ setFormulario, bandera, setBandera }) => {

    const [cedula, setCedula] = useState("");
    const [nombre, setNombre] = useState("");
    const [contrasena, setContrasena] = useState("");
    const [confirmContra, setConfirmContra] = useState("");
    const [monto, setMonto] = useState(15000);

    const registrarUsuario = async (e) => {

        e.preventDefault();

        if (confirmContra.length === 0) {
            return Swal.fire({
                title: 'Uy!',
                text: "Debes confirmar tu contraseña.",
                icon: 'error',
                confirmButtonText: 'Entendido'
            });
        }

        if (confirmContra !== contrasena) {
            return Swal.fire({
                title: 'Uy!',
                text: "Las contraseñas no coinciden.",
                icon: 'warning',
                confirmButtonText: 'Entendido'
            });
        }

        const datos = {
            cedula,
            nombre,
            contrasena,
            rol: "jugador",
            monto
        }

        const registro = await axiosPetition("/api/usuarios", datos, "POST");
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
        <div className="flex flex-col items-center justify-center ">
            <form onSubmit={registrarUsuario} className="w-96 px-16 flex flex-col justify-center items-center">
                <label className="text-white block mt-4 w-full">Cédula:</label>
                <input
                    type="number"
                    value={cedula}
                    onChange={(e) => setCedula(e.target.value)}
                    className="outline-none rounded-lg pl-3 bg-transparent text-white py-1 w-full dark:bg-gray-800"
                />
                <label className="text-white block mt-4 w-full">Nombre:</label>
                <input
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    className="outline-none rounded-lg pl-3 bg-transparent text-white py-1 w-full dark:bg-gray-800"
                />
                <label className="text-white block mt-4 w-full">Contraseña:</label>
                <input
                    type="password"
                    value={contrasena}
                    onChange={(e) => setContrasena(e.target.value)}
                    className="outline-none rounded-lg pl-3 bg-transparent text-white py-1 w-full dark:bg-gray-800"
                />
                <label className="text-white block mt-4 w-full">Confirmar contraseña:</label>
                <input
                    type="password"
                    value={confirmContra}
                    onChange={(e) => setConfirmContra(e.target.value)}
                    className="outline-none rounded-lg pl-3 bg-transparent text-white py-1 w-full dark:bg-gray-800"
                />
                <label className="text-white block mt-4 w-full">Monto:</label>
                <input
                    type="number"
                    value={monto}
                    onChange={(e) => setMonto(e.target.value)}
                    className="outline-none rounded-lg pl-3 bg-transparent text-white py-1 w-full dark:bg-gray-800"
                />
                <div className="flex mt-8">
                    <input type="submit" id="btnIngresar" className="rounded-lg text-center px-3 outline-none py-1 mr-6 cursor-pointer" value="Registrar" />
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
