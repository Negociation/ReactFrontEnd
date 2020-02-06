import React, {useState} from 'react';

import Alert from 'react-bootstrap/Alert';

import ClienteRow from './ClienteRow';

import List from '../../shared/components/UiElements/List';

import MyVerticallyCenteredModal from '../../shared/components/UiElements/Modal'

import ClienteModalEdit from '../components/ClienteModalEdit';

const ClientesList = props =>{
    const [show, setShow] = useState(true);
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
            
            <MyVerticallyCenteredModal title = "Editar Cliente" show={modalShow} onHide={() => setModalShow(false)}>
                <ClienteModalEdit id={requiredItem} ></ClienteModalEdit>
            </MyVerticallyCenteredModal>

            <List> 
                {
                    props.items.map(
                        (produtoObject) =><ClienteRow onClick={()=>{setModalShow(true); setRequiredItem(produtoObject._id)}} key={produtoObject._id} item={produtoObject} valor={produtoObject.preco}/>
                    )
                }
            </List>
        </React.Fragment>
    );
}

export default ClientesList;