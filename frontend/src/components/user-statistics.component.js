
import Container from "react-bootstrap/Container";
import { useAuth } from "../Contexts/AuthContext";
import '../styles/userstatistics.css';
import React, { useEffect, useState, Component } from 'react';
import Axios from "axios";


export default function UserStatistics() {
  
  const [MyPlansList, setPlans]=useState([]);
  const { authUser, setAuthUser, isLoggedIn, setIsLoggedIn } = useAuth();

  const [state, setState] = useState({
    password: "",
    email: "",
    login: false,
    errors: {},
  });


  const getStatsgender = ()=>{
    Axios.get("http://localhost:3001/statsgender", {
    }).then((response)=>{
      
  })
}
    return (
      <>
        <Container fluid className='ContenedorEstadisticasUsuario'>
            <center>
                <h1 className="Titulos">
                    Estadisticas de Usuarios
                </h1>
            </center>

        </Container>
      </>
    )
  
}
