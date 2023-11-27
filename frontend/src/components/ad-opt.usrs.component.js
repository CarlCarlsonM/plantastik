import React, { Component } from 'react';
import { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import UserInfoShowUserData from "./user-info.showuserdata.component";
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from "../Contexts/AuthContext";
import Button from 'react-bootstrap/Button';
import Axios from 'axios';
import Swal from 'sweetalert2'

// reactstrap
import PopEdit from './popEditUsr'

//css
import '../styles/admin-options.css'
import '../styles/user-info.css';

export default function Usrs() {
  const [state, setState] = useState({
    name: '',
    email: '',
    gender: '',
    age: ''

  });

  const [UsersList, setUsers] = useState([]);

  const navigate = useNavigate();

  const { authUser,
    setAuthUser,
    isLoggedIn,
    setIsLoggedIn } = useAuth();

  const handleLogOut = (event) => {

    setIsLoggedIn(false)


  }

  const SeeUsers = () => {
    const id = authUser.idUser;

    Axios.get("http://localhost:3001/seeUsers", {
      params: {
        // id: id
      }
    }).then((response) => {
      setUsers(response.data);
      /*alert("Mostrando users");*/
    })

  }

  const delUsr = (i) => {
    const id = i;

    Axios.delete(`http://localhost:3001/deleteUser/${id}`
    ).then((response) => {
      setUsers(response.data);
      /*alert("Mostrando users");*/
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

  const [toggle, setToggle] = useState(1)

  function updateToggle(id) {
    setToggle(id)
  }

  return (
    <>
      <Container fluid className='ContenedorMisPlanes'>
        <Row>
          <center>
            <h1 className='Titulos'>
              Usuarios
            </h1>
          </center>
          {
            useEffect(() => {
              if (authUser && authUser.idUser) {
                SeeUsers();
              }
            }, [authUser])
          }
          {
            UsersList.map((val, key) => {
              return (

                // <div>
                // <Container>

                // <Row>

                // </Row>
                // </Container>
                // </div>

                <div key={val.id_user}>
                  <Row>
                    <Col>
                      nombreUsuario = {val.name}
                    </Col>
                    <Col>
                      idUser={val.id_user}
                    </Col>
                    <Col>
                      {/* <ul className='d-flex'>
                        <li className='flex-fill' onClick={() => delUsr(val.id_user)}>Eliminar</li>
                        <li className='flex-fill' as={Link} to="/update-personal-data">Editar</li>
                        <li className='flex-fill' >
                          <Button className='SmallButton' as={Link} to="/update-personal-data">
                            Editar
                          </Button> 
                        </li>
                      </ul> */}
                          <PopEdit />
                    </Col>
                  </Row>

                </div>

              )
            })
          }
        </Row>

        <Row>
          {/* <Col>
  
</Col> */}
        </Row>

      </Container>
    </>
  )

}



