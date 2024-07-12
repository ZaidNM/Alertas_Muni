import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './paginas/guestPages/home/home'
import Registro from './paginas/guestPages/registro/registro'
import PrFrecuentes from './paginas/guestPages/p-frecuentes/PrFrecuentes'
import NewsPage from './paginas/guestPages/News/NewsPage'
import Destacados from './paginas/Destacados/Destacados'
import MuniHco from './paginas/Destacados/munis/MuniHco'
import MuniAm from './paginas/Destacados/munis/MuniAm'
import MuniPM from './paginas/Destacados/munis/MuniPM'
import ScrollToTop from 'react-scroll-to-top';
import AllNews from './paginas/guestPages/News/AllNews'
import Login from './paginas/guestPages/login/login'
import Instrucciones from './paginas/guestPages/instrucciones/instrucciones'
import Formulario from './paginas/userPages/formulario/formulario'

import HomeAdmin from './paginas/adminPages/HomeAdmin';
import AllUser from './paginas/adminPages/AllUser';
import EditUser from './paginas/adminPages/EditUser.jsx';
import AllAdmin from './paginas/adminPages/AllAdmin'
import EditAdmin from './paginas/adminPages/EditAdmin.jsx'
import HomeUser from './paginas/userPages/HomeUser'
import RegistroAdmin from './paginas/adminPages/ResgistroAdmin'
import {RoutesAdmin,RoutesUser} from './ProtectedRoutes.jsx';

export default function Rutas() {
    return (
        <Router>
            <ScrollToTop smooth />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path='/registro' element={<Registro />} />
                <Route path='/login' element={<Login />} />
                <Route path='/instrucciones' element={<Instrucciones />} />
                <Route path='/formulario' element={<Formulario />} />
                <Route path="/prfrecuentes" element={<PrFrecuentes />} />
                <Route path="/noticias" element={<NewsPage />} />
                <Route path="/noticias/all-noticias" element={<AllNews />} />
                <Route path="/reportes" element={<Destacados />} />
                <Route path="/reportes/huanuco" element={<MuniHco />} />
                <Route path="/reportes/amarillis" element={<MuniAm />} />
                <Route path="/destacados/pillco-marca" element={<MuniPM />} />

                <Route element={<RoutesAdmin/>}>
                <Route path="/admin/home" element={<HomeAdmin />} />
                <Route path="/admin/all-user" element={<AllUser />} />
                <Route path="/admin/edit-user/:id" element={<EditUser />} />
                <Route path="/admin/all-admin" element={<AllAdmin />} />
                <Route path="/admin/edit-admin/:id" element={<EditAdmin />} />
                <Route path="/admin/registro" element={<RegistroAdmin />} />
                </Route>

                <Route element={<RoutesUser/>}>
                <Route path="/user/home" element={<HomeUser />} />
                </Route>

                <Route path='*' element={<div>404 Not Found</div>} />
            </Routes>
        </Router>

    )
}