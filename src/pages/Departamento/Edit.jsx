import React, { useState } from 'react';
import Swal from 'sweetalert2';

import { doc, setDoc } from "firebase/firestore"; 
import { db } from '../../config/config.js'

const Edit = ({ departamentos, selectedDepartamento, setDepartamento, setIsEditing, getDepartamento }) => {
  const id = selectedDepartamento.id;

  const [department, setDepartment] = useState(selectedDepartamento.department);

  const handleUpdate = async (e) => {
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
   
    const departamento = {
      department,
    };

    await setDoc(doc(db, "departamentos", id), {
      ...departamento
    });

    setDepartamento(departamentos);
    setIsEditing(false);
    getDepartamento()

    Swal.fire({
      icon: 'success',
      title: 'Actualizada!',
      text: `La informacion de ${departamento.department} ha sido actualizada.`,
      showConfirmButton: false,
      timer: 1500,
    });
  };

  return (
    <div className="small-container">
      <form onSubmit={handleUpdate}>
        <h1>Editar Empleado</h1>
        <label htmlFor="department">Departamento</label>
        <input
          id="department"
          type="text"
          name="department"
          value={department}
          onChange={e => setDepartment(e.target.value)}
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
