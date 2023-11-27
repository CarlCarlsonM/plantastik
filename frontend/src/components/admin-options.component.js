// import React, { Component } from 'react';
import { useState } from "react";
// import { useEffect } from "react";
import Container from "react-bootstrap/Container";
// import UserInfoShowUserData from "./user-info.showuserdata.component";
import Row from "react-bootstrap/Row";
// import Col from "react-bootstrap/Col";
import { Link } from 'react-router-dom';
// import { useNavigate } from 'react-router-dom';
// import { useAuth } from "../Contexts/AuthContext";
import Button from 'react-bootstrap/Button';
// import Axios from 'axios';
// import Swal from 'sweetalert2'

// components
import Usrs from "./ad-opt.usrs.component";
import Plns from "./ad-opt.plns.component";

//css
import '../styles/admin-options.css'
import '../styles/user-info.css';

export default function AdminOptions() {

  // const [state, setState] = useState({
  //   name: '',
  //   email: '',
  //   gender: '',
  //   age: ''

  // });

  // const [UsersList, setUsers] = useState([]);

  // const navigate = useNavigate();

  // const { authUser,
  //   setAuthUser,
  //   isLoggedIn,
  //   setIsLoggedIn } = useAuth();

  // const handleLogOut = (event) => {

  //   setIsLoggedIn(false)


  // }

  // const SeeUsers = () => {

  //   const id = authUser.idUser;

  //   Axios.get("http://localhost:3001/seeUsers", {
  //     params: {
  //       // id: id
  //     }
  //   }).then((response) => {
  //     setUsers(response.data);
  //     /*alert("Mostrando Mis Planes");*/
  //   })

  // }

  // useEffect(() => {
  //   if (isLoggedIn) {
  //     Axios.post("http://localhost:3001/profile", {
  //       id: authUser.idUser,

  //     }).then((res) => {
  //       if (res.data.message === "Success") {
  //         setState({
  //           name: res.data.userData.name,
  //           email: res.data.userData.email,
  //           gender: res.data.userData.gender,
  //           age: res.data.userData.age
  //         });
  //         setAuthUser({
  //           idUser: res.data.userData.id_user,
  //           name: res.data.userData.name
  //         });

  //       }
  //     });
  //   }
  // }, [isLoggedIn]);

  //la idea es que esto se cambie con los datos de la base de datos
  // const name = state.name;
  // const email = state.email;
  // const gender = state.gender;
  // const age = state.age;

  const [toggle, setToggle] = useState(1)

  function updateToggle(id) {
    setToggle(id)
  }

  return (
    <>
      <Container fluid>
        <div className='user-info-container'>
          <Row>
            <div className='d-flex align-items-center justify-content-center'>
              <div className='col-6 tab p-5'>
                <ul className='d-flex'>
                  <li className='flex-fill' onClick={() => updateToggle(1)}>Ver Usuarios</li>
                  <li className='flex-fill' onClick={() => updateToggle(2)}>Ver Planes</li>
                  <li className='flex-fill' onClick={() => updateToggle(3)}>Editar Planes</li>
                  <li className='flex-fill' onClick={() => updateToggle(4)}>editar Usuarios</li>
                  <li className='flex-fill' onClick={() => updateToggle(5)}>estadísticas</li>
                </ul>
                <div className={toggle === 1 ? "show-content" : "content"}>
                  <Usrs />
                </div>
                <div className={toggle === 2 ? "show-content" : "content"}>
                  <Plns />
                </div>
                <div className={toggle === 3 ? "show-content" : "content"}>
                  <h1>Editar Planes</h1>
                  <p>aqui van todos los planes que se van a editar</p>
                </div>
                <div className={toggle === 4 ? "show-content" : "content"}>
                  <h1>Editar Usuarios</h1>
                  <p>aqui van todos los Usurios que se van que se van a editar</p>
                </div>
                <div className={toggle === 5 ? "show-content" : "content"}>
                  <Button className='UserStatistics' as={Link} to="/user-statistics">
                    Estadísticas de Usuarios
                  </Button>
                </div>
              </div>
            </div>
          </Row>
        </div>
      </Container>
    </>
  )

}
