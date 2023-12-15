import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import Registro from './pages/Registro';
import Login from './pages/Login';
import Home from './pages/inicio';
import Departamento from './pages/Departamento/Departamento';
import Ciudad from './pages/Ciudad/Ciudad';
import Cliente from './pages/Cliente/Cliente';
import Colonia from './pages/Colonia/Colonia';
import DetalleVacuna from './pages/DetalleVacuna/DetalleVacuna';
import Empleado from './pages/Empleado/Empleado';
import HistoricoPuesto from './pages/HistoricoPuesto/HistoricoPuesto';
import HistoricoSucursal from './pages/HistoricoSucursal/HistoricoSucursal';
import Horario from './pages/Horario/Horario';
import Mascota from './pages/Mascota/Mascota';
import Puesto from './pages/Puesto/Puesto';
import Sucursal from './pages/Sucursal/Sucursal';
import TipoDocumento from './pages/TipoDocumento/TipoDocumento';
import Vacuna from './pages/Vacuna/Vacuna';

import { onAuthStateChanged } from 'firebase/auth'; // Importa la función onAuthStateChanged de Firebase Authentication
import { auth } from './config/config'; // Importa tu instancia de Firebase Authentication

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Utiliza onAuthStateChanged para escuchar cambios en la autenticación del usuario
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // El usuario está autenticado
        setIsLoggedIn(true);
      } else {
        // El usuario no está autenticado
        setIsLoggedIn(false);
      }
    });
  }, []);

  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/inicio" element={isLoggedIn ? <Home /> : <Navigate to="/" />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/departamentos" element={isLoggedIn ? <Departamento /> : <Navigate to="/" />} />
          <Route path="/ciudad" element={isLoggedIn ? <Ciudad /> : <Navigate to="/" />} />
          <Route path="/cliente" element={isLoggedIn ? <Cliente /> : <Navigate to="/" />} />
          <Route path="/colonia" element={isLoggedIn ? <Colonia /> : <Navigate to="/" />} />
          <Route path="/detalle-vacuna" element={isLoggedIn ? <DetalleVacuna /> : <Navigate to="/" />} />
          <Route path="/empleado" element={isLoggedIn ? <Empleado /> : <Navigate to="/" />} />
          <Route path="/historico-puesto" element={isLoggedIn ? <HistoricoPuesto /> : <Navigate to="/" />} />
          <Route path="/historico-sucursal" element={isLoggedIn ? <HistoricoSucursal /> : <Navigate to="/" />} />
          <Route path="/horario" element={isLoggedIn ? <Horario /> : <Navigate to="/" />} />
          <Route path="/mascota" element={isLoggedIn ? <Mascota /> : <Navigate to="/" />} />
          <Route path="/puesto" element={isLoggedIn ? <Puesto /> : <Navigate to="/" />} />
          <Route path="/sucursal" element={isLoggedIn ? <Sucursal /> : <Navigate to="/" />} />
          <Route path="/tipo-documento" element={isLoggedIn ? <TipoDocumento /> : <Navigate to="/" />} />
          <Route path="/vacuna" element={isLoggedIn ? <Vacuna /> : <Navigate to="/" />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
