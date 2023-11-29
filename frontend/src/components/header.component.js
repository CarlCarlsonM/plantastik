import "../styles/shared-styles.css";
import React, { useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../Contexts/AuthContext";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";

import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarToggler,
  MDBIcon,
  MDBNavbarNav,
  MDBCollapse,
  MDBInputGroup,
  MDBBtn,
} from "mdb-react-ui-kit";

export default function Header() {
  const [showBasic, setShowBasic] = useState(false);

  const { authUser, isLoggedIn, setIsLoggedIn, isAdmin, setIsAdmin } =
    useAuth();

  const handleLogOut = (event) => {
    setIsLoggedIn(false);
    setIsAdmin(false);
  };

  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleInput = (event) => {
    event.preventDefault();

    setQuery({
      ...query,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    setQuery({
      ...query,
    });

    navigate(`/plan-by-name/${query}`);

  };
  
  return (
    <>
      <MDBNavbar bgColor="white" expand="lg" fixed="top">
        <MDBContainer>
          <MDBNavbarBrand>
            {isLoggedIn ? (
              <Link to={"/all-plans"} className="text-light">
                <Image src="/plantastiknav.png" className="navbar-img" />
              </Link>
            ) : (
              <Link to={"/login"} className="text-light">
                <Image src="/plantastiknav.png" className="navbar-img" />
              </Link>
            )}
          </MDBNavbarBrand>
          <MDBNavbarToggler
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
            className="text-light ml-auto"
            onClick={() => setShowBasic(!showBasic)}
          >
            <MDBIcon icon="bars" fas />
          </MDBNavbarToggler>
          <MDBCollapse navbar show={showBasic}>
            <MDBNavbarNav className="mr-auto mb-2 mb-lg-0 justify-content-center">
              <MDBInputGroup
                tag="form"
                className="d-flex w-50 mt-3 mb-3"
                onSubmit={handleSubmit}
              >
                {isLoggedIn ? (
                  <input
                    className="form-control"
                    placeholder="Busca tu próxima experiencia Plantástika"
                    aria-label="Search"
                    type="Search"
                    onChange={e => setQuery(e.target.value)}
                  />
                ) : (
                  <div></div>
                )}
                {isLoggedIn ? (
                  <MDBBtn outline className="text-light" color="secondary">
                    <MDBIcon icon="search" color="black" />
                  </MDBBtn>
                ) : (
                  <div></div>
                )}
              </MDBInputGroup>
            </MDBNavbarNav>
          </MDBCollapse>
          {isLoggedIn ? (
            isAdmin ? (
              <>
                <Link to="/admin-options">
                  <MDBContainer className="ms-auto user-info-navbar-container text-white">
                    <img
                      src={require("../Iconos/usuario.png")}
                      alt="The user"
                      className="generic-user-img me-2"
                    ></img>
                    <span className="NombreUsuarioPerfil">{authUser.name}</span>
                  </MDBContainer>{" "}
                </Link>
                <Button as={Link} to="/login" onClick={handleLogOut}>
                  Cerrar sesion
                </Button>
              </>
            ) : (
              <>
                <Link to="/user-info">
                  <MDBContainer className="ms-auto user-info-navbar-container text-white">
                    <img
                      src={require("../Iconos/usuario.png")}
                      alt="The user"
                      className="generic-user-img me-2"
                    ></img>
                    <span className="NombreUsuarioPerfil">{authUser.name}</span>
                  </MDBContainer>{" "}
                </Link>
              </>
            )
          ) : (
            <Link to="/login">
              <input
                className="btn btn-primary"
                size="lg"
                type="submit"
                value="Iniciar Sesión"
              />
            </Link>
          )}
        </MDBContainer>
      </MDBNavbar>
    </>
  );
}
