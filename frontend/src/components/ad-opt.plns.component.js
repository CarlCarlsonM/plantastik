import React, { Component } from 'react';
import { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import UserInfoShowUserData from "./user-info.showuserdata.component";
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from "../Contexts/AuthContext";
import Button from 'react-bootstrap/Button';
import Axios from 'axios';
import Swal from 'sweetalert2'


//css
import '../styles/admin-options.css'
import '../styles/user-info.css';

export default function AdmUpdPln() {

    const [state, setState] = useState({
        name: '',
        email: '',
        gender: '',
        age: ''

    });

    const [UsersList, setPlns] = useState([]);

    const navigate = useNavigate();

    const { authUser,
        setAuthUser,
        isLoggedIn,
        setIsLoggedIn } = useAuth();

    const handleLogOut = (event) => {

        setIsLoggedIn(false)


    }

    const seePlns = () => {


        Axios.get("http://localhost:3001/seePlns", {
            params: {
                // id: id
            }
        }).then((response) => {
            setPlns(response.data);
            /*alert("Mostrando Mis Planes");*/
        })

    }

    const delPln = (i) => {
        const id = i;

        // Axios.delete(`http://localhost:3001/deleteUser/${id}`
        // ).then((response) => {
        //   setUsers(response.data);
        //   /*alert("Mostrando users");*/
        // })

    }

    useEffect(() => {
        if (isLoggedIn) {
            Axios.post("http://localhost:3001/profile", {
                id: authUser.idUser,

            }).then((res) => {
                if (res.data.message === "Success") {
                    setState({
                        name: res.data.userData.name,
                        email: res.data.userData.email,
                        gender: res.data.userData.gender,
                        age: res.data.userData.age
                    });
                    setAuthUser({
                        idUser: res.data.userData.id_user,
                        name: res.data.userData.name
                    });

                }
            });
        }
    }, [isLoggedIn]);

    //la idea es que esto se cambie con los datos de la base de datos
    const name = state.name;
    const email = state.email;
    const gender = state.gender;
    const age = state.age;

    const [toggle, setToggle] = useState(1)

    function updateToggle(id) {
        setToggle(id)
    }

    return (
        <>
            <Container fluid className='ContenedorMisPlanes'>
                <Row>
                    <center>
                        <h1 className='Titulos'>
                            Planes
                        </h1>
                    </center>
                    {
                        useEffect(() => {
                            if (authUser && authUser.idUser) {
                                seePlns();
                            }
                        }, [authUser])
                    }
                    {
                        UsersList.map((val, key) => {
                            return (
                                // <div key={val.id_plan}>

                                //     nombrePlan = {val.name}

                                // </div>a
                                <div key={val.id_plan}>
                                    <Row>
                                        <Col>nombrePlan = {val.name}</Col>
                                        <Col>idPlan={val.id_plan}</Col>
                                        <Col>idUsuario={val.id_user_plan}</Col>
                                        <Col>estado={val.state}</Col>
                                        <Col>
                                            <ul className='d-flex'>
                                                {/* <li className='flex-fill' onClick={() => delPln(val.id_plan)}>Eliminar</li> */}
                                                <Link to={`/ad-upd-pln/${val.id_plan}`}>
                                                    <img
                                                        src={require("../Iconos/editar.png")}
                                                        className="BotonImagen"
                                                        style={{ cursor: 'pointer', float: 'left' }} />
                                                </Link>
                                            </ul>
                                        </Col>
                                    </Row>

                                </div>
                                
                            )
                        })
                    }
                </Row>
            </Container>
        </>
    )

}

