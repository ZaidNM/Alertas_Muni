import React from 'react'
import ReactDOM from 'react-dom/client'
import './main.css'
import Rutas from './rutas';
import { UserContextProvider, LoginProvider, CapProvider, AdminContextProvider } from './context/index.jsx';

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <AdminContextProvider>
      <UserContextProvider>
        <LoginProvider>
          <CapProvider>
            <Rutas />
          </CapProvider>
        </LoginProvider>
      </UserContextProvider>
    </AdminContextProvider>
  </React.StrictMode>,
)

