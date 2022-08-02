import React, { useEffect, useState } from 'react';
import { Wheel } from 'react-custom-roulette';
import Swal from 'sweetalert2';
import { axiosPetition } from '../helpers/Axios';
import "../styles/ruleta.css";

export const Ruleta = ({ setFormulario, usuario, color, apuesta, setBandera, bandera }) => {

    const [mustSpin, setMustSpin] = useState(false);
    const [prizeNumber, setPrizeNumber] = useState(0);

    const actualizarMonto = async (color) => {

        let monto;
        let ganado;
        let dineroApostado = Math.floor(usuario.monto * (apuesta / 100));

        if (color === "Rojo" || color === "Negro") {
            ganado = dineroApostado * 2;
            monto = (usuario.monto - dineroApostado) + ganado;
        } else {
            ganado = dineroApostado * 10;
            monto = (usuario.monto - dineroApostado) + ganado;
        }

        const peticion = await axiosPetition(`/api/usuarios/monto/${usuario.cedula}`, { monto }, "PUT");

        if (!peticion.ok) {
            return Swal.fire({
                title: 'Uy!',
                text: peticion.msg,
                icon: 'error',
                confirmButtonText: 'Entendido'
            }).then(() => {
                setFormulario("apuesta");
                setBandera(!bandera);
            });
        }

        return Swal.fire({
            title: 'Felicitaciones! 🥳',
            text: `Has acertado en tu apuesta! Monto anterior: ${usuario.monto} Dinero apostado: ${dineroApostado} Dinero ganado: ${ganado} Monto actual: ${monto} Has ${color === "Rojo" || color === "Negro" ? "duplicado" : "aumentado diez veces"} lo apostado!`,
            icon: "success",
            confirmButtonText: 'Volver'
        }).then(() => {
            setFormulario("apuesta");
            setBandera(!bandera);
        });
    }

    const data = [
        { option: '🥳', style: { backgroundColor: "#00b54f", textColor: "white" } },
        { option: '🔥', style: { backgroundColor: "#1b1b1b", textColor: "white" } },
        { option: '😎', style: { backgroundColor: "#dc143c", textColor: "white" } },
        { option: '🔥', style: { backgroundColor: "#1b1b1b", textColor: "white" } },
        { option: '😎', style: { backgroundColor: "#dc143c", textColor: "white" } },
        { option: '🔥', style: { backgroundColor: "#1b1b1b", textColor: "white" } },
        { option: '😎', style: { backgroundColor: "#dc143c", textColor: "white" } },
        { option: '🔥', style: { backgroundColor: "#1b1b1b", textColor: "white" } },
        { option: '😎', style: { backgroundColor: "#dc143c", textColor: "white" } },
        { option: '🔥', style: { backgroundColor: "#1b1b1b", textColor: "white" } },
        { option: '😎', style: { backgroundColor: "#dc143c", textColor: "white" } },
    ]

    const handleSpinClick = () => {
        const newPrizeNumber = Math.floor(Math.random() * data.length);
        setPrizeNumber(newPrizeNumber);
        setMustSpin(true);
    }

    const determinarResultado = async () => {

        if (prizeNumber !== 0 && prizeNumber % 2 === 0) {
            if (color === "Rojo") {
                actualizarMonto(color);
            }
        } else if (prizeNumber !== 0 && prizeNumber % 2 !== 0) {
            if (color === "Negro") {
                actualizarMonto(color);
            }
        } else if (prizeNumber === 0) {
            if (color === "Verde") {
                actualizarMonto(color);
            }
        }

        return Swal.fire({
            title: 'Uy!',
            text: "Más suerte a la próxima! \n No le atinaste esta vez, inténtalo de nuevo!",
            icon: 'error',
            confirmButtonText: 'Entendido'
        }).then(() => {
            setFormulario("apuesta");
            setBandera(!bandera);
        });

    }

    return (
        <div className="w-screen h-full flex flex-col items-center justify-center">
            <Wheel
                mustStartSpinning={mustSpin}
                prizeNumber={prizeNumber}
                data={data}
                innerBorderWidth={0}
                radiusLineWidth={1}
                radiusLineColor="#001118"
                outerBorderWidth={0}
                onStopSpinning={() => {
                    setMustSpin(false);
                    determinarResultado();
                }}
                spinDuration={0.8}
            />

            <div className="flex">
                <div className="flex flex-col absolute text-white left-8 bottom-4">
                    <p>Apostaste COP {Math.floor(usuario.monto * (apuesta / 100))} al color {color}</p>
                </div>
                <button id="btnGirar" className="text-white rounded-md outline-none mt-8 py-1 px-8 mr-4" onClick={handleSpinClick}>Gira!</button>
                <button
                    className="text-white rounded-md outline-none mt-8 py-1 px-4 bg-red-600"
                    onClick={() => {
                        setFormulario("apuesta");
                        setBandera(!bandera);
                    }}
                >Cancelar</button>
            </div>
        </div>
    );
}