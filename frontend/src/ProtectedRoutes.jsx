import {Navigate, Outlet} from 'react-router-dom';
import {useLogin} from './context/LoginContext';


export function RoutesAdmin({children}) {

    const { login } = useLogin();

    if (!login || !login.isAdmin) {
        return <Navigate to="/" />;
    }

    return children ? children : <Outlet />;
}

export function RoutesUser({ children }) {
    const { login } = useLogin();

    if (!login || login.isAdmin) {
        return <Navigate to="/" />;
    }

    return children ? children : <Outlet />;
}

