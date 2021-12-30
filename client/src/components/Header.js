import React from 'react'
import './Header.css'

const Header = () => {
  let user = localStorage.getItem('user-info')

  function logOut () {
    localStorage.clear();
    sessionStorage.clear();
  }
  
  return (
    <>
      <div className='header'>
        
        { sessionStorage.getItem('activeSession') ?
        <div className="logout-dropdown" >{user && user} 
        <a href="/login"><button className="logout" onClick={logOut}>Logout</button></a>
      </div>  
      : null
        }

        <h1>Budget manager</h1>
      </div>      
    </>
  )
}

export default Header
