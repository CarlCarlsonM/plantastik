import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import { useAuth } from "../Contexts/AuthContext.js";
import "../styles/myplans.css";
import React, { useEffect, useState, Component } from "react";
import PlansAll from "./all-plans.showplansdata.component.js";
import Axios from "axios";

export default function AllPlans() {
  const [AllPlansList, setPlans] = useState([]);
  const { authUser, setAuthUser, isLoggedIn, setIsLoggedIn } = useAuth();

  const [state, setState] = useState({
    password: "",
    email: "",
    login: false,
    errors: {},
  });

  const getAllPlans = (id) => {
    Axios.get("http://localhost:3001/searchAllPlans", {
      params: {
        id: id,
      },
    }).then((response) => {
      setPlans(response.data);
      /*alert("Mostrando Mis Planes");*/
    });
  };

  /*Código Para Generar Estrellas de Calificación*/

  const StarRating = ({ rating }) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      let starClass = "star";
      if (rating > i) {
        starClass += " rated";
        if (rating < i + 1) {
          starClass += " partial";
          const percentage = ((rating - i) * 100).toFixed(1);
          stars.push(
            <span
              key={i}
              className={starClass}
              style={{ "--fill": `${percentage}%` }}
            >
              ★
            </span>
          );
          continue;
        }
      }
      stars.push(
        <span key={i} className={starClass}>
          ★
        </span>
      );
    }
    return <div>{stars}</div>;
  };

  return (
    <>
      <Container fluid className="ContenedorMisPlanes">
        <Row>
          <center>
            <h1 className="Titulos">Todos los Plantastik de la comunidad</h1>
          </center>
          {useEffect(() => {
            if (authUser && authUser.idUser) {
              getAllPlans(authUser.idUser);
            }
          }, [authUser])}
          {AllPlansList.map((val, key) => {
            return (
              <div key={val.id_plan}>
                <PlansAll
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
                />
              </div>
            );
          })}
        </Row>
      </Container>
    </>
  );
}
