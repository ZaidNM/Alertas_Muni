import React, { useContext, useState, createContext, useEffect } from 'react';
import { getAdminsRequest, deleteAdminRequest, createAdminRequest, getAdminRequest, updateAdminRequest } from '../api/Admin.api.js';

// Permite interactuar con el contexto
export const AdminContext = createContext();

// Hook personalizado para usar el contexto
export const useAdmins = () => {
    const context = useContext(AdminContext);
    if (!context) {
        throw new Error("useAdmins debe estar dentro de un AdminContextProvider");
    }
    return context;
}

// Agrupa todos los componentes y provee el contexto
export const AdminContextProvider = ({ children }) => {
    const [admins, setAdmins] = useState([]);


    const loadAdmins = async () => {
        try {
            const response = await getAdminsRequest();
            setAdmins(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    const deleteAdmin = async (id) => {
        try {
            await deleteAdminRequest(id);
            setAdmins(admins.filter((admin) => admin.id !== id));
        } catch (error) {
            console.log(error);
        }
    }

    const createAdmin = async (adminData) => {
        try {
            const response = await createAdminRequest(adminData);
            //setUsers([...users, response.data]); // Actualizar lista de usuarios
            console.log(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    const editAdmin = async (id) => {
        try {
            const response = await getAdminRequest(id);
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }

    const updateAdmin = async (id, newFields) => {
        try {
            const response = await updateAdminRequest(id, newFields);
            //setUsers(admins.map((admin) => (admin.id === id ? response.data : admin))); // Actualizar lista de admins
            console.log("Esto es el response:",response.data);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <AdminContext.Provider value={{ admins, loadAdmins, deleteAdmin, createAdmin, editAdmin, updateAdmin }}>
            {children}
        </AdminContext.Provider>
    );
}
