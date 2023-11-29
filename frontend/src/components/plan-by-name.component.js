import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import { useAuth } from "../Contexts/AuthContext.js";
import "../styles/myplans.css";
import React, { useEffect, useState, Component } from "react";
import PlanByName from "./plan-by-name.showplansdata.component.js";
import Axios from "axios";
import { useLocation } from "react-router-dom";

export default function SearchPlanByName() {
  const [PlansByName, setPlans] = useState([]);
  const { authUser, setAuthUser, isLoggedIn, setIsLoggedIn } = useAuth();

  const location = useLocation();
  const name = decodeURIComponent(location.pathname.split('/')[2]);

  const getPlanByName = () => {
    Axios.get('http://localhost:3001/searchPlanByName', {
      params: {
        name: name
      },
    }).then((response) => {
      setPlans(response.data);
    });
  };

  return (
    <>
      <Container fluid className="ContenedorMisPlanes">
        <Row>
          <center>
            <h1 className="Titulos">Todos los Plantastik de la comunidad</h1>
          </center>
          {useEffect(() => {
            console.log("Use effect");
            getPlanByName();
          }, [name])}
          {PlansByName.map((val, key) => {
            return (
              <div key={val.name}>
                <PlanByName
                  id_plan={val.id_plan}
                  title={val.NombrePlan}
                  user={val.name}
                  rating={val.avg_rating}
                  description={val.description}
                  date={val.Fecha}
                  time={val.Hora}
                  location={val.address}
                  imagen={val.image}
                  state={val.state}
                  comentarios={val.NumComentarios}
                />
              </div>
            );
          })}
        </Row>
      </Container>
    </>
  );
}