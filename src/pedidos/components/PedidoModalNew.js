import React, {useState,useEffect} from 'react';
import update from 'react-addons-update';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

import MyVerticallyCenteredModal from '../../shared/components/UiElements/Modal'

import { useHttpClient } from '../../shared/hooks/http-hook';

const PedidoModalNew = props =>{
    const [loadedClientes, setLoadedClientes] = useState();
    const [loadedProdutos, setLoadedProdutos] = useState();
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const [formState, inputHandler] = useState({'formClientePedido': '', 'produtoPreco' : 0, "produtos":[] });
    const history = useHistory();
    const [insertStatus, setStatus] = useState(null);
    const {register, handleSubmit } = useForm()
    const [modalShow, setModalShow] = useState(false);
    const [currentProduto, setCurrentProduto] = useState(null);


    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const responseData = await sendRequest(
                  'http://localhost:5000/clientes/getAll'
                );
                setLoadedClientes(responseData);
              } catch (err) {
                setStatus(false);
              }
            };

        const fetchProdutos = async () => {
            try {
                const responseData = await sendRequest(
                  'http://localhost:5000/produtos/getAll'
                );
                setLoadedProdutos(responseData);
              } catch (err) {
                setStatus(false);
              }
            };
            fetchUsers();
            fetchProdutos();
    }, [sendRequest]);
  


    const pedidoSubmitHandler = async (data,event) => {
        event.preventDefault();
        console.log(JSON.stringify({
            cliente: formState.formClientePedido,
            produtos: {}
          }));
        try {
            await sendRequest(
              'http://localhost:5000/pedidos',
              'POST',
              JSON.stringify({
                cliente: formState.formClientePedido,
                produtos: formState.produtos
              }),
              { 'Content-Type': 'application/json' }
            );
            history.push('/pedidos?status=success');
            setStatus(true);
        } catch (err) {
            setStatus(false);
        }
    };
      
    function handleProdutosList(){
        if(currentProduto != null){
            var arrayProduto = formState.produtos;
            arrayProduto.push(currentProduto);
            console.log(arrayProduto);
            inputHandler(update(formState, {$merge:{['produtos'] : arrayProduto}}));
            setModalShow(false);
            setCurrentProduto(null);
        }
    }

    const handleInputChange = (event)=>{
          inputHandler(update(formState, {$merge:{[event.target.name] : event.target.value}}));
    }
    if(insertStatus == null && !isLoading ){

        return(  
            <React.Fragment>

                <MyVerticallyCenteredModal title="Buscar Produto" show={modalShow} onHide={() => setModalShow(false)}>
                    <Row>
                        <Col sm="6">
                        <input type="text" className="form-control" name="name" style={{width: '100%', margin: 'auto'}}/>
                        </Col>
                    </Row>
                    
                    <Row>
                        <Col sm="6">
                            <div className="pedidosList">
                                <ul>

                                {loadedProdutos != undefined && loadedProdutos.length > 0 &&
                                    loadedProdutos.map(
                                        (produtoObject) => <li onClick={async ()=>{ await setCurrentProduto(produtoObject); handleProdutosList(); }} key={produtoObject._id} ><span className="leftContent">{produtoObject.descricao}</span> <span className="rightContent">Preço: R$ {produtoObject.preco}</span></li>
                                    )
                                }
                                </ul>
                            </div>
                        </Col>
                    </Row>
                </MyVerticallyCenteredModal> 

                <Form onSubmit={handleSubmit(pedidoSubmitHandler)}>
                    <Form.Group as={Row} controlId="formClientePedido">
                        <Form.Label column sm="6">Cliente</Form.Label>
                        <Col sm="6">
                            <select name="formClientePedido" className="form-control" onChange={handleInputChange} ref={register({ required: true,  })}>                                
                                <option>Selecione...</option>
                                {loadedClientes != undefined && loadedClientes.length > 0 &&
                                    loadedClientes.map(
                                    (clienteObject) => <option  key={clienteObject._id} value={clienteObject._id}>{clienteObject.nome}</option>
                                    )
                                }
                            </select>
                        </Col>
                    </Form.Group> 

                    <Form.Group as={Row} controlId="formProdutoPreco">
                        <Form.Label column sm="6">Produtos no Pedido</Form.Label>
                        <button onClick={() => setModalShow(true)} className="produtoButton" type="button">
                            <p>Adicionar Produto</p>
                            <span>
                                <FontAwesomeIcon icon={faPlus} />
                            </span>
                        </button>
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

export default PedidoModalNew;