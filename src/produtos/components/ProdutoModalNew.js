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

const ProdutoModalNew = props =>{

    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const [formState, inputHandler] = useState({'produtoDesc': '', 'produtoPreco' : 0});
    const history = useHistory();
    const [insertStatus, setStatus] = useState(null);
    const {register, handleSubmit } = useForm()

    const produtoSubmitHandler = async (data,event) => {
        event.preventDefault();
        try {
            await sendRequest(
              'http://localhost:5000/produtos',
              'POST',
              JSON.stringify({
                descricao: formState.produtoDesc,
                preco: formState.produtoPreco
              }),
              { 'Content-Type': 'application/json' }
            );
            history.push('/produtos?status=success');
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
            <Form onSubmit={handleSubmit(produtoSubmitHandler)}>
                <Form.Group as={Row} controlId="formProdutoDesc">
                    <Form.Label column sm="6" >Descrição</Form.Label>
                    <Col sm="6">
                        <input name="produtoDesc" value={formState.produtoDesc} onChange={handleInputChange} ref={register({ required: true })} id="formProdutoDesc" className="form-control"></input>
                    </Col>
                </Form.Group> 
        
                <Form.Group as={Row} controlId="formProdutoPreco">
                    <Form.Label column sm="6">Preço</Form.Label>
                    <Col sm="6">
                    <input name="produtoPreco" value={formState.produtoPreco}  onChange={handleInputChange} ref={register({ required: true, maxLength: 20, pattern: /[0-9]+([.][0-9]+)/i })} id="formProdutoDesc" className="form-control" />
                    </Col>
                </Form.Group>
                <div className="modal-footer">
                    <button type="submit" className="btn-submit btn btn-primary">Salvar</button>
                </div> 
            </Form>
            )
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
        }else if (error){
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

export default ProdutoModalNew;