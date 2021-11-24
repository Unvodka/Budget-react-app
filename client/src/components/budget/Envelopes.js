import React from 'react'

const Envelopes = ({products, onClick}) =>  {

  const onClickFactory = (id) => {
    return  (e) => {
      onClick(e, id)
    }
  }
  
  return (
    
    products.map(product => {
      return(
        <div key={product.id + product.name} className='products'>
          <button className='btn-delete' onClick={onClickFactory(product._id)}>X</button>
          {[product.name + ':  '+ product.amount]}
        </div>
      )
    })
  )
}

export default Envelopes
