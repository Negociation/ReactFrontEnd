import React from 'react';

const ClienteRow = props =>{
    return (
        <React.Fragment>
            <li onClick={props.onClick}>
                <span>{props.item.nome}</span>
                <p> 
                    Data de Nascimento: {new Date(props.item.dataNascimento).getDate()}/{new Date(props.item.dataNascimento).getMonth()+1}/{new Date(props.item.dataNascimento).getUTCFullYear()}
                </p>
            </li>
        </React.Fragment>
    );
}

export default ClienteRow;
