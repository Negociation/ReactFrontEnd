import React, {useState, useEffect} from 'react';

import Spinner from 'react-bootstrap/Spinner';

import AddButton from '../../shared/components/UiElements/addButton';
import SubHeader from '../../shared/components/UiElements/SubHeader';
import ProdutosList from '../components/ProdutosList';
import ProdutoModalNew from '../components/ProdutoModalNew';
import MyVerticallyCenteredModal from '../../shared/components/UiElements/Modal'
import { useHttpClient } from '../../shared/hooks/http-hook';


const Produtos = () =>{
    const [modalShow, setModalShow] = useState(false);
    const {isLoading, error, sendRequest, clearError} = useHttpClient();
    const [loadedProdutos, setLoadedProdutos] = useState();
    const [value, setValue] = React.useState('')

    
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const responseData = await sendRequest(
                  'http://localhost:5000/produtos/getAll'
                );
                setLoadedProdutos(responseData);
              } catch (err) {}
            };
            fetchUsers();
    }, [sendRequest]);
  
    return (
        <React.Fragment>
            <SubHeader title='Produtos'> 
                <MyVerticallyCenteredModal title="Criar Produto" show={modalShow} onHide={() => setModalShow(false)}>
                    <ProdutoModalNew />
                </MyVerticallyCenteredModal>
                <AddButton modalClick={() => setModalShow(true)} />
            </SubHeader>
            <div>
                <input disabled type="text" placeholder="Pesquisar..." className="form-control" name="name" style={{width: '90%', margin: 'auto'}}/>
            </div>

            <div className="list">
                {value == '' && isLoading && (
                    <div className="loadingList">
                        <Spinner animation="border" variant="danger" />
                    </div>
                )}
             
                {!isLoading && loadedProdutos &&  <ProdutosList items={loadedProdutos}/>}
            </div>
        </React.Fragment>
    );
}
export default Produtos;