import { createContext, useContext, useState, useEffect } from 'react';

const LoginContext = createContext();

export const useLogin = () => {
    return useContext(LoginContext);
}

export const LoginProvider = ({ children }) => {
    const [login, setLogin] = useState(() => {
        const savedLogin = localStorage.getItem('login');
        return savedLogin ? JSON.parse(savedLogin) : null;
    });

    useEffect(() => {
        if (login) {
            localStorage.setItem('login', JSON.stringify(login));
        } else {
            localStorage.removeItem('login');
        }
    }, [login]);

    const logout = () => {
        setLogin(null);
        localStorage.removeItem('login');
    };

    return (
        <LoginContext.Provider value={{ login, setLogin, logout }}>
            {children}
        </LoginContext.Provider>
    );
}