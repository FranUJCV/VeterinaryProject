import React, { useState } from 'react';
import Swal from 'sweetalert2';

import { collection, addDoc } from "firebase/firestore"; 
import { db } from '../../config/config.js'


const Add = ({ employees, setEmployees, setIsAdding, getEmployees }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [salary, setSalary] = useState('');
  const [puesto, setPuesto] = useState('');
  const [date, setDate] = useState('');

  const handleAdd = async (e) => {
    e.preventDefault();

    const regex = /^[a-zA-Z\s]+$/;
    const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const regexLetra = /^(?:(?!(\w)\1\1).)+$/;
    const regexEspacio = /^[^\s]+$/;


    if (!firstName || !lastName || !email || !salary || !puesto || !date) {
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

    

    const differenceInMilliseconds = Date.now() - new Date(date);
    const differenceInDays = Math.floor(differenceInMilliseconds / (1000 * 60 * 60 * 24));
    console.log(differenceInDays);
    console.log(new Date(date));
    if (differenceInDays>3 || differenceInDays<-3 ) {
      return Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'La Fecha de Inicio no puede ser mayor o menor a tres dias!',
        showConfirmButton: true,
      });
    } 

    const newEmployee = {
      firstName,
      lastName,
      email,
      salary,
      puesto,
      date,
    };

    employees.push(newEmployee);

    try {
      await addDoc(collection(db, "empleados"), {
        ...newEmployee
      });
    } catch (error) {
      console.log(error)
    }

    setEmployees(employees);
    setIsAdding(false);
    getEmployees()

    Swal.fire({
      icon: 'success',
      title: 'Agregado!',
      text: `La informacion de ${firstName} ${lastName} ha sido agregada.`,
      showConfirmButton: false,
      timer: 1500,
    });
  };

  return (
    <div className="small-container">
      <form onSubmit={handleAdd}>
        <h1>Agregar Empleado</h1>
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
        <label htmlFor="date">Fecha de Inicio</label>
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
