import React from 'react';

const ProdutoRow = props =>{
    return (
        <React.Fragment>
            <li onClick={props.onClick}>
                <span>{props.item.descricao}</span>
                <p>Preço R$: {props.item.preco} </p>
            </li>
        </React.Fragment>
    );
}

export default ProdutoRow;

