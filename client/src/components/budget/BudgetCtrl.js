import React, { useEffect, useState } from 'react'
import Envelopes from './Envelopes'
import Transaction from './Transaction'
import EnvelopesAPI from '../../api/envelopes'
import Salaries from './Salaries';
import SalariesAPI from '../../api/salaries'
import './Envelopes.css'


const BudgetCtrl = () => {


  const [products, setProducts] = useState([])
  const [salary, setSalary] = useState({})
  const [alertBudget, setAlertBudget] = useState(false)

  let total = 0;

  const Add = async (e) => {
        
    const body = {
      amount: e.target[0].value
    }
    const res = await SalariesAPI.create(body)
        
    setSalary(res.data)

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

  const saving = salary.amount - total
  
  return (
    <div className='salary-previsions'>
      
      <Salaries salaries={salary} Add={Add}/>

      {saving < 100 ? <h3 className='red'>Alert Budget, your saving is low</h3> : ""}
      {saving < 100 ? <h3 className='red'>Your Saving</h3> : <h3 className='green'>Your Saving</h3>}
     

      <div className='previsions'>
        <table>
          <thead>
            <tr>
              <th>MONTH previsions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{saving} $</td>
            </tr>
          </tbody>
        </table> 

        <table>
          <thead>
            <tr>
              <th>3 MONTHS previsions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{saving *3} $</td>
            </tr>
          </tbody>
        </table>

        <table>
          <thead>
            <tr>
              <th>6 MONTHs previsions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{saving * 6} $</td>
            </tr>
          </tbody>
        </table>

        <table>
          <thead>
            <tr>
              <th>YEAR previsions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{saving * 12} $</td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <div className="total"><p>Total Budget: {total} $</p></div>

      <Envelopes products={products} onClick={onClick} className="products-list"/>
      <Transaction Create={Create} Update={Update} Transfer={Transfer}/>
    </div>
  )
}

export default BudgetCtrl


