import React from 'react';

const Header = ({ setIsAdding, setIsAuthenticated }) => {
  return (
    <header>
      <h1>Manejo de Sucursales</h1>
      <div style={{ marginTop: '30px', marginBottom: '18px' }}>
        <button onClick={() => setIsAdding(true)}>Agregar Sucursal</button>
      </div>
    </header>
  );
};

export default Header;
