import React from 'react';

  
const PedidoRow = props =>{

    return (
        <React.Fragment>
            <li onClick={props.onClick}>
                <span>Pedido de {props.item._id}</span>
                <p>{props.item.produtos.length} Produto{props.item.produtos.length > 1&&<React.Fragment>s</React.Fragment>}</p>
            </li>
        </React.Fragment>
    );
}

export default PedidoRow;

