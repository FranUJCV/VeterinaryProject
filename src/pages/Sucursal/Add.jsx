import React, { useState } from 'react';
import Swal from 'sweetalert2';

import { collection, addDoc } from "firebase/firestore"; 
import { db } from '../../config/config.js'


const Add = ({ sucursales, setSucursales, setIsAdding, getSucursales }) => {
  const [nombre, setNombre] = useState('');
  const [gerente, setGerente] = useState('');
  const [email, setEmail] = useState('');
  const [horario, setHorario] = useState('');
  const [direccion, setDireccion] = useState('');
  const [telefono, setTelefono] = useState('');
  const [date, setDate] = useState('');

  const handleAdd = async (e) => {
    e.preventDefault();

    if (!nombre || !gerente || !email || !horario || !direccion || !telefono || !date) {
      return Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Todos los campos son requeridos',
        showConfirmButton: true,
      });
    }

    const newSucursal = {
      nombre,
      gerente,
      email,
      horario,
      direccion,
      telefono,
      date,
    };

    sucursales.push(newSucursal);

    try {
      await addDoc(collection(db, "Sucursal"), {
        ...newSucursal
      });
    } catch (error) {
      console.log(error)
    }

    setSucursales(sucursales);
    setIsAdding(false);
    getSucursales()

    Swal.fire({
      icon: 'success',
      title: 'Agregado!',
      text: `La informacion de ${nombre} ha sido agregada.`,
      showConfirmButton: false,
      timer: 1500,
    });
  };

  return (
    <div className="small-container">
      <form onSubmit={handleAdd}>
        <h1>Agregar Sucursal</h1>
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
        <label htmlFor="date">Fecha de Creacion</label>
        <input
          id="date"
          type="date"
          name="date"
          value={date}
          onChange={e => setDate(e.target.value)}
        />
        <div style={{ marginTop: '30px' }}>
          <input type="submit" value="Agregar" />
          <input
            style={{ marginLeft: '12px' }}
            className="muted-button"
            type="button"
            value="Cancelar"
            onClick={() => setIsAdding(false)}
          />
        </div>
      </form>
    </div>
  );
};

export default Add;
