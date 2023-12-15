import React from 'react';

const Table = ({ departamentos, handleEdit, handleDelete }) => {

  return (
    <div className="contain-table">
      <table className="striped-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Departamento</th>
            <th colSpan={2} className="text-center">
              Acciones
            </th>
          </tr>
        </thead>
        <tbody>
          {departamentos ? (
            departamentos.map((departamento, i) => (
              <tr key={departamento.id}>
                <td>{departamento.id}</td>
                <td>{departamento.department}</td>
                <td className="text-right">
                  <button
                    onClick={() => handleEdit(departamento.id)}
                    className="button muted-button"
                  >
                    Editar
                  </button>
                </td>
                <td className="text-left">
                  <button
                    onClick={() => handleDelete(departamento.id)}
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
