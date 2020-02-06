import React, {useState} from 'react';
import update from 'react-addons-update';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';

import { useHttpClient } from '../../shared/hooks/http-hook';

const ClienteModalNew = props =>{
    const convertDate = (date)=>{
        return (date.getDay+"/"+date.getMonth+"/"+date.getYear);
    }
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const [formState, inputHandler] = useState({'clienteNome': '', 'clienteNascimento' : new Date()});
    const history = useHistory();
    const [insertStatus, setStatus] = useState(null);
    const {register, handleSubmit } = useForm()

    const clienteSubmitHandler = async (data,event) => {
        event.preventDefault();
        try {
            await sendRequest(
              'http://localhost:5000/clientes',
              'POST',
              JSON.stringify({
                nome: formState.clienteNome,
                dataNascimento: new Date(formState.clienteNascimento)
              }),
              { 'Content-Type': 'application/json' }
            );
            history.push('/clientes?status=success');
            setStatus(true);
        } catch (err) {
            setStatus(false);
        }
    };
      
    const handleInputChange = (event)=>{
        inputHandler(update(formState, {$merge:{[event.target.name] : event.target.value}}));
    }
    if(insertStatus == null && !isLoading){

        return(  
            <React.Fragment>
                <Form onSubmit={handleSubmit(clienteSubmitHandler)}>
                    <Form.Group as={Row} controlId="formClienteNome">
                        <Form.Label column sm="6">Nome</Form.Label>
                        <Col sm="6">
                            <input name="clienteNome" value={formState.clienteNome} onChange={handleInputChange} ref={register({ required: true })} id="formProdutoNome" className="form-control"></input>
                        </Col>
                    </Form.Group> 

                    <Form.Group as={Row} controlId="formClienteNascimento">
                        <Form.Label column sm="6">Data de Nascimento</Form.Label>
                        <Col sm="6">
                        <   input name="clienteNascimento" value={formState.clienteNascimento} onChange={handleInputChange} ref={register({ required: true })} id="formProdutoNascimento" className="form-control"></input>
                        </Col>
                    </Form.Group>
                    <div className="modal-footer">
                            <button type="submit" className="btn-submit btn btn-primary">Salvar</button>
                    </div> 
                </Form>
            </React.Fragment>
        );
        }else if(insertStatus){
            return (
                <React.Fragment>
                    <Alert variant="success">
                    <Alert.Heading>Produto Inserido Com Sucesso!</Alert.Heading>
                    <p>
                        Aww yeah, you successfully read this important alert message. This example
                        text is going to run a bit longer so that you can see how spacing within an
                        alert works with this kind of content.
                    </p>
                    </Alert>
                    <div className="modal-footer">
                        <Button variant="secondary">Fechar</Button>
                    </div> 
                </React.Fragment>
            )
        }else if(error){
            return (
                <Alert variant="danger">
                <Alert.Heading>Erro na Requisição!</Alert.Heading>
                <p>
                    Aww yeah, you successfully read this important alert message. This example
                    text is going to run a bit longer so that you can see how spacing within an
                    alert works with this kind of content.
                </p>
                </Alert>               
            );
        }else{
            return (<div id="loadingSpinner" ><Spinner animation="border" variant="danger" /></div>);
        }
}

export default ClienteModalNew;