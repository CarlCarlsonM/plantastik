import React, { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "../styles/detailplans.css";
import { useAuth } from "../Contexts/AuthContext";
import Axios from "axios";
import Card from "react-bootstrap/Card";
import Swal from "sweetalert2";

export default function DetailPlan(props) {
  const { idplan } = useParams(); // Get the post id from the URL
  //id del usuario logueado
  const { authUser, setAuthUser, isLoggedIn, setIsLoggedIn } = useAuth();

  const [interested, setInterested] = useState(false);

  const [commentList, setCommentList] = useState([]);
  //Datos del plan
  const [state, setState] = useState({
    idplan: idplan, //cambiar esto por el parametro que reciba de la pagina principal y sale con props.id
    image: "",
    rating: 0,
    title: "",
    user: "",
    description: "",
    date: "",
    initialPrice: "",
    finalPrice: "",
    location: "",
    state: "",
  });

  const [body, setBody] = useState({
    ratingPlanes: 0,
    comment: "",
  });

  const handleInput = (event) => {
    setBody({
      ...body,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    Axios.post(`http://localhost:3001/userCommentsValidation`, {
      idplan: state.idplan,
      iduser: authUser.idUser,
    }).then((res) => {
      const count = res.data[0].conteo;
      console.log(state.validate);

      if (count > 0) {
        Swal.fire({
          title:
            "<strong>¡Tú ya publicaste un comentario en este plan!</strong>",
          html: "<i></i>",
          icon: "warning",
          timer: 3000,
        });
        
      } else {
        addComment();
        getDetailPlan(state.idplan);
      }
    });
  };

  const addComment = () => {
    Axios.post(`http://localhost:3001/ratingPlan`, {
      idplan: state.idplan,
      iduser: authUser.idUser,
      rating: body.ratingPlanes,
      comment: body.comment,
    }).then((res) => {
      if (res.data.message === "succesful_insert") {
        Swal.fire({
          title: "<strong>¡Comentario exitoso!</strong>",
          html: "<i>Tú comentario a sido guarddado con éxito</i>",
          icon: "success",
          timer: 3000,
        });
        listData();
        updateRantingPlan();
      } else {
        alert("Tuvimos un problema");
      }
    });
  };

  const updateRantingPlan = () => {
    Axios.put(`http://localhost:3001/updateRating`, {
      idplan: state.idplan
    }).then((res) => {
      if (res.data.message === "succesful_insert") {
        console.log("Bien");
        getDetailPlan(state.idplan);
      } else {
        alert("Tuvimos un problema");
      }
    });
  };

  const listData = () => {
    Axios.post(`http://localhost:3001/listarData`, {
      idplan: state.idplan,
    }).then((res) => {
      setCommentList(res.data);
    });
  };

  //DEJAR DE ESTAR INTERESADO
  const NotInterested = () => {
    //borrar registro
    Axios.delete(`http://localhost:3001/NotInterested`, {
      params: {
        idplan: state.idplan,
        iduser: authUser.idUser,
      },
    }).then((res) => {
      if (res.data.message === "succesful_delete") {
        //alert("User successfully delete");
        setInterested(false);
      } else {
        alert("Could not delete register");
      }
    });
  };
  //INTERESARSE EN EL PLAN
  const BeInterested = () => {
    //agregar registro

    Axios.post(`http://localhost:3001/BeInterested`, {
      idplan: state.idplan,
      iduser: authUser.idUser,
    }).then((res) => {
      if (res.data.message === "succesful_add") {
        //alert("User successfully delete");
        setInterested(true);
      } else {
        alert("not added as interested");
      }
    });
  };

  const getDetailPlan = (id) => {
    Axios.get("http://localhost:3001/DetailPlan", {
      params: {
        id: id,
      },
    }).then((res) => {
      setState({
        ...state,
        image: res.data[0].image,
        rating: res.data[0].avg_rating,
        title: res.data[0].planName,
        user: res.data[0].name,
        description: res.data[0].description,
        date: res.data[0].date_time,
        initialPrice: res.data[0].min_price,
        finalPrice: res.data[0].max_price,
        location: res.data[0].address,
        state: res.data[0].state,
      });

      Interested(state.idplan, authUser.idUser);
      listData();
    });
  };
  //ver si esta interesado. si si cambiar el icono de interesado
  const Interested = (idplan, iduser) => {
    Axios.get("http://localhost:3001/Interested", {
      params: {
        idplan: idplan,
        iduser: iduser,
      },
    }).then((res) => {
      if (res.data.message === "Interested") {
        setInterested(true);
      } else {
        setInterested(false);
      }
    });
  };

  const StarRating = ({ rating }) => {
    // Limita la calificación a un máximo de 5
    rating = Math.min(rating, 5);

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

  useEffect(() => {
    if (authUser && authUser.idUser) {
      getDetailPlan(state.idplan);
    }
  }, [authUser]);

  const ratingPlanes = body.ratingPlanes;
  const comment = body.comment;

  return (
    <>
      <Container fluid className="ContainerDetailPlan">
        <Row>
          <center>
            <h1 className="Titulos">Detalle del plan</h1>
          </center>

          <Container fluid className="ContainerDetail">
            <Row>
              <center>
                <div className="ContainerDetailPlan2">
                  {state.image && (
                    <img
                      className="Image-Plan"
                      src={require(`../ImagenesPlanes/${state.image}.jpg`)}
                      alt="ImagenPlan"
                    />
                  )}

                  <div className="InfoPlan">
                    <Row>
                      <Col></Col>
                      <Col>
                        {interested ? (
                          <img
                            src={require("../Iconos/interested.png")}
                            className="BotonImagen"
                            title="Me interesa este plan"
                            alt="Me interesa este plan"
                            onClick={NotInterested}
                            style={{ cursor: "pointer", float: "right" }}
                          />
                        ) : (
                          <img
                            src={require("../Iconos/notinterested.png")}
                            className="BotonImagen"
                            title="No me interesa este plan"
                            alt="No me interesa este plan"
                            onClick={BeInterested}
                            style={{ cursor: "pointer", float: "right" }}
                          />
                        )}
                        {interested ? (
                          <p className="me-2" style={{ float: "right" }}>Me interesa este plan</p>
                        ) : (
                          <p className="me-2" style={{ float: "right" }}>No me interesa este plan</p>
                        )}
                      </Col>
                    </Row>

                    <h3 className="PlanTitle">{state.title}</h3>

                    <h4 className="PlanState">
                      <strong>Estado: </strong>
                      {state.state}
                    </h4>

                    <p className="PlanUser">
                      <strong>Creado por: </strong>
                      {state.user}
                    </p>

                    <div className="PlanStars">
                      <StarRating rating={Math.round(state.rating * 5)} />
                      <p className="CalificationNumber">{state.rating * 5}</p>
                    </div>

                    <p className="PlanDescription">{state.description}</p>

                    <div className="PlanSpecificData">
                      <p className="Date">
                        <strong> Fecha:</strong> {state.date}
                      </p>
                      <p className="StartTime">
                        <strong> Precio minimo:</strong> {state.initialPrice}
                      </p>
                      <p className="EndTime">
                        <strong> Precio maximo:</strong> {state.finalPrice}
                      </p>

                      <p className="Location">
                        <strong> Ubicacion:</strong> {state.location}
                      </p>
                    </div>
                  </div>
                </div>
              </center>
            </Row>
            <Row>
              <Col md={12}>
                <h2>Comentarios</h2>
                <Form>
                  <Form.Group
                    controlId="comment"
                    style={{ marginBottom: "20px" }}
                  >
                    <Form.Control
                      as="textarea"
                      name="comment"
                      value={comment}
                      placeholder="Deja tú comentario aquí..."
                      onChange={handleInput}
                      rows={3}
                    />
                  </Form.Group>
                  <Form.Group
                    controlId="rating"
                    style={{
                      display: "flex",
                      justifyContent: "flex-start",
                      alignItems: "center",
                    }}
                  >
                    <div>
                      <Form.Label style={{ marginRight: "10px" }}>
                        <strong>Califica</strong>
                      </Form.Label>
                      <Form.Control
                        as="select"
                        custom
                        style={{ width: "200px" }}
                        value={ratingPlanes}
                        name="ratingPlanes"
                        onChange={handleInput}
                      >
                        <option value="" disabled selected></option>
                        <option value="0">0</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                      </Form.Control>
                    </div>
                    <Button
                      variant="primary"
                      type="submit"
                      style={{ marginTop: "20px", marginLeft: "20px" }}
                      onClick={handleSubmit}
                    >
                      Enviar
                    </Button>
                  </Form.Group>
                </Form>

                {commentList.map((comentario) => (
                  <Card
                    style={{ width: "96%", marginBottom: "10px" }}
                    key={comentario.id}
                  >
                    <Card.Body>
                      <Card.Title>
                        {comentario.name} |{" "}
                        <strong>{comentario.rating} estrellas</strong>{" "}
                      </Card.Title>
                      <Card.Text>{comentario.comment}</Card.Text>
                    </Card.Body>
                  </Card>
                ))}
              </Col>
            </Row>
          </Container>
        </Row>
        <Row>
          <Col></Col>
        </Row>
      </Container>
    </>
  );
}
