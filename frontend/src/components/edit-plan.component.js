import React, { useState } from "react";
import { useEffect } from "react";
import { useParams } from 'react-router-dom';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import '../styles/detailplans.css';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useAuth } from "../Contexts/AuthContext";
import { useNavigate  } from "react-router-dom";
import Axios from "axios";
import FormGroup from "react-bootstrap/esm/FormGroup";
import FormLabel from "react-bootstrap/esm/FormLabel";
import Swal from 'sweetalert2'


export default function EditPlan(props){

    const { idplan } = useParams();// Get the post id from the URL
    //id del usuario logueado
    const { authUser, setAuthUser, isLoggedIn, setIsLoggedIn } = useAuth();

    //Datos del plan
    const [state, setState] = useState({
        
        idplan: idplan, //cambiar esto por el parametro que reciba de la pagina principal y sale con props.id
        image: "",
        title: "",
        user: "",
        description:"",
        date: "",
        initialPrice: "",
        finalPrice: "",
        location: ""
      });
    
    const navigate = useNavigate();

    const handleInput =(event)=>{
        setState({
          ...state,
          [event.target.name]: event.target.value,
        });
    };

    const handleSubmit =(event)=>{
        event.preventDefault();
    };

    const getDetailPlan = (id)=>{
       
        Axios.get("http://localhost:3001/DetailPlan", {
            params: {
                id: id
            }
    
          }).then((res) => {
            
            setState({
                ...state,
                image: res.data[0].image,
                title: res.data[0].planName,
                description: res.data[0].description,
                date: res.data[0].date_time,
                initialPrice: res.data[0].min_price,
                finalPrice: res.data[0].max_price,
                location: res.data[0].address
              });
          });
        }
    
    useEffect(() => {
        if (authUser && authUser.idUser) {
            getDetailPlan(state.idplan);
        }
    }, [authUser]);

    
    const title = state.title
    const description = state.description
    const date_time = state.date
    const min_val = state.initialPrice
    const max_val = state.finalPrice
    const location = state.location
    return (

      <>
        <Container fluid className="ContainerDetailPlan">

            
            <Row>

            <center>
              <h1 className='Titulos'>
                Editar el plan
              </h1>
            </center>

            <Container fluid className="ContainerDetail">
                <Row>
                    <center> 
                        <div className="ContainerDetailPlan2">

                        {state.image && (
                            <img
                                className='Image-Plan' 
                                src={require(`../ImagenesPlanes/${state.image}.jpg`)} 
                                alt='ImagenPlan'
                            />
                        )}

                            <div className="InfoPlan">
                                <FormGroup className="mb-2 col-md-6" controlId="formBasicEmail">
                                    <FormLabel className="user-name"><strong>Título del plan:</strong></FormLabel>
                                    <Form.Control
                                        type="text"
                                        name="title"
                                        placeholder="Ingresa el título"
                                        value={title}
                                        onChange={handleInput}
                                    />
                                </FormGroup>

                                <FormGroup className="mb-3">
                                    <FormLabel className="user-name"><strong>Descripción:</strong></FormLabel>
                                    <Form.Control
                                        as = "textarea"
                                        rows = {5}
                                        name="title"
                                        placeholder="Ingresa el título"
                                        value={description}
                                        onChange={handleInput}
                                    />
                                </FormGroup>

                                <FormGroup className="mb-3">
                                    <FormLabel className="user-name"><strong>Ingresa la fecha:</strong></FormLabel>
                                    <Form.Control
                                        type = "date"
                                        value = {date_time}
                                        onChange={handleInput}
                                    />
                                </FormGroup>

                                <FormGroup className="mb-3">
                                    <FormLabel className="user-name"><strong>Precio mínimo:</strong></FormLabel>
                                    <Form.Control
                                        type="number"
                                        value = {min_val}
                                        onChange={handleInput}
                                    />
                                </FormGroup>

                                <FormGroup className="mb-3">
                                    <FormLabel className="user-name"><strong>Precio máximo:</strong></FormLabel>
                                    <Form.Control
                                        type="number"
                                        value = {max_val}
                                        onChange={handleInput}
                                    />
                                </FormGroup>

                                <FormGroup className="mb-3">
                                    <FormLabel className="user-name"><strong>Ubicación:</strong></FormLabel>
                                    <Form.Control
                                        type="text"
                                        value = {location}
                                        onChange={handleInput}
                                    />
                                </FormGroup>
                            </div>
                        </div>
                    </center>
                </Row>

                <Row className="ButtonsRow">
                    <Button
                        className="RemoveAccountButton"
                        onClick={handleSubmit}
                        >
                        <i class="fa-solid fa-pen-nib me-1"></i>
                        Actualizar el plan
                    </Button>
                </Row>
            </Container>
            </Row>
        </Container>
      </>
    )
}