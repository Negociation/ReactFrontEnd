import React, {useState,useEffect} from 'react';

import Spinner from 'react-bootstrap/Spinner';

import AddButton from '../../shared/components/UiElements/addButton';
import SubHeader from '../../shared/components/UiElements/SubHeader';
import PedidosList from '../components/PedidosList';
import PedidoModalNew from '../components/PedidoModalNew';
import MyVerticallyCenteredModal from '../../shared/components/UiElements/Modal'
import { useHttpClient } from '../../shared/hooks/http-hook';

const Pedidos = () =>{

    const [modalShow, setModalShow] = useState(false);
    const {isLoading, error, sendRequest, clearError} = useHttpClient();
    const [loadedPedidos, setLoadedPedidos] = useState();

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const responseData = await sendRequest(
                  'http://localhost:5000/pedidos/'
                );
                setLoadedPedidos(responseData.lista);
              } catch (err) {}
            };
            fetchUsers();
    }, [sendRequest]);
  
    return (
        <React.Fragment>
            <SubHeader title='Pedidos'> 
                <MyVerticallyCenteredModal title="Criar Pedido" show={modalShow} onHide={() => setModalShow(false)}>
                    <PedidoModalNew />
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

                {!isLoading && loadedPedidos &&  <PedidosList  items={loadedPedidos}/> }
            </div>
        </React.Fragment>
    );
}
export default Pedidos;