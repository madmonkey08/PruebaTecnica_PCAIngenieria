import React, { useEffect } from 'react';
import Swal from 'sweetalert2';
import { axiosPetition } from '../helpers/Axios';
import "../styles/formapuesta.css";

export const FormApuesta = ({ usuario, color = 0, apuesta = 0, setColor, setApuesta, setFormulario }) => {

    useEffect(() => {

        resetarJuego();

        if (usuario.monto <= 1000) {
            setApuesta(100);
        }
    }, [usuario]);

    const resetarJuego = () => {
        setColor(0);
        setApuesta(0);
    }

    const restarDinero = async () => {

        let monto = usuario.monto - (Math.floor(usuario.monto * (apuesta / 100)));

        const peticion = await axiosPetition(`/api/usuarios/monto/${usuario.cedula}`, { monto }, "PUT");

        if (!peticion.ok) {
            return Swal.fire({
                title: 'Uy!',
                text: peticion.msg,
                icon: 'error',
                confirmButtonText: 'Entendido'
            }).then(() => {
                resetarJuego();
            })
        }

        setFormulario("ruleta");

    }

    return (
        <div className="flex flex-col mt-24 md:pl-24 w-full items-center justify-center">
            <form className={`flex flex-col w-60 mt-12 text-white md:w-96 ${usuario.monto <= 0 ? "hidden" : ""}`}>
                <h2 className="text-white text-xl font-bold">Hola, {usuario.nombre}!</h2>
                <h2 className="text-white text-xl">Haz tu apuesta y buena suerte</h2>
                <label className="mt-8">¿Qué color caerá?</label>
                <select
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                    className="outline-none rounded-lg pl-3 mt-2 bg-transparent py-1 w-full bg-gray-800 text-white"
                >
                    <option value="0" onClick={() => setColor(0)} className="text-white">Selecciona una opción</option>
                    <option value="Rojo" onClick={() => setColor("Rojo")}>Rojo - Ganas el doble - 49.5% de probabilidad</option>
                    <option value="Negro" onClick={() => setColor("Negro")}>Negro - Ganas el doble - 49.5% de probabilidad</option>
                    <option value="Verde" onClick={() => setColor("Verde")}>Verde - Ganas el décuple - 1% de probabilidad</option>
                </select>
                <label className="mt-4">Tu dinero actual es</label>
                <input value={usuario.monto || "0"} className="outline-none rounded-lg pl-3 mt-2 bg-transparent py-1 w-full bg-gray-800 text-white cursor-not-allowed" readOnly />
                <label className="mt-4">¿Cuánto vas a apostar?</label>
                {
                    usuario.monto > 1000 ?
                        <select
                            value={apuesta}
                            onChange={(e) => setApuesta(e.target.value)}
                            className="outline-none rounded-lg pl-3 mt-2 bg-transparent py-1 w-full bg-gray-800 text-white">
                            <option value="0" onClick={() => setApuesta(0)}>Selecciona una opción</option>
                            <option value="100" onClick={() => { setApuesta(100) }}>All In COP {usuario.monto}</option>
                            <option value="11" onClick={() => setApuesta(11)}>11% COP {Math.floor(usuario.monto * (11 / 100))}</option>
                            <option value="12" onClick={() => setApuesta(12)}>12% COP {Math.floor(usuario.monto * (12 / 100))}</option>
                            <option value="13" onClick={() => setApuesta(13)}>13% COP {Math.floor(usuario.monto * (13 / 100))}</option>
                            <option value="14" onClick={() => setApuesta(14)}>14% COP {Math.floor(usuario.monto * (14 / 100))}</option>
                            <option value="15" onClick={() => setApuesta(15)}>15% COP {Math.floor(usuario.monto * (15 / 100))}</option>
                            <option value="16" onClick={() => setApuesta(16)}>16% COP {Math.floor(usuario.monto * (16 / 100))}</option>
                            <option value="17" onClick={() => setApuesta(17)}>17% COP {Math.floor(usuario.monto * (17 / 100))}</option>
                            <option value="18" onClick={() => setApuesta(18)}>18% COP {Math.floor(usuario.monto * (18 / 100))}</option>
                            <option value="19" onClick={() => setApuesta(19)}>19% COP {Math.floor(usuario.monto * (19 / 100))}</option>
                        </select>
                        :
                        <input className="outline-none rounded-lg pl-3 mt-2 bg-transparent py-1 w-full cursor-not-allowed bg-gray-800 text-white" readOnly value={"All In - " + usuario.monto} />
                }
                <input
                    id="btnIngresar"
                    type="submit"
                    value="A jugar!"
                    className="outline-none rounded-lg pl-3 mt-8 bg-transparent py-1 w-full text-white cursor-pointer"
                    onClick={(e) => {

                        e.preventDefault();

                        if (color === 0 || color === "0") {
                            return Swal.fire({
                                title: 'Espera!',
                                text: "Debes seleccionar el color que crees que caerá.",
                                icon: 'warning',
                                confirmButtonText: 'Entendido'
                            });
                        }

                        if (apuesta === 0 || apuesta === "0") {
                            return Swal.fire({
                                title: 'Espera!',
                                text: "Debes seleccionar el porcentaje que quieres apostar.",
                                icon: 'warning',
                                confirmButtonText: 'Entendido'
                            });
                        }
                        restarDinero();
                    }
                    }
                />
            </form>
            <div className={`flex flex-col w-72 mt-12 text-white md:w-96 ${usuario.monto <= 0 ? "" : "hidden"}`}>
                <h2 className="text-white text-xl font-bold">Hola, {usuario.nombre}!</h2>
                <h2 className="text-white text-xl">No tienes fondos suficientes para jugar 😔.</h2>
                <br />
                <h2 className="text-white text-xl">Pide al administrador que recargue tu monto en el módulo de gestionar usuarios 😁.</h2>
            </div>
        </div>
    );
}
