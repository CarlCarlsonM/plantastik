import React, { useState } from "react";
import { useEffect } from "react";
import { useParams } from 'react-router-dom';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import '../styles/detailplans.css';
import { useAuth } from "../Contexts/AuthContext";
import Axios from "axios";


export default function DetailPlan(props) {

    const { idplan } = useParams(); // Get the post id from the URL
    //id del usuario logueado
    const { authUser,
        setAuthUser,
        isLoggedIn,
        setIsLoggedIn } = useAuth();

    const [interested, setInterested] = useState(false)
    //Datos del plan
    const [state, setState] = useState({
        
        idplan: idplan, //cambiar esto por el parametro que reciba de la pagina principal y sale con props.id
        image: "",
        rating: 0,
        title: "",
        user: "",
        description:"",
        date: "",
        initialPrice: "",
        finalPrice: "",
        location: ""
      });

      
        
    
    //DEJAR DE ESTAR INTERESADO
    const NotInterested = () => {

        //borrar registro
        Axios.delete(`http://localhost:3001/NotInterested`,{
            params: {
                idplan: state.idplan,
                iduser: authUser.idUser,
            }   
        }).then((res) => {
            
          if (res.data.message === "succesful_delete") {
            //alert("User successfully delete");
            setInterested(false);
          }
          else {
            alert("Could not delete register")
          }
        }); 
    }
    //INTERESARSE EN EL PLAN
    const BeInterested = () => {
        //agregar registro
        
        Axios.post(`http://localhost:3001/BeInterested`,{
            
                idplan: state.idplan,
                iduser: authUser.idUser,
               
        }).then((res) => {
            
          if (res.data.message === "succesful_add") {
            //alert("User successfully delete");
            setInterested(true);
          }
          else {
            alert("not added as interested");
          }
        });
        
    }
    const getDetailPlan = (id)=>{
       
        Axios.get("http://localhost:3001/DetailPlan", {
            params: {
                id: id
            }
    
          }).then((res) => {
            
            setState({
                ...state,
                image: res.data[0].image,
                rating:res.data[0].avg_rating,
                title: res.data[0].planName,
                user: res.data[0].name,
                description: res.data[0].description,
                date: res.data[0].date_time,
                initialPrice: res.data[0].min_price,
                finalPrice: res.data[0].max_price,
                location: res.data[0].address
              });

              Interested(state.idplan, authUser.idUser);
          });
        }   
    //ver si esta interesado. si si cambiar el icono de interesado
    const Interested = (idplan,iduser)=>{
        
        Axios.get("http://localhost:3001/Interested", {
            params: {
                idplan: idplan,
                iduser: iduser,
            }

            }).then((res) => {
                
                
                if(res.data.message === "Interested"){
                    
                    setInterested(true);
                } else {
                    
                    setInterested(false);
                  }

            });
        }

    const StarRating = ({rating}) => {
        // Limita la calificación a un máximo de 5
        rating = Math.min(rating, 5);
        
        const stars = [];
        for (let i = 0; i < 5; i++) {
          let starClass = 'star';
          if (rating > i) {
            starClass += ' rated';
            if (rating < i+1) {
              starClass += ' partial';
              const percentage = ((rating - i) * 100).toFixed(1);
              stars.push(<span key={i} className={starClass} style={{'--fill': `${percentage}%`}}>★</span>);
              continue;
            }
          }
          stars.push(<span key={i} className={starClass}>★</span>);
        }
        return <div>{stars}</div>;
      };
    
    useEffect(() => {
        if (authUser && authUser.idUser) {
        
            getDetailPlan(state.idplan);
        }
    }, [authUser]);

    

    return (

      <>
        <Container fluid className="ContainerDetailPlan">

            
            <Row>

            <center>
              <h1 className='Titulos'>
                Detalle del plan
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

                            

                        
                                {interested ?(
                                            <img 
                                            src={require("../Iconos/interested.png")} 
                                            className="BotonImagen" 
                                            onClick={NotInterested}
                                            style={{cursor: 'pointer', float:'right'}}/>
                                        ) : (
                                                <img 
                                            src={require("../Iconos/notinterested.png")} 
                                            className="BotonImagen" 
                                            onClick={BeInterested}
                                            style={{cursor: 'pointer', float:'right'}}/>
                                            
                                        )}
                            
                                <h3 className='PlanTitle'>
                                    {state.title}
                                </h3>

                                <p className='PlanUser'>
                                <strong>Creado por: </strong>{state.user}
                                </p>

                                <div className='PlanStars'>
                                    <StarRating rating={Math.round(state.rating*5)} />
                                    <p className='CalificationNumber'>
                                        {state.rating*5}
                                    </p>
                                </div>
                            
                                <p className='PlanDescription'>
                                    {state.description}
                                </p>

                                <div className="PlanSpecificData">
                                    <p className='Date'>
                                        <strong> Fecha:</strong> {state.date}
                                    </p>
                                    <p className='StartTime'>
                                        <strong> Precio minimo:</strong> {state.initialPrice}
                                    </p>
                                    <p className='EndTime'>
                                        <strong> Precio maximo:</strong> {state.finalPrice}
                                    </p>

                                    <p className='Location'>
                                        <strong> Ubicacion:</strong> {state.location}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </center>
                </Row>
            </Container>
            </Row>
        <Row>
            <Col>
            
            </Col>
        </Row>
          
        </Container>
      </>
    )
}