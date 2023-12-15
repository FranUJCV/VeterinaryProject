import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import Plantilla from '../../components/layout/index';
import './Sucursal.css';
import Header from './Header';
import Table from './Table';
import Add from './Add';
import Edit from './Edit';

import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import { db } from '../../config/config.js'

const Dashboard = ({ setIsAuthenticated }) => {
  
    const [sucursales, setSucursales] = useState();
    const [selectedSucursal, setSelectedSucursal] = useState(null);
    const [isAdding, setIsAdding] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
  
    const getSucursales = async () => {
      const querySnapshot = await getDocs(collection(db, "Sucursal"));
      const sucursales = querySnapshot.docs.map(doc => ({id: doc.id, ...doc.data()}))
      setSucursales(sucursales)
      
    }
  
    useEffect(() => {
        getSucursales()
    }, []);
  
    const handleEdit = id => {
      const [sucursal] = sucursales.filter(sucursal => sucursal.id === id);
  
      setSelectedSucursal(sucursal);
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
          const [sucursal] = sucursales.filter(sucursal => sucursal.id === id);
  
          deleteDoc(doc(db, "Sucursal", id));
  
          Swal.fire({
            icon: 'success',
            title: 'Borrado!',
            text: `La informacion de ${sucursal.firstName} ${sucursal.lastName} ha sido borrada.`,
            showConfirmButton: false,
            timer: 1500,
          });
  
          const sucursalesCopy = sucursales.filter(sucursal => sucursal.id !== id);
          setSucursales(sucursalesCopy);
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
              sucursales={sucursales}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
            />
          </>
        )}
        {isAdding && (
          <Add
            sucursales={sucursales}
            setSucursales={setSucursales}
            setIsAdding={setIsAdding}
            getSucursales={getSucursales}
          />
        )}
        {isEditing && (
          <Edit
            sucursales={sucursales}
            selectedSucursal={selectedSucursal}
            setSucursales={setSucursales}
            setIsEditing={setIsEditing}
            getSucursales={getSucursales}
          />
        )}
      </div>
      </Plantilla>
    );
  
  };
  
  export default Dashboard;
  