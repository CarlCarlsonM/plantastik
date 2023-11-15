import React, { Component } from 'react';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useAuth } from "../Contexts/AuthContext";
import '../styles/myplans.css';
export default function MyPlans(props) {
    
  
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
    

    const handleClick = () => {
      alert('Abriendo Detalles del Plan');
    };
    const handleClick1 = () => {
      alert('Editar el Plan');
    };
    
    //pagina en blanco, por ahora
    return (
      <>
        <Container fluid className='Contenedor'>
          <Row>
            <center>
                <div className='Contenedor-Plan'>
                  <div className='Contenido-Plan'>
                    <h3 className='TituloPlan'>
                      {props.title}
                    </h3>
                    <p className='UsuarioPlan'>
                      {props.user}
                    </p>
                    <div className='CalificacionPlan'>
                      <StarRating rating={Math.round(props.rating*5)} />
                      <p className='NumeroCalificacion'>
                        {props.rating*5}
                      </p>
                    </div>
                    <p className='DescripcionPlan'>
                        <strong>Descripción del Plan: </strong>{props.description}
                    </p>
                    <div className='EspecificosPlan'>
                          <p className='FechaPlan'>
                            <strong>Fecha: </strong>{props.date}
                          </p>
                          <p className='HoraPlan'>
                            <strong>Hora: </strong>{props.time}
                          </p>
                          <p className='UbicacionPlan'>
                            <strong>Ubicación: </strong>{props.location}
                          </p>
                    </div>
                    <img 
                      src={require("../Iconos/editar.png")} 
                      className="BotonImagen" 
                      onClick={handleClick1} 
                      style={{cursor: 'pointer', float:'left'}}/>
                    <img 
                      src={require("../Iconos/lupa.png")} 
                      className="BotonImagen" 
                      onClick={handleClick} 
                      style={{cursor: 'pointer', float:'center'}}/>
                    <div className='ComentariosPlan'>
                          <p>
                            <strong>98 Comentarios</strong>
                          </p>
                    </div>
                  </div>
                    <img
                      className='Imagen-Plan' 
                      src={require(`../ImagenesPlanes/${props.imagen}.jpg`)} 
                      alt='ImagenPlan'/>
                </div>
            </center>
          </Row>
          
          <Row>
            <Col>
            
            </Col>
          </Row>
          
        </Container>
      </>
    )
  
}
