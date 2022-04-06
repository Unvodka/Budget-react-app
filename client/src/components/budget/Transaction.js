import React from 'react'
import './Transaction.css'

const Transaction = ({Create, Transfer}) => {  

  return (
    <div className='transactions'>
      
      <form className='create' onSubmit={Create}>
        <p>Create :</p>
          <input className='input-name' type='text' placeholder='name'/>
          <input className='input-amount' type='number' placeholder='amount'/>
          <button className='btn-form' type='submit'>Create</button>
      </form>
      
      <form className='transfer' onSubmit={Transfer}>
        <p>Transfer :</p> 
          <input className='input-name' type='text' placeholder='name from'/>
          <input className='input-amount' type='number' placeholder='amount'/>
          <input className='input-name' type='text' placeholder='name to'/>
          <button className='btn-form' type='submit'>Transfer</button>
      </form>
    </div>
  )
}

export default Transaction
