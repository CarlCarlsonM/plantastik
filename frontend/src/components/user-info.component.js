import React, { Component } from 'react';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import UserInfoShowUserData  from "./user-info.showuserdata.component";
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

//css
import '../styles/user-info.css';

export default class UserInfo extends Component {
  
  
  
  
  render() {

    //la idea es que esto se cambie con los datos de la base de datos
    const name = 'Sergio Castro';
    const email = 'secastrov@unal.edu.co';
    const gender = 'Plantastic';
    const age = '18';

    return (
      <>
        <Container fluid>
          <div className='user-info-container'>
            <Row>
            <UserInfoShowUserData
                name={name}
                email={email}
                gender={gender}
                age={age}
              />
            </Row>
              
            <Row className='ButtonsRow'>
              
              <Button className='MyPlansButton' as={Link} to="/my-plans">
                Mis Planes
              </Button>
            
              <Button className='CreatePlanButton' as={Link} to="/create-plan">
                Crear plan
              </Button>

              <Button className='MyInterestedPlandsButton' as={Link} to="/my-interested-plans">
                Mis Planes de Interes
              </Button>

              <Button className='UpdatePersonalDataButton' as={Link} to="/update-personal-data">
                Actualizar Datos
              </Button>
            </Row>
          </div>  
        </Container>
      </>
    )
  }
}
