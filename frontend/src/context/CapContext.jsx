import { createContext, useContext, useState,useEffect } from 'react';
import { captUsersRequest } from '../api/capt.api';

export const CapContext = createContext();

export const useCap = () => {
    const context = useContext(CapContext);
    if (!context) {
        throw new Error("useUsers debe estar dentro de un UserContextProvider");
    }
    return context;
}

export const CapProvider = ({ children }) => {

    const [caps, setCaps] = useState([]);

    const capLoadUsers = async () => {
        try {
            const response = await captUsersRequest();
            setCaps(response.data);
            //console.log("Datos recibidos desde la API:", response.data); // Verificar datos aquí
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        capLoadUsers();
    }, []);

    return (
        <CapContext.Provider value={{ caps, setCaps, capLoadUsers }}>
            {children}
        </CapContext.Provider>
    );
}