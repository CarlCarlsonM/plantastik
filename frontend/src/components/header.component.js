import "../styles/shared-styles.css";
import React, { useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import { useAuth } from '../Contexts/AuthContext';


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
  

  const {authUser,
    setAuthUser,
    isLoggedIn,
    setIsLoggedIn} = useAuth();
  
  return (

    <>
    
      <MDBNavbar bgColor="dark" expand="lg" fixed="top">
        <MDBContainer>
          <MDBNavbarBrand>

            <Link to={"/"} className="text-light"> 
              <MDBIcon fas icon="calendar-check" className="me-2" />
              Plantastik
            </Link>
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
              <MDBInputGroup tag="form" className="d-flex w-50 mt-3 mb-3">
                <input
                  className="form-control"
                  placeholder="Busca tu próxima experiencia Plantástika"
                  aria-label="Search"
                  type="Search"
                />
                <MDBBtn outline className="text-light" color="secondary">
                  <MDBIcon icon="search" />
                </MDBBtn>
              </MDBInputGroup>
            </MDBNavbarNav>
          </MDBCollapse>
          {isLoggedIn ?(
            <Link to="/user-info">
          <MDBContainer className="ms-auto user-info-navbar-container text-white">
            
            <img
              src="https://icon-library.com/images/generic-user-icon/generic-user-icon-13.jpg"
              alt="The user"
              className="generic-user-img me-2"
            ></img>
            <span>{authUser.name}</span>
            
          </MDBContainer> </Link>):<Link to="/login">
                            <button>Inicia sesión</button>
                          </Link>}
        </MDBContainer>
      </MDBNavbar>
      
      
    
    </>
  );
}


