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

  const [state, setState] = useState({
    password: "",
    email: "",
    login: false,
    errors: {},
  });

  const location = useLocation();
    const name = location.pathname.split('/')[2]

    console.log('idFromPath:',location.pathname.split('/')[2]);
    console.log('idFromObjct:',name);

  const getPlanByName = () => {
    Axios.get(`http://localhost:3001/searchPlanByName`, {
      params: {
        name: "Plan 1"
      },
    }).then((response) => {
        console.log(response.data);
      setPlans(response.data);
    });
  };

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
            getPlanByName();
            console.log("Aquí");
          })}
          {/* {PlansByName.map((val, key) => {
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
          })} */}
        </Row>
      </Container>
    </>
  );
}