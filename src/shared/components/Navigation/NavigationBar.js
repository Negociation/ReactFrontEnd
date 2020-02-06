import React, {useState} from 'react';
import Header from './Header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';



import './NavigationBar.css'

import SideBar from "./SideBar";
import Backdrop from '../UiElements/Overlay';


const NavigationBar = props => {
    const [sideBarisOpen,setSideBar] = useState(false);

    const openSideBar = ()=>{ setSideBar(true)}

    const closeSideBar = ()=>{ setSideBar(false)}

    return(
            <Header>
                <div id="navArea">
                    <button type="button" id="hamburgerMenu" onClick={openSideBar}><FontAwesomeIcon icon={faBars}/></button>
                </div>
                <SideBar show={sideBarisOpen} onClick={closeSideBar} type="dynamicBar" />
                <SideBar show={true} type="staticBar" />
                { (sideBarisOpen) ? <Backdrop onClick={closeSideBar} /> : null }
            </Header>
    );
}

export default NavigationBar;