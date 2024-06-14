import React from 'react'
import ReactDOM from 'react-dom/client'
import './styles/main.css'
import Rutas from './rutas';

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <Rutas />
  </React.StrictMode>,
)
