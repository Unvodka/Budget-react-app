import React from 'react'
import './Salaries.css'

const Salaries = ({ salaries, Add }) => {
  
  return (
    
    <div key={salaries.id} className='salary'>
      <p>Your current salary is : {[salaries.amount]} </p>

      <form className='salary-form' onSubmit={Add}>

        <input type="number" placeholder='Enter a salary here'></input>
        <button type="submit" className='btn-form'>Confirm</button>

      </form>
    </div>

  )
}

export default Salaries
