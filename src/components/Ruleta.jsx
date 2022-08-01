import React, { useState } from 'react';
import { Wheel } from 'react-custom-roulette';
import "../styles/ruleta.css";

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

export default () => {
    const [mustSpin, setMustSpin] = useState(false);
    const [prizeNumber, setPrizeNumber] = useState(0);

    const handleSpinClick = () => {
        const newPrizeNumber = Math.floor(Math.random() * data.length);
        setPrizeNumber(newPrizeNumber);
        setMustSpin(true);
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
                }}
                spinDuration={0.1}
            />
            <button id="btnGirar" className="text-white rounded-md outline-none mt-8 py-1 px-8" onClick={handleSpinClick}>Gira!</button>
        </div>
    );
}