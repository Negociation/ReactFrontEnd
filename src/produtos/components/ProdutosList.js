import React, {useState} from 'react';

import ProdutoRow from './ProdutoRow';

import Alert from 'react-bootstrap/Alert';

import List from '../../shared/components/UiElements/List';

import MyVerticallyCenteredModal from '../../shared/components/UiElements/Modal'

import ProdutoModalEdit from '../components/ProdutoModalEdit';

const ProdutosList = props =>{
    const [show, setShow] = useState(false);
    const [modalShow, setModalShow] = useState(false);
    const [requiredItem, setRequiredItem] = useState(0);

    function AlertNotFound() {

        if (show) {
            return(
                <Alert variant="danger" onClose={() => setShow(false)} dismissible>
                <Alert.Heading>Oops!</Alert.Heading>
                <p>
                    Desculpe nenhum elemento foi encontrado para exibição!
                </p>
                </Alert>
            );
        }else{
            return null;
        }
    }
    
    if(props.items.length === 0){
        return(
            <AlertNotFound />
        );
    }

    return(
        <React.Fragment>
            <MyVerticallyCenteredModal title = "Editar Produto" show={modalShow} onHide={() => setModalShow(false)}>
                <ProdutoModalEdit id={requiredItem} ></ProdutoModalEdit>
            </MyVerticallyCenteredModal>

            <List>
                {
                    props.items.map(
                        (produtoObject) =><ProdutoRow onClick={()=>{setModalShow(true); setRequiredItem(produtoObject._id)}} key={produtoObject._id} item={produtoObject} valor={produtoObject.preco}/>
                    )
                }
            </List>
        </React.Fragment>
    );
}

export default ProdutosList;
