import { createContext, useContext, useState } from 'react';

const LoginContext = createContext();

export const useLogin = () => {
    return useContext(LoginContext);
}

export const LoginProvider = ({ children }) => {
    const [login, setLogin] = useState(null);
    console.log("Renderizando LoginProvider. Estado actual:", login);

    return (
        <LoginContext.Provider value={{ login, setLogin }}>
            {children}
        </LoginContext.Provider>
    );
}