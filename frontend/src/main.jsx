import React from 'react'
import ReactDOM from 'react-dom/client'
import Header from './componentes/header/header.jsx'
import Registro from './paginas/registro/registro.jsx'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    {/* <Header /> */}
    <Registro />
  </React.StrictMode>,
)
