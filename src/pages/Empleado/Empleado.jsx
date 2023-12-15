import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import Plantilla from '../../components/layout/index';
import './Empleado.css';
import Header from './Header';
import Table from './Table';
import Add from './Add';
import Edit from './Edit';

import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import { db } from '../../config/config.js'

const Dashboard = ({ setIsAuthenticated }) => {
  
  const [employees, setEmployees] = useState();
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const getEmployees = async () => {
    const querySnapshot = await getDocs(collection(db, "empleados"));
    const employees = querySnapshot.docs.map(doc => ({id: doc.id, ...doc.data()}))
    setEmployees(employees)
  }

  useEffect(() => {
    getEmployees()
  }, []);

  const handleEdit = id => {
    const [employee] = employees.filter(employee => employee.id === id);

    setSelectedEmployee(employee);
    setIsEditing(true);
  };

  const handleDelete = id => {
    Swal.fire({
      icon: 'warning',
      title: 'Estas Seguro?',
      text: "No es posible recuperar informacion eliminada!",
      showCancelButton: true,
      confirmButtonText: 'Si, Borrar!',
      cancelButtonText: 'No, No Borrar!',
    }).then(result => {
      if (result.value) {
        const [employee] = employees.filter(employee => employee.id === id);

        deleteDoc(doc(db, "empleados", id));

        Swal.fire({
          icon: 'success',
          title: 'Borrado!',
          text: `La informacion de ${employee.firstName} ${employee.lastName} ha sido borrada.`,
          showConfirmButton: false,
          timer: 1500,
        });

        const employeesCopy = employees.filter(employee => employee.id !== id);
        setEmployees(employeesCopy);
      }
    });
  };

  return (
    <Plantilla>
    <div className="container">
      {!isAdding && !isEditing && (
        <>
          <Header
            setIsAdding={setIsAdding}
            setIsAuthenticated={setIsAuthenticated}
          />
          <Table
            employees={employees}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
        </>
      )}
      {isAdding && (
        <Add
          employees={employees}
          setEmployees={setEmployees}
          setIsAdding={setIsAdding}
          getEmployees={getEmployees}
        />
      )}
      {isEditing && (
        <Edit
          employees={employees}
          selectedEmployee={selectedEmployee}
          setEmployees={setEmployees}
          setIsEditing={setIsEditing}
          getEmployees={getEmployees}
        />
      )}
    </div>
    </Plantilla>
  );

};

export default Dashboard;
