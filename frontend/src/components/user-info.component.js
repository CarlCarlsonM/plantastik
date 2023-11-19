import React, { Component } from 'react';
import { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import UserInfoShowUserData from "./user-info.showuserdata.component";
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from "../Contexts/AuthContext";
import Button from 'react-bootstrap/Button';
import Axios from 'axios';
import Swal from 'sweetalert2'

//css
import '../styles/user-info.css';

export default function UserInfo() {

  const [state, setState] = useState({
    name: '',
    email: '',
    gender: '',
    age: ''

  });

  const navigate = useNavigate();

  const { authUser,
    setAuthUser,
    isLoggedIn,
    setIsLoggedIn } = useAuth();

  const handleLogOut = (event) => {

    setIsLoggedIn(false)


  }

  const deleteAccount = () => {

    const id = authUser.idUser;

    Swal.fire({
      title: "Eliminación de cuenta",
      html: "<i>¿Deseas eliminar tú cuenta?</i>",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminarla",
      cancelButtonText: "Cancelar"
    }).then(result => {
      if (result.isConfirmed) {

        Axios.delete(`http://localhost:3001/deleteUser/${id}`
        ).then((res) => {
          if (res.data.message === "User_successfully_deleted") {
            //alert("User successfully delete");
            Swal.fire(
              "Eliminación completa",
              "Tú cuenta ha sido eliminada",
              "success"
            )
            setIsLoggedIn(false);
            navigate("login");
          }
          else {
            alert("Could not delete account")
          }
        });
      }
    })
  }

  useEffect(() => {
    if (isLoggedIn) {
      Axios.post("http://localhost:3001/profile", {
        id: authUser.idUser,

      }).then((res) => {
        if (res.data.message === "Success") {
          setState({
            name: res.data.userData.name,
            email: res.data.userData.email,
            gender: res.data.userData.gender,
            age: res.data.userData.age
          });
          setAuthUser({
            idUser: res.data.userData.id_user,
            name: res.data.userData.name
          });

        }
      });
    }
  }, [isLoggedIn]);

  //la idea es que esto se cambie con los datos de la base de datos
  const name = state.name;
  const email = state.email;
  const gender = state.gender;
  const age = state.age;

  return (
    <>
      <Container fluid>
        <div className='user-info-container'>
          <Row>
            <UserInfoShowUserData
              name={name}
              email={email}
              gender={gender}
              age={age}
            />
          </Row>

          <Row className='ButtonsRow'>

            <Button className='MyPlansButton' as={Link} to="/my-plans">
              Mis Planes
            </Button>

            <Button className='CreatePlanButton' as={Link} to="/create-plan">
              Crear plan
            </Button>

            <Button className='MyInterestedPlandsButton' as={Link} to="/my-interested-plans">
              Mis Planes de Interes
            </Button>

            <Button className='UpdatePersonalDataButton' as={Link} to="/update-personal-data">
              Actualizar Datos
            </Button>
            <Button className='LogOutButton' as={Link} to="/login" onClick={handleLogOut}>
              Cerrar sesion
            </Button>
            <Button
              className="RemoveAccountButton"
              onClick={deleteAccount}
            >
              <i class="fa-solid fa-pen-nib me-1"></i>
              Eliminar Cuenta
            </Button>
          </Row>
        </div>
      </Container>
    </>
  )

}
