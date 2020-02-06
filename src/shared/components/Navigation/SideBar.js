import React from 'react';
import ReactDOM from 'react-dom';
import { NavLink } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';

import './SideBar.css'

const SideBar = props =>{
    const content= (
    <CSSTransition in={props.show} timeout={200} classNames="slide-in-left" mountOnEnter unmountOnExit>
        <div id={props.type}>
            <aside id="SideBar">
                <span className="titulo">Titulo Aq</span>

                <ul className="nav-links">
                    <li>
                    <NavLink to="/pedidos" exact onClick={props.onClick}>Pedidos</NavLink>
                    </li>
                    <li>
                    <NavLink to="/clientes" onClick={props.onClick}>Clientes</NavLink>
                    </li>
                    <li>
                    <NavLink to="/produtos" onClick={props.onClick}>Produtos</NavLink>
                    </li>
                </ul>
            </aside>
        </div>
    </CSSTransition>);
    return ReactDOM.createPortal(content, document.getElementById('nav-hook'));
}

export default SideBar;