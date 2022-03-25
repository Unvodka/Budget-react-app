import React from 'react'
import './Transaction.css'

const Transaction = ({Create, Update, Transfer}) => {  

  return (
    <div className='transactions'>
      
      <form className='create' onSubmit={Create}>
        Create :
          <input className='input-name' type='text' placeholder='name'/>
          <input className='input-amount' type='number' placeholder='amount'/>
          <button className='btn-form' type='submit'>Create</button>
      </form>
      <form className='update' onSubmit={Update}>
        Update :
          <input className='input-name' type='text' placeholder='name'/>
          <input className='input-amount' type='number' placeholder='amount'/>
          <input className='input-description' type='text' placeholder='description'/>
          <button className='btn-form' type='submit' >Update</button>
      </form>
      <form className='transfer' onSubmit={Transfer}>
      Transfer :
          <input className='input-name' type='text' placeholder='name from'/>
          <input className='input-amount' type='number' placeholder='amount'/>
          <input className='input-name' type='text' placeholder='name to'/>
          <button className='btn-form' type='submit'>Transfer</button>
      </form>
    </div>
  )
}

export default Transaction
