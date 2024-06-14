import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './paginas/home/home'
import Registro from './paginas/registro/registro'

export default function Rutas() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path='/registro' element={<Registro />} />
                 
            <Route path="/reportes" />{/*
            <Route path="/noticias" element={<Noticias />} />
            <Route path="/destacados" element={<Destacados />} />
            <Route path="/formularios" element={<Formularios />} /> 
            <Route path="/preguntas-frecuentes" element={<P_Frecuentes />} />
            */}
            </Routes>
        </Router>

    )
}