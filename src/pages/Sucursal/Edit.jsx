import React, { useState } from 'react';
import Swal from 'sweetalert2';

import { doc, setDoc } from "firebase/firestore"; 
import { db } from '../../config/config.js'

const Edit = ({ sucursales, selectedSucursal, setSucursales, setIsEditing, getSucursales }) => {
  const id = selectedSucursal.id;

  const [nombre, setNombre] = useState(selectedSucursal.nombre);
  const [gerente, setGerente] = useState(selectedSucursal.gerente);
  const [email, setEmail] = useState(selectedSucursal.email);
  const [horario, setHorario] = useState(selectedSucursal.horario);
  const [direccion, setDireccion] = useState(selectedSucursal.direccion);
  const [telefono, setTelefono] = useState(selectedSucursal.telefono);
  const [date, setDate] = useState(selectedSucursal.date);

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!nombre || !gerente || !email || !horario || !direccion || !telefono || !date) {
      return Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Todos los campos son requeridos',
        showConfirmButton: true,
      });
    }

    const sucursal = {
      nombre,
      gerente,
      email,
      horario,
      direccion,
      telefono,
      date,
    };

    await setDoc(doc(db, "Sucursal", id), {
      ...sucursal
    });

    setSucursales(sucursales);
    setIsEditing(false);
    getSucursales()

    Swal.fire({
      icon: 'success',
      title: 'Actualizada!',
      text: `La informacion de ${sucursal.nombre} ha sido actualizada.`,
      showConfirmButton: false,
      timer: 1500,
    });
  };

  return (
    <div className="small-container">
      <form onSubmit={handleUpdate}>
      <h1>Editar Sucursal</h1>
        <label htmlFor="nombre">Nombre de Sucursal</label>
        <input
          id="nombre"
          type="text"
          name="nombre"
          value={nombre}
          onChange={e => setNombre(e.target.value)}
        />
        <label htmlFor="gerente">Gerente</label>
        <input
          id="gerente"
          type="text"
          name="gerente"
          value={gerente}
          onChange={e => setGerente(e.target.value)}
        />
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          name="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <label htmlFor="horario">Horario</label>
        <input
          id="horario"
          type="text"
          name="horario"
          value={horario}
          onChange={e => setHorario(e.target.value)}
        />
        <label htmlFor="direccion">Direccion</label>
        <input
          id="direccion"
          type="text"
          name="direccion"
          value={direccion}
          onChange={e => setDireccion(e.target.value)}
        />
        <label htmlFor="telefono">Telefono</label>
        <input
          id="telefono"
          type="number"
          name="telefono"
          value={telefono}
          onChange={e => setTelefono(e.target.value)}
        />
        <label htmlFor="date">Date</label>
        <input
          id="date"
          type="date"
          name="date"
          value={date}
          onChange={e => setDate(e.target.value)}
        />
        <div style={{ marginTop: '30px' }}>
          <input type="submit" value="Actualizar" />
          <input
            style={{ marginLeft: '12px' }}
            className="muted-button"
            type="button"
            value="Cancelar"
            onClick={() => setIsEditing(false)}
          />
        </div>
      </form>
    </div>
  );
};

export default Edit;
