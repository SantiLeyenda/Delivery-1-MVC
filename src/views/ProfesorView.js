import React, { useState, useEffect } from "react";
import ProfesorController from "../controllers/ProfesorController";


// Esta vista muestra la vista de un profesor 
const ProfesorView = ({ user }) => {
    const [message, setMessage] = useState("");

    useEffect(() => {
        if (user) {
            checarEstatusLaptop();
        }
    }, [user]);

    // Revisa el estado de la laptop
    const checarEstatusLaptop = async () => {
        const result = await ProfesorController.checkLaptop(user);
        setMessage(result.message);
    };

    // Esto maneja el evento de solicitar una laptop
    const solicitarLaptop = async () => {
        const result = await ProfesorController.solicitarLaptop(user);
        setMessage(result.message);
    };

    return (
        <div>
            <h2>Profesor: {user.nombre}</h2>
            <button onClick={solicitarLaptop} disabled={message.includes("Laptop")}>
                Solicitar Laptop
            </button>
            {message && <p>{message}</p>}
        </div>
    );
};

export default ProfesorView;
