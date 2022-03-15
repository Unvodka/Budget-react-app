import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
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
          
            <Routes>
              <Route path="/" exact element={<Register />} />
                
              <Route path='/envelopes' element={<BudgetCtrl />} />
                
              <Route path="/login" exact element={<Login />} />
                
              <Route path="/register" exact element={<Register />} />
                
            </Routes>
            
          <Footer />
        </div>
      </Router>
          
  );
}

export default App;
