import React, {useState,useEffect} from 'react';

import Spinner from 'react-bootstrap/Spinner';

import AddButton from '../../shared/components/UiElements/addButton';
import SubHeader from '../../shared/components/UiElements/SubHeader';
import ClientesList from '../components/ClientesList.js';
import ClienteModalNew from '../components/ClienteModalNew';
import MyVerticallyCenteredModal from '../../shared/components/UiElements/Modal'
import { useHttpClient } from '../../shared/hooks/http-hook';


const Clientes = () =>{
    const [modalShow, setModalShow] = useState(false);
    const {isLoading, error, sendRequest, clearError} = useHttpClient();
    const [loadedClientes, setLoadedClientes] = useState();

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const responseData = await sendRequest(
                  'http://localhost:5000/clientes/getAll'
                );
                setLoadedClientes(responseData);
              } catch (err) {}
            };
            fetchUsers();
    }, [sendRequest]);
  

    return (
        <React.Fragment>
            <SubHeader title='Clientes'> 

                <MyVerticallyCenteredModal title="Criar Cliente" show={modalShow} onHide={() => setModalShow(false)}>
                    <ClienteModalNew />
                </MyVerticallyCenteredModal>

                <AddButton modalClick={() => setModalShow(true)} />
            </SubHeader>
            <div>
                <input disabled type="text" placeholder="Pesquisar..." className="form-control" name="name" style={{width: '90%', margin: 'auto'}}/>
            </div>


            <div className="list">
                {isLoading && (
                    <div className="loadingList">
                        <Spinner animation="border" variant="danger" />
                    </div>
                )}
                {!isLoading && loadedClientes &&  <ClientesList items={loadedClientes}/>  }
            </div>
        </React.Fragment>
    );
}
export default Clientes;