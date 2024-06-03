import React from 'react'
import ReactDOM from 'react-dom/client'
import Footer from './componentes/footer/footer'
import Home from './paginas/home/home';
import './styles/main.css'

const root = ReactDOM.createRoot(document.getElementById('root'));

//<></> o <React.StrictMode></React.StrictMode>

root.render(
  <React.StrictMode>
    <Home />
  </React.StrictMode>
)