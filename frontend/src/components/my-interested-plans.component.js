
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useAuth } from "../Contexts/AuthContext";
import '../styles/myintplans.css';
import React, { useEffect, useState, Component } from 'react';
import Plans from './my-interested-plans.showplansdata.component.js';
import Axios from "axios";


export default function MyInterestedPlans() {
  
  const [MyInterestedPlansList, setInterestedPlans]=useState([]);
  const { authUser, setAuthUser, isLoggedIn, setIsLoggedIn } = useAuth();

  const [state, setState] = useState({
    password: "",
    email: "",
    login: false,
    errors: {},
  });


  const getMyInterestedPlans = (id)=>{
    Axios.get("http://localhost:3001/searchMyInterestedPlans", {
        params: {
            id: id
        }
    }).then((response)=>{
      setInterestedPlans(response.data);
      /*alert("Mostrando Mis Planes");*/
  })
}


    /*Código Para Generar Estrellas de Calificación*/ 
    
    const StarRating = ({rating}) => {
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

    

    
    return (
      <>
        <Container fluid className='ContenedorMisPlanesInt'>
          <Row>
            <center>
              <h1 className='Titulos'>
                Mis Planes De Interés
              </h1>
            </center>
              {
                useEffect(() => {
                  if (authUser && authUser.idUser) {
                      getMyInterestedPlans(authUser.idUser);
                  }
                }, [authUser])
              }
            {
              MyInterestedPlansList.map((val,key)=>{
                return (
                <div key={val.id_plan}>
                  <Plans
                  id_plan = {val.id_plan}
                  title={val.NombrePlan}
                  user={val.name}
                  rating={val.avg_rating}
                  description={val.description}
                  date={val.Fecha}
                  time={val.Hora}
                  location={val.address}
                  imagen={val.image}
                  state={val.state}
                />
                </div>
              
              )})
            }
          </Row>
          
          <Row>
            <Col>
            
            </Col>
          </Row>
          
        </Container>
      </>
    )
  
}
