import React from 'react';
import ReactDOM from 'react-dom';

import './Overlay.css';

const Overlay = props => {
  return ReactDOM.createPortal(
    <div className="overlay" onClick={props.onClick}></div>,
    document.getElementById('overlay')
  );
};

export default Overlay;
