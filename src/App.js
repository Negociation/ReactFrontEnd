import React from 'react';
import {BrowserRouter as Router, Route, Redirect, Switch} from 'react-router-dom';

import NavigationBar from './shared/components/Navigation/NavigationBar';

import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';

import Produtos from './produtos/pages/Produtos';
import Pedidos from './pedidos/pages/Pedidos';
import Clientes from './clientes/pages/Clientes';

function App() {
  return (
    <Router>
      <NavigationBar />
      <div id='content'>
        <Switch>
          <Route path="/" exact></Route>
          <Route path="/produtos"><Produtos /></Route>
          <Route path="/pedidos"><Pedidos /></Route>
          <Route path="/clientes"><Clientes /></Route>
          <Redirect to ="/"></Redirect>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
