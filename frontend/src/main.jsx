import React from 'react'
import ReactDOM from 'react-dom/client'
import Registro from './paginas/registro/registro.jsx'
import Login from './paginas/login/login.jsx'
import Instrucciones from './paginas/instrucciones/instrucciones.jsx'
import Formulario from './paginas/formulario/formulario.jsx'
import Footer from './componentes/footer/footer.jsx'
import Home from './paginas/home/home.jsx';
import './styles/main.css'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <Instrucciones />
    <Formulario />
    <Registro />
    {/* <Home /> */}
    <Login />
  </React.StrictMode>,
)
