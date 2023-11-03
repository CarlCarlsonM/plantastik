import "./styles/shared-styles.css";
import React, { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
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
  MDBFooter,
  MDBRow,
  MDBCol,
} from "mdb-react-ui-kit";
import Login from "./components/login.component";
import Register from "./components/register.component"
import UserInfo from "./components/user-info.component";
import CreatePlan from "./components/create-plan.component";
import MyInterestedPlans from "./components/my-interested-plans.component";
import MyPlans from "./components/my-plans.component";
import UpdatePersonalData from "./components/create-plan.component";

function App() {
  const [showBasic, setShowBasic] = useState(false);

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
          <MDBContainer className="ms-auto user-info-navbar-container text-white">
            <img
              src="https://icon-library.com/images/generic-user-icon/generic-user-icon-13.jpg"
              alt="The user"
              className="generic-user-img me-2"
            ></img>
            <span>Usuario Plantastik</span>
          </MDBContainer>
        </MDBContainer>
      </MDBNavbar>

      <MDBContainer fluid className="pt-5">
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route
            exact
            path="/register"
            element={<Register />}
          />
          <Route
            exact
            path="/user-info"
            element={<UserInfo />}
          />
          <Route
            exact
            path="/create-plan"
            element={<CreatePlan />}
          />
          <Route
            exact
            path="/my-interested-plans"
            element={<MyInterestedPlans />}
          />
          <Route
            exact
            path="/my-plans"
            element={<MyPlans />}
          />
          <Route
            exact
            path="/update-personal-data"
            element={<UpdatePersonalData />}
          />
        </Routes>
      </MDBContainer>
      
      <MDBFooter
        bgColor="dark"
        className="text-center text-white ms-0 me-0 mb-0"
      >
        <MDBContainer className="p-3">
          <MDBRow className="d-flex justify-content-center align-items-center">
            <MDBCol size="auto">
              <span>
                &copy; {new Date().getFullYear()} Copyright:
                {" La BBC (Big Brain Crunch) feat.  "}
                <a href="https://loraxian.fandom.com/wiki/Biggie_Cheese">
                  Biggie Cheese
                </a>
              </span>
            </MDBCol>
            <MDBCol size="auto">
              <MDBBtn
                outline
                color="light"
                floating
                className="m-1"
                href="https://drive.google.com/drive/folders/1-DSRks1KPTEKJU1S46UPby-bZaXlEhu_"
                role="button"
              >
                <MDBIcon fab icon="google" />
              </MDBBtn>
              <MDBBtn
                outline
                color="light"
                floating
                className="m-1"
                href="https://github.com/CarlCarlsonM/plantastik"
                role="button"
              >
                <MDBIcon fab icon="github" />
              </MDBBtn>
              <MDBBtn
                outline
                color="light"
                floating
                className="m-1"
                href="https://camurcioa.atlassian.net/jira/software/projects/PLAN/boards/1"
                role="button"
              >
                <MDBIcon fab icon="jira" />
              </MDBBtn>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </MDBFooter>
    </>
  );
}

export default App;
