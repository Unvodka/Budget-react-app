import React, { useEffect, useState } from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Header from './components/Header';
import Login from './components/login/Login';
import Footer from './components/Footer';
import Register from './components/login/Register';
import './App.css'
import BudgetCtrl from './components/budget/BudgetCtrl';

function App() {
  const [user, setUser] = useState()
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("isLoggedIn"))

  useEffect(() => {
    
    const getUser = () => {
      fetch("http://localhost:3005/auth/login/success", {
        method: "GET",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        },
      })
        .then((response) => {
          if (response.status === 200) return response.json();
          throw new Error("authentication has been failed!");
        })
        .then((resObject) => {
          setUser(resObject.user);
          setIsLoggedIn(true)
          localStorage.setItem("isLoggedIn", true)
          localStorage.setItem("user", user.displayName)
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getUser();
  }, [isLoggedIn]);
  console.log(user)
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
