import React from 'react'
import './Transaction.css'

const Transaction = ({Create, Update, Transfer}) => {  

  return (
    <div className='transactions'>
      <form className='update' onSubmit={Update}>
        Update :
          <input type='text' placeholder='name'/>
          <input type='number' placeholder='amount'/>
          <input type='text' placeholder='description'/>
          <button className='btn-form' type='submit' >Update</button>
      </form>
      <form className='create' onSubmit={Create}>
        Create :
          <input type='text' placeholder='name'/>
          <input type='number' placeholder='amount'/>
          <button className='btn-form' type='submit'>Create</button>
      </form>

      <form className='transfer' onSubmit={Transfer}>
      Transfer :
          <input type='text' placeholder='name from'/>
          <input type='number' placeholder='amount'/>
          <input type='text' placeholder='name to'/>
          <button className='btn-form' type='submit'>Transfer</button>
      </form>
    </div>
  )
}

export default Transaction
