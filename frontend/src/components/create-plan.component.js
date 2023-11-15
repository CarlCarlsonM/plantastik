import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import { useAuth } from "../Contexts/AuthContext";

export default function CreatePlan() {
  const [state, setState] = useState({
    name: "",
    description: "",
    address: "",
    avgRating: "",
    dateTime: "",
    state: "",
    minPrice: "",
    maxPrice: "",
    image: "",
    errors: {},
  });

  const { authUser, setAuthUser, isLoggedIn, setIsLoggedIn } = useAuth();

  return (
    <>
      <Container fluid>
        <Row className="mt-4">
          <h1 class="mb-2">Crea tu plan</h1>
        </Row>

        <Row>
          <Col>
            <h5 class="mb-4">
              1. Elige una foto, para que tu plan sea más llamativo
            </h5>
            <Form>
              <img
                class="w-75"
                src="https://images3.alphacoders.com/653/thumb-1920-653735.jpg"
              />
            </Form>
          </Col>
          <Col>
            <Form>
              <h5 class="mb-4">2. Añade información importante</h5>
              <Form.Group className="mb-3">
                <Form.Control
                  type="text"
                  placeholder="Dale un nombre a tu plan"
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label className="mb-0">
                  ¿En qué fecha es tu plan?
                </Form.Label>
                <Form.Control type="date" />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label className="mb-0">¿A qué hora?</Form.Label>
                <Form.Control type="time" />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Control
                  type="number"
                  placeholder="¿Cuánto es el mínimo de precios (COP)?"
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Control
                  type="number"
                  placeholder="¿Cuánto es el máximo de precios (COP)?"
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Control
                  type="text"
                  placeholder="¿En qué lugar será tu evento (dirección)?"
                />
              </Form.Group>
            </Form>
          </Col>
        </Row>
        <Row>
          <Form>
            <h5 class="mb-4">3. Agrega una descripción</h5>
            <Form.Group className="mb-3">
              <Form.Control
                as="textarea"
                rows={5}
                type="text"
                placeholder="Descripción"
              />
            </Form.Group>
            <div className="d-grid gap-2 mb-4">
              <input
                className="btn btn-success"
                size="lg"
                type="submit"
                value="Confirmar"
              />
            </div>
          </Form>
        </Row>
      </Container>
    </>
  );
}
