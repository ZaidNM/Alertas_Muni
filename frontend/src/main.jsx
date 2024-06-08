import React from 'react'
import ReactDOM from 'react-dom/client'
import Header from './componentes/header/header.jsx'
import Registro from './paginas/registro/registro.jsx'
import Footer from './componentes/footer/footer'
import Home from './paginas/home/home';
import './styles/main.css'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    {/* <Header /> */}
    {/* <Registro /> */}
    <Home />
  </React.StrictMode>,
)
