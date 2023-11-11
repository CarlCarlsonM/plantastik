import "../styles/shared-styles.css";
import React, { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import {
  MDBContainer,
  MDBIcon,
  MDBBtn,
  MDBFooter,
  MDBRow,
  MDBCol,
} from "mdb-react-ui-kit";







export default function Footer() {
  
  return (

    <>  
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


