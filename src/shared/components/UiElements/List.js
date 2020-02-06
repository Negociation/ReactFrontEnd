import React from 'react';

import './List.css';

const List = props =>{
    return(
        <ul>
            {props.children}
        </ul>
    );
}
export default List;