import React, { Component } from "react";
import '../styles/user-info.showuserdata.component.css';
import Container from "react-bootstrap/Container";

export default function UserInfoShowUserData(props) {
  return (
    <>
      <Container fluid>
        <div className="login-showuserdata">
          <img
            className="defaultlogo-userimage pe-5"
            src="https://icon-library.com/images/generic-user-icon/generic-user-icon-13.jpg"
            alt="user image"
          />
          <div className="personal-information">
            <p className="user-name">
              <strong>Nombre de usuario:</strong> <u>{props.name} </u>
            </p>
            <p className="user-email">
              <strong>Correo electronico:</strong> {props.email}
            </p>
            <p className="user-gender"><strong>Genero:</strong> {props.gender} </p>
            <p className="user-age"><strong>Edad:</strong> {props.age} años </p>
          </div>
        </div>
      </Container>
    </>
  );
}
