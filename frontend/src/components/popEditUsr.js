import React from 'react';
import '../styles/popEditUser.css';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Input, Label } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css';

class PopEdit extends React.Component {
    state={
        abierto:false,
    }

    abrirModal=()=>{
        this.setState({abierto: !this.state.abierto});
    }

    render() {
        return (
            <>
                {/* <div className='principal'> <div className='secundario'> */}
                <Button color='success' onClick={this.abrirModal}>Editar</Button>
                {/* </div> </div> */}
                <Modal isOpen={this.state.abierto}>
                    <ModalHeader>
                        Editar Usuario
                    </ModalHeader>

                    <ModalBody>
                        <FormGroup>
                            <label for='usuario'>Nombre</label>
                            <Input type='text' id='usuario'/>
                        </FormGroup>
                        <FormGroup>
                            <label for='password'>Contraseña</label>
                            <Input type='text' id='password'/>
                        </FormGroup>
                    </ModalBody>

                    <ModalFooter>
                        <Button color='primary'>Modificar</Button>
                        <Button color='secondary' onClick={this.abrirModal}>Cancelar</Button>
                    </ModalFooter>

                </Modal>
            </>
        )
    }
}
export default PopEdit;
