import React, { useEffect, useState } from 'react'
import Envelopes from './Envelopes'
import Transaction from './Transaction'
import EnvelopesAPI from '../../api/envelopes'
import Salaries from './Salaries';
import SalariesAPI from '../../api/salaries'


const BudgetCtrl = () => {


  const [products, setProducts] = useState([])
  const [salary, setSalary] = useState({})

  let total = 0;

  const Add = async (e) => {
    e.preventDefault()
    e.stopPropagation()
    
    const body = {
      amount: e.target[0].value
    }
    const res = await SalariesAPI.create(body)
        
    setSalary(res.data)
    console.log(salary)

    e.target[0].value = ''

  }

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
    const getSalary = async () => {
      try {
        const res = await SalariesAPI.fetch()
        setSalary(res.data)
        
      } catch (err) {
        console.log(err)
      }
    }
    const getProducts = async () => {

      try {
        const res = await EnvelopesAPI.fetch()
        setProducts(res.data)
        
      } catch (err) {
        console.log(err)
      }
    }
    getProducts()
    getSalary()
  }, []) 

  
  products.map(product => {
    return total = total + product.amount
  })

  return (
    <div>
      <Salaries salaries={salary} Add={Add}/>
      
      <div className="products"><p>Total Budget: {total}</p></div>

      <Envelopes products={products} onClick={onClick}/>
      <Transaction Create={Create} Update={Update} Transfer={Transfer}/>
    </div>
  )
}

export default BudgetCtrl


