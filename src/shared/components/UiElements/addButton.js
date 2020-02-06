import React from 'react';
import './addButton.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';


const AddButton = props => {
  return (
    <button onClick={props.modalClick} type="button" className="btn-circle"><FontAwesomeIcon icon={faPlus} /></button>

    //<button type="button" className="btn-circle purple" onClick={props.modalClick}><FontAwesomeIcon icon={faPlus} /></button>
  );
};

export default AddButton;
