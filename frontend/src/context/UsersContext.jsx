import React, { useContext, useState, createContext, useEffect } from 'react';
import { getUsersRequest, deleteUserRequest, createUserRequest, getUserRequest, updateUserRequest } from '../api/users.api.js';

// Permite interactuar con el contexto
export const UserContext = createContext();

// Hook personalizado para usar el contexto
export const useUsers = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("useUsers debe estar dentro de un UserContextProvider");
    }
    return context;
}

// Agrupa todos los componentes y provee el contexto
export const UserContextProvider = ({ children }) => {
    const [users, setUsers] = useState([]);


    const loadUsers = async () => {
        try {
            const response = await getUsersRequest();
            setUsers(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    const deleteUser = async (id) => {
        try {
            await deleteUserRequest(id);
            setUsers(users.filter((user) => user.id !== id));
        } catch (error) {
            console.log(error);
        }
    }

    const createUser = async (userData) => {
        try {
            const response = await createUserRequest(userData);
            //setUsers([...users, response.data]); // Actualizar lista de usuarios
            console.log(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    const editUser = async (id) => {
        try {
            const response = await getUserRequest(id);
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }

    const updateUser = async (id, newFields) => {
        try {
            const response = await updateUserRequest(id, newFields);
            //setUsers(users.map((user) => (user.id === id ? response.data : user))); // Actualizar lista de usuarios
            console.log(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <UserContext.Provider value={{ users, loadUsers, deleteUser, createUser, editUser, updateUser }}>
            {children}
        </UserContext.Provider>
    );
}
