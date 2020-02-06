import React from 'react';

import './SubHeader.css';


const SubHeader = props =>{
    return (
        <div className="subHeader">
            <span>{props.title}</span>
            {props.children}
        </div>
    );
}

export default SubHeader;
