import React from 'react'
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Header = () => {
  let user = localStorage.getItem('user-info')
  console.log(user)

    function logOut () {
    localStorage.clear();
    
  }
  return (
    <>
      <div className='header'>
        { localStorage.getItem('user-info') ? 
        <div className="logout-dropdown" >{user && user} 
          <a href="/login"><button className="logout" onClick={logOut}>Logout</button></a>
        </div>  
        : null} 
        <h1>Budget manager</h1>
      </div>      
    </>
  )
}

export default Header
