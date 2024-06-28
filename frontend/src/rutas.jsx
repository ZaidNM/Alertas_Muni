import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './paginas/home/home'
import Registro from './paginas/registro/registro'
import PrFrecuentes from './paginas/p-frecuentes/PrFrecuentes'
import NewsPage from './paginas/News/NewsPage'
import Destacados from './paginas/Destacados/Destacados'
import MuniHco from './paginas/Destacados/munis/MuniHco'
import MuniAm from './paginas/Destacados/munis/MuniAm'
import MuniPM from './paginas/Destacados/munis/MuniPM'
import ScrollToTop from 'react-scroll-to-top';
import AllNews from './paginas/News/AllNews'
import Login from './paginas/login/login'
import Instrucciones from './paginas/instrucciones/instrucciones'
import Formulario from './paginas/formulario/formulario'

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
                <Route path="/noticias" element={<NewsPage/>}/>
                <Route path="/noticias/all-noticias" element={<AllNews />} />
                <Route path="/reportes" element={<Destacados />}/>
                <Route path="/reportes/huanuco" element={<MuniHco/>} />
                <Route path="/reportes/amarillis" element={<MuniAm/>} />
                <Route path="/destacados/pillco-marca" element={<MuniPM />} />
                <Route path="/admin" element={<div>Holaaaa admi</div>} />
                {/* <Route path="/home-admin" element={<Home />} /> */}
                <Route path='*' element={<div>404 Not Found</div>} />
            </Routes>
        </Router>

    )
}