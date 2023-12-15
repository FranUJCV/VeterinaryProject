import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import Plantilla from '../../components/layout/index';
import './Departamento.css';
import Header from './Header';
import Table from './Table';
import Add from './Add';
import Edit from './Edit';

import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import { db } from '../../config/config.js'

const Dashboard = ({ setIsAuthenticated }) => {
  
  const [departamentos, setDepartamento] = useState();
  const [selectedDepartamento, setSelectedDepartamento] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const getDepartamento = async () => {
    const querySnapshot = await getDocs(collection(db, "departamentos"));
    const departamentos = querySnapshot.docs.map(doc => ({id: doc.id, ...doc.data()}))
    setDepartamento(departamentos)
  }

  useEffect(() => {
    getDepartamento()
  }, []);

  const handleEdit = id => {
    const [departamento] = departamentos.filter(departamento => departamento.id === id);

    setSelectedDepartamento(departamento);
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
        const [departamento] = departamentos.filter(departamento => departamento.id === id);

        deleteDoc(doc(db, "departamentos", id));

        Swal.fire({
          icon: 'success',
          title: 'Borrado!',
          text: `La informacion de ${departamento.department} ha sido borrada.`,
          showConfirmButton: false,
          timer: 1500,
        });

        const departamentosCopy = departamentos.filter(departamento => departamento.id !== id);
        setDepartamento(departamentosCopy);
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
            departamentos={departamentos}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
        </>
      )}
      {isAdding && (
        <Add
          departamentos={departamentos}
          setDepartamento={setDepartamento}
          setIsAdding={setIsAdding}
          getDepartamento={getDepartamento}
        />
      )}
      {isEditing && (
        <Edit
          departamentos={departamentos}
          selectedDepartamento={selectedDepartamento}
          setDepartamento={setDepartamento}
          setIsEditing={setIsEditing}
          getDepartamento={getDepartamento}
        />
      )}
    </div>
    </Plantilla>
  );

};

export default Dashboard;