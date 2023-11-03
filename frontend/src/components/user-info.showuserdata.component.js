import React, { Component } from "react";
import '../styles/user-info.showuserdata.component.css';
import Container from "react-bootstrap/Container";

export default class UserInfoShowUserData extends Component {

    
    render() {
      return (
        <>
          <Container fluid>
            <div className='login-showuserdata'>
                <img className='defaultlogo-userimage'
                    src ='https://icon-library.com/images/generic-user-icon/generic-user-icon-13.jpg'
                    alt = 'user image'/>
                <div className = 'personal-information'>
                    <p className = 'user-name'> 
                    <strong>Nombre de usuario: {this.props.name} </strong> 
                    </p>
                    <p className='user-email'> Correo electronico:  
                    {this.props.email} </p> 
                    <p className='user-gender'>Genero: {this.props.gender} </p>
                    <p className='user-age'>edad: {this.props.age} años </p>

                </div>
            </div>           
          </Container>
        </>
      )
    }
  }