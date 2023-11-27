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
        time: "",
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
        console.log("HANDLE EJECUTADO")
        event.preventDefault();
        updateDataPlan();
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
                date: res.data[0].date,
                time: res.data[0].time,
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

    const updateDataPlan =()=>{
        console.log("SE LLAMÓ")
        Axios.put("http://localhost:3001/updatePlan", {
          name: state.title,
          description: state.description,
          date: state.date,
          time: state.time,
          min_price: state.initialPrice,
          max_price: state.finalPrice,
          address: state.location,
          id_plan: state.idplan,
          id_user: authUser.idUser,
        }).then((res) => {
          if (res.data.message === "Update_Plan") {
            Swal.fire({
              title: "<strong>¡Actualización correcta!</strong>",
              html:"<i>Tú información a sido actualizada con éxito</i>",
              icon:'success',
              timer:3000
            })
            navigate("/my-plans");
          }
          else{
            alert("¡Ups!, tuvimos un problema. Vuelve a intentarlo");
          }
        });
    }

    
    const title = state.title
    const description = state.description
    const date = state.date
    const time = state.time
    const initialPrice = state.initialPrice
    const finalPrice = state.finalPrice
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
                                <FormGroup className="mb-2 col-md-6">
                                    <FormLabel><strong>Título del plan:</strong></FormLabel>
                                    <Form.Control
                                        type="text"
                                        name="title"
                                        placeholder="Ingresa el título"
                                        value={title}
                                        onChange={handleInput}
                                    />
                                </FormGroup>

                                <FormGroup className="mb-3">
                                    <FormLabel><strong>Descripción:</strong></FormLabel>
                                    <Form.Control
                                        as = "textarea"
                                        rows = {5}
                                        name="description"
                                        placeholder="Ingresa una descripción"
                                        value={description}
                                        onChange={handleInput}
                                    />
                                </FormGroup>

                                <FormGroup className="mb-3">
                                    <FormLabel><strong>Ingresa la fecha:</strong></FormLabel>
                                    <Form.Control
                                        type = "date"
                                        name = "date"
                                        value = {date}
                                        onChange={handleInput}
                                    />
                                </FormGroup>

                                <FormGroup className="mb-3">
                                    <FormLabel><strong>Ingresa la hora:</strong></FormLabel>
                                    <Form.Control
                                        type = "time"
                                        name = "time"
                                        value = {time}
                                        onChange={handleInput}
                                    />
                                </FormGroup>

                                <FormGroup className="mb-3" >
                                    <FormLabel><strong>Precio mínimo:</strong></FormLabel>
                                    <Form.Control
                                        type="number"
                                        name = "initialPrice"
                                        placeholder= "¿Cuánto es el mínimo de precios (COP)?"
                                        value = {initialPrice}
                                        onChange={handleInput}
                                    />
                                </FormGroup>

                                <FormGroup className="mb-3">
                                    <FormLabel><strong>Precio máximo:</strong></FormLabel>
                                    <Form.Control
                                        type="number"
                                        name = "finalPrice"
                                        placeholder="¿Cuánto es el máximo de precios (COP)?"
                                        value = {finalPrice}
                                        onChange={handleInput}
                                    />
                                </FormGroup>

                                <FormGroup className="mb-3">
                                    <FormLabel><strong>Ubicación:</strong></FormLabel>
                                    <Form.Control
                                        type="text"
                                        name= "location"
                                        placeholder="¿En qué lugar será tu evento (dirección)?"
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