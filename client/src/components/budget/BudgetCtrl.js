import React, { useEffect, useState } from 'react'
import Envelopes from './Envelopes'
import Transaction from './Transaction'
import EnvelopesAPI from '../../api/envelopes'

const BudgetCtrl = () => {

  const [products, setProducts] = useState([])

  //methods

  const Create = async (e) => {
    e.preventDefault()
    e.stopPropagation()
    
    const body = {
      name: e.target[0].value,
      amount: e.target[1].value
    }
    const res = await EnvelopesAPI.create(body)

    setProducts([...products, res.data])

    e.target[0].value = ''
    e.target[1].value = ''

  }

  const Update = async (e) => {
    e.preventDefault()
    e.stopPropagation()

    const body = {
      name: e.target[0].value,
      transaction: e.target[1].value,
      description: e.target[2].value
    }

    const res = await EnvelopesAPI.update(body)

    setProducts([...products])

    e.target[0].value = ''
    e.target[1].value = ''
    e.target[2].value = ''
  }

  const Transfer = async (e) => {
    e.preventDefault()
    e.stopPropagation()

    const body = {
      nameFrom: e.target[0].value,
      transaction: e.target[1].value,
      nameTo: e.target[2].value
    }
    const res = await EnvelopesAPI.transfer(body)
    setProducts([...products])

    e.target[0].value = ''
    e.target[1].value = ''
    e.target[2].value = ''
  }

  const onClick = async (e, id) => {
    e.preventDefault()
    e.stopPropagation()
    
    const res = await EnvelopesAPI.deleteIt({id})
    setProducts([...products.filter((product) => product._id !== id)])
  }

  useEffect(() =>{
    const getProducts = async () => {

      try {
        const res = await EnvelopesAPI.fetch()
        setProducts(res.data)
        
      } catch (err) {
        console.log(err)
      }
    }
    getProducts()
  }, []) 


  return (
    <div>
      <Envelopes products={products} onClick={onClick}/>
      <Transaction Create={Create} Update={Update} Transfer={Transfer}/>
    </div>
  )
}

export default BudgetCtrl


