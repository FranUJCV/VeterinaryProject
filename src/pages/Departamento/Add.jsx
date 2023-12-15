import React, { useState } from 'react';
import Swal from 'sweetalert2';

import { collection, addDoc } from "firebase/firestore"; 
import { db } from '../../config/config.js'


const Add = ({ departamentos, setDepartamento, setIsAdding, getDepartamento }) => {
  const [department, setDepartment] = useState('');

  const handleAdd = async (e) => {
    e.preventDefault();

    const regex = /^[a-zA-Z\s]+$/;
    const regexLetra = /^(?:(?!(\w)\1).)+$/;
    const regexEspacio = /^(?:(?!\s$).)*$/;

    if (!department) {
      return Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Todos los campos son requeridos',
        showConfirmButton: true,
      });
    }

    if (!regex.test(department) ) {
      return Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'No se permiten caracteres especiales ni numeros',
        showConfirmButton: true,
      });
    } 

    if (!regexEspacio.test(department))  {
      return Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'No se permiten espacios al final de los enunciados.',
        showConfirmButton: true,
      });
    } 

    if (!regexLetra.test(department)) {
      return Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'No se permiten dos letras iguales seguidas.',
        showConfirmButton: true,
      });
    } 

    const newDepartamento = {
      department,
    };

    departamentos.push(newDepartamento);

    try {
      await addDoc(collection(db, "departamentos"), {
        ...newDepartamento
      });
    } catch (error) {
      console.log(error)
    }

    setDepartamento(departamentos);
    setIsAdding(false);
    getDepartamento()

    Swal.fire({
      icon: 'success',
      title: 'Agregado!',
      text: `La informacion de ${department} ha sido agregada.`,
      showConfirmButton: false,
      timer: 1500,
    });
  };

  return (
    <div className="small-container">
      <form onSubmit={handleAdd}>
        <h1>Agregar Departmento</h1>
        <label htmlFor="department">Nuevo Departamento</label>
        <input
          id="department"
          type="text"
          name="department"
          value={department}
          onChange={e => setDepartment(e.target.value)}
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
