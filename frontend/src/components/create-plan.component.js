import React, { useState } from "react";
import { useAuth } from "../Contexts/AuthContext";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import Axios from 'axios';

export default function CreatePlan() {
  const {authUser} = useAuth(); 

  const [state, setState] = useState({
    name: "",
    description: "",
    address: "",
    avgRating: 0.0,
    date: "",
    time: "",
    state: "Programado",
    minPrice: "",
    maxPrice: "",
    image: "",
    errors: {},
  });

  const navigate = useNavigate();

  const validation = (values) => {
    let error = {};
    error.image = "";
    error.name = "";
    error.description = "";
    error.address = "";
    error.date = "";
    error.time = "";
    error.minPrice = "";
    error.maxPrice = "";

    //validar que los datos no estén vacíos
    if (!state.image.trim()) {
      error.image = "Por favor selecciona una imagen"
    }
    if (!state.name.trim()) {
      error.name = "El nombre no puede estar vacío"
    }
    if (!state.description.trim()) {
      error.description = "La descripción no puede estar vacía"
    }
    if (!state.address.trim()) {
      error.address = "La dirección no puede estar vacía"
    }
    if (!state.date.trim()) {
      error.date = "La fecha no puede estar vacía"
    }
    if (!state.time.trim()) {
      error.time = "La hora no puede estar vacía"
    }
    if (!state.minPrice.trim()) {
      error.minPrice = "El precio mínimo no puede estar vacío"
    }
    if (!state.maxPrice.trim()) {
      error.maxPrice = "El precio máximo no puede estar vacío"
    }
    return error;
  };

  const handleInput = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.value,
    })
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const errors = validation(state.image, state.name, state.description, state.address, state.date, state.time, state.minPrice, state.maxPrice)
    setState({
      ...state,
      errors: errors
    })
    if (errors.image === "" && errors.date === "" && errors.time === "" && errors.name === "" && errors.description === "" && errors.address === "" && errors.minPrice === "" && errors.maxPrice === "") {
      addPlan();
    } else {
      alert("Plan no creado")
    }

  };

  const addPlan = () => {
    Axios.post("http://localhost:3001/createplan", {
      name: state.name,
      description: state.description,
      address: state.address,
      avgRating: state.avgRating,
      date: state.date,
      time: state.time,
      state: state.state,
      minPrice: state.minPrice,
      maxPrice: state.maxPrice,
      image: state.image,
      id_user: authUser.idUser
    }).then(() => {
      Swal.fire({
        title: "<strong>¡Plan creado!</strong>",
        html: "<i><strong>Tu plan " + state.name + "</strong> fue creado con éxito</i>",
        icon: 'success',
        timer: 5000
      })
      navigate("/user-info")
    })
  };

  return (
    <>
      <Container fluid>
        <Row className="mt-4">
          <h1 class="mb-2">Crea tu plan</h1>
        </Row>
        <Row>
        <Col>
            <h5 class="mb-4">
              1. Elige una foto, para que tu plan sea más llamativo
            </h5>
            <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-2">
                  <Form.Select aria-label="Default select example" 
                    name="image" onChange={handleInput} className="w-50">
                    <option value="">Selecciona una foto</option>
                    <option value="AVION">Avion</option>
                    <option value="BAR">Bar</option>
                    <option value="FUTBOL">Fútbol</option>
                    <option value="VIDEOJUEGOS">Videojuegos</option>
                    <option value="BALONCESTO">Baloncesto</option>
                    <option value="BILLAR">Billar</option>  
                    <option value="POKER">Poker</option>  
                    <option value="PELICULA">Pelicula</option>
                    <option value="DISCOTECA">Discoteca</option>      
                    <option value="JMESA">Juegos de Mesa</option>    
                    <option value="CONCIERTO">Concierto</option>  
                    <option value="LECTURA">Lectura</option>  
                  </Form.Select>  
                  {state.errors.image && <span className="text-danger">{state.errors.image}</span>}
                </Form.Group>
              {state.image && (
                <img
                class="mb-4"
                src={require(`../ImagenesPlanes/${state.image}.jpg`)} 
                alt='ImagenPlan'
              />
              )}  
            </Form>
          </Col>
          <Col>
            <Form onSubmit={handleSubmit}>
              <h5 class="mb-4">2. Añade información importante</h5>
              <Form.Group className="mb-3">
                <Form.Control
                  type="text"
                  name="name"
                  placeholder="Dale un nombre a tu plan"
                  onChange={handleInput} />
                {state.errors.name && <span className="text-danger">{state.errors.name}</span>}
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label className="mb-0">
                  ¿En qué fecha es tu plan?
                </Form.Label>
                <Form.Control 
                  type="date" 
                  name="date"
                  onChange={handleInput} />
                {state.errors.date && <span className="text-danger">{state.errors.date}</span>}
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label className="mb-0">¿A qué hora?</Form.Label>
                <Form.Control 
                  type="time"
                  name="time"
                  onChange={handleInput} />
                {state.errors.time && <span className="text-danger">{state.errors.time}</span>}
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Control
                  type="number"
                  name="minPrice"
                  placeholder="¿Cuánto es el mínimo de precios (COP)?"
                  onChange={handleInput} />
                  {state.errors.minPrice && <span className="text-danger">{state.errors.minPrice}</span>}
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Control
                  type="number"
                  name="maxPrice"
                  placeholder="¿Cuánto es el máximo de precios (COP)?"
                  onChange={handleInput} />
                  {state.errors.maxPrice && <span className="text-danger">{state.errors.maxPrice}</span>}
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Control
                  type="text"
                  name="address"
                  placeholder="¿En qué lugar será tu evento (dirección)?"
                  onChange={handleInput} />
                  {state.errors.address && <span className="text-danger">{state.errors.address}</span>}
              </Form.Group>
            </Form>
          </Col>
        </Row>
        <Row>
          <Form onSubmit={handleSubmit}>
            <h5 class="mb-4">3. Agrega una descripción</h5>
            <Form.Group className="mb-3">
              <Form.Control
                as="textarea"
                rows={5}
                type="text"
                name="description"
                placeholder="Descripción"
                onChange={handleInput} />
                  {state.errors.description && <span className="text-danger">{state.errors.description}</span>}
            </Form.Group>
            <div className="d-grid gap-2 mb-4">
              <input
                className="btn btn-success"
                size="lg"
                type="submit"
                value="Confirmar"
              />
            </div>
          </Form>
        </Row>
      </Container>
    </>
  );
}
