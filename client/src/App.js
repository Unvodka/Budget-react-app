import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Header from './components/Header';
import Login from './components/login/Login';
import Footer from './components/Footer';
import Register from './components/login/Register';
import './App.css'
import BudgetCtrl from './components/budget/BudgetCtrl';

function App() {
  return (
      <Router>
        <div className="App">
          <Header />  
          
            <Switch>
              <Route path="/" exact>
                <Register />
              </Route>
              <Route path='/envelopes'>
                <BudgetCtrl />
              </Route>
              <Route path="/login" exact>
                <Login />
              </Route>
              <Route path="/register" exact>
                <Register />
              </Route>
            </Switch>
            
          <Footer />
        </div>
      </Router>
          
  );
}

export default App;
