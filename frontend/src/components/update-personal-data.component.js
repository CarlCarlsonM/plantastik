import React, { Component } from "react";
import { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useAuth } from "../Contexts/AuthContext";
import { useNavigate  } from "react-router-dom";
import Axios from "axios";
import Swal from 'sweetalert2'

export default function UpdateUser(props) {

  const[state,setState] = useState({
    name: "",
    gender: "",
    age: "",
  })

  const navigate = useNavigate();
  const { authUser, setAuthUser, isLoggedIn, setIsLoggedIn } = useAuth();

  const handleInput = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    updateDataUser();
  };

  const updateDataUser =()=>{
    
    Axios.put("http://localhost:3001/updateUser",{
      name:state.name,
      gender: state.gender,
      age: state.age,
      id: authUser.idUser,
    }).then((res) => {
      if (res.data.message === "Update_User") {
        Swal.fire({
          title: "<strong>¡Actualización correcta!</strong>",
          html:"<i>Tú información a sido actualizada con éxito</i>",
          icon:'success',
          timer:3000
        })
        navigate("/user-info");

        /*setAuthUser({
          name: res.data.userData.name
        })*/
      }
      else{
        alert("¡Ups!, tuvimos un problema. Vuelve a intentarlo");
      }
    });
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
        <Container fluid className="p-5">
          <div className="login-updateuserdata">
            <img
              className="defaultlogo-userimage pe-5"
              src="https://icon-library.com/images/generic-user-icon/generic-user-icon-13.jpg"
              alt="user image"
            />
            <div className="personal-information">
              <h1 className="text-center">Actualización de datos</h1> {}
              <Form.Group className="mb-2 col-md-6" controlId="formBasicEmail">
                <Form.Label className="user-name"><strong>Nombre de usuario:</strong></Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  placeholder="Ingresa tu nombre"
                  value={name}
                  onChange={handleInput}
                />
              </Form.Group>
              <Form.Group className="mb-2" controlId="formBasicPassword">
              <Form.Label className="user-gender"><strong>Género:</strong></Form.Label>
                <Form.Select
                  aria-label="Default select example"
                  name="gender"
                  value={gender}
                  onChange={handleInput}
                >
                  <option value="Masculino">Masculino</option>
                  <option value="Femenino">Femenino</option>
                  <option value="Bombastik">
                    Bombastik (no binario/prefiero no indicarlo)
                  </option>
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-2" controlId="formBasicEmail">
              <Form.Label className="user-age"><strong>Edad:</strong></Form.Label>
                <Form.Control
                  type="number"
                  name="age"
                  placeholder="Ingresa tu edad"
                  value={age}
                  onChange={handleInput}
                />
              </Form.Group>
            </div>
          </div>
          <Row className="ButtonsRow">
            <Button
              className="RemoveAccountButton"
              //as={Link}
              //to="/remove-account"
              onClick={handleSubmit}
            >
              <i class="fa-solid fa-pen-nib me-1"></i>
              Actualizar Datos
            </Button>

          </Row>
        </Container>
      </>
    );
}
