import { createContext, useContext, useState, useEffect } from 'react';

const LoginContext = createContext();

export const useLogin = () => {
    return useContext(LoginContext);
}

export const LoginProvider = ({ children }) => {
    // FIX: Lectura robusta de localStorage con try/catch para evitar crash si el JSON está corrupto
    // Antes: JSON.parse directo podía romper la app y dejar login en estado inconsistente
    const [login, setLogin] = useState(() => {
        try {
            const savedLogin = localStorage.getItem('login');
            return savedLogin ? JSON.parse(savedLogin) : null;
        } catch {
            // Si el JSON es inválido, limpiamos y partimos sin sesión
            localStorage.removeItem('login');
            return null;
        }
    });

    // FIX: Persiste login en localStorage en cada cambio (login/logout)
    useEffect(() => {
        if (login) {
            localStorage.setItem('login', JSON.stringify(login));
        } else {
            localStorage.removeItem('login');
        }
    }, [login]);

    // FIX: Sincroniza sesión entre pestañas/ventanas (bug: al cambiar de ventana la sesión se cerraba en una y en otra seguía iniciada)
    // El evento 'storage' se dispara en las otras pestañas cuando una hace setItem/removeItem, así todas mantienen el mismo estado
    useEffect(() => {
        const onStorage = (e) => {
            if (e.key !== 'login') return;
            try {
                if (e.newValue) {
                    setLogin(JSON.parse(e.newValue));
                } else {
                    setLogin(null);
                }
            } catch {
                setLogin(null);
            }
        };
        window.addEventListener('storage', onStorage);
        return () => window.removeEventListener('storage', onStorage);
    }, []);

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