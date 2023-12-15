import React, { useState } from 'react';
import Swal from 'sweetalert2';

import { doc, setDoc } from "firebase/firestore"; 
import { db } from '../../config/config.js'

const Edit = ({ employees, selectedEmployee, setEmployees, setIsEditing, getEmployees }) => {
  const id = selectedEmployee.id;

  const [firstName, setFirstName] = useState(selectedEmployee.firstName);
  const [lastName, setLastName] = useState(selectedEmployee.lastName);
  const [email, setEmail] = useState(selectedEmployee.email);
  const [salary, setSalary] = useState(selectedEmployee.salary);
  const [puesto, setPuesto] = useState(selectedEmployee.puesto);
  const [date] = useState(selectedEmployee.date);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const regex = /^[a-zA-Z\s]+$/;
    const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const regexLetra = /^(?:(?!(\w)\1\1).)+$/;
    const regexEspacio = /^[^\s]+$/;

    if (!firstName || !lastName || !email || !salary || !puesto) {
      return Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Todos los campos son requeridos',
        showConfirmButton: true,
      });
    }

    if (!regex.test(firstName) || !regex.test(lastName) || !regex.test(puesto)) {
      return Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'No se permiten caracteres especiales ni numeros',
        showConfirmButton: true,
      });
    } 

    if (!regexEspacio.test(firstName) || !regexEspacio.test(lastName) || !regexEspacio.test(puesto) || !regexEspacio.test(email))  {
      return Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'No se permiten espacios al final de los enunciados.',
        showConfirmButton: true,
      });
    } 

    if (!regexLetra.test(firstName) || !regexLetra.test(lastName) || !regexLetra.test(puesto)) {
      return Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'No se permiten tres letras iguales seguidas.',
        showConfirmButton: true,
      });
    } 

    if (!regexEmail.test(email)) {
      return Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Email no Válido!',
        showConfirmButton: true,
      });
    } 

    const employee = {
      firstName,
      lastName,
      email,
      salary,
      puesto,
      date,
    };

    await setDoc(doc(db, "empleados", id), {
      ...employee
    });

    setEmployees(employees);
    setIsEditing(false);
    getEmployees()

    Swal.fire({
      icon: 'success',
      title: 'Actualizada!',
      text: `La informacion de ${employee.firstName} ${employee.lastName} ha sido actualizada.`,
      showConfirmButton: false,
      timer: 1500,
    });
  };

  return (
    <div className="small-container">
      <form onSubmit={handleUpdate}>
        <h1>Editar Empleado</h1>
        <label htmlFor="firstName">Primer Nombre</label>
        <input
          id="firstName"
          type="text"
          name="firstName"
          value={firstName}
          onChange={e => setFirstName(e.target.value)}
        />
        <label htmlFor="lastName">Apellido</label>
        <input
          id="lastName"
          type="text"
          name="lastName"
          value={lastName}
          onChange={e => setLastName(e.target.value)}
        />
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          name="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <label htmlFor="salary">Salario (L.)</label>
        <input
          id="salary"
          type="number"
          name="salary"
          value={salary}
          onChange={e => setSalary(e.target.value)}
        />
        <label htmlFor="puesto">Cargo</label>
        <input
          id="puesto"
          type="text"
          name="puesto"
          value={puesto}
          onChange={e => setPuesto(e.target.value)}
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
