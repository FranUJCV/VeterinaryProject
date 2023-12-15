import React from 'react';

const Table = ({ sucursales, handleEdit, handleDelete }) => {

  return (
    <div className="contain-table">
      <table className="striped-table">
        <thead>
          <tr>
            <th>Nombre de Sucursal</th>
            <th>Gerente</th>
            <th>Email</th>
            <th>Direccion</th>
            <th>Horario</th>
            <th>Telefono</th>
            <th>Fecha de Creacion</th>
            <th colSpan={2} className="text-center">
              Acciones
            </th>
          </tr>
        </thead>
        <tbody>
          {sucursales ? (
            sucursales.map((sucursal, i) => (
              <tr key={sucursal.id}>
                <td>{sucursal.nombre}</td>
                <td>{sucursal.gerente}</td>
                <td>{sucursal.email}</td>
                <td>{sucursal.direccion}</td>
                <td>{sucursal.horario}</td>
                <td>{sucursal.telefono}</td>
                <td>{sucursal.date} </td>
                <td className="text-right">
                  <button
                    onClick={() => handleEdit(sucursal.id)}
                    className="button muted-button"
                  >
                    Editar
                  </button>
                </td>
                <td className="text-left">
                  <button
                    onClick={() => handleDelete(sucursal.id)}
                    className="button muted-button"
                  >
                    Borrar
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={7}></td>
            </tr>
          )}
        </tbody>
      </table>
      
    </div>
  );
};

export default Table;
