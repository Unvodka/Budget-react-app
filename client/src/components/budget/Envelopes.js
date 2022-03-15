import './Envelopes.css'
import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';
import moneyIcon from '../../icons/coins-solid.svg'


const Envelopes = ({products, onClick}) =>  {

  const onClickFactory = (id) => {
    return  (e) => {
      onClick(e, id)
    }
  }
  
  return (
    <div className='products-list'>
      {products.map(product => {
        return(
          <Card key={product.id + product.name} className='products'sx={{ maxWidth: 345 }}>
            <button className='btn-delete btn-delete-envelope' onClick={onClickFactory(product._id)}>X</button>
            <CardActionArea>
              <CardMedia
                className='img-product'
                component="img"
                image={moneyIcon}
                alt="envelopes"
              />
              <CardContent className='card-content'>
                    <div className='envelopes-txt'>
                      {[product.name + ':  '+ product.amount + ' $']}
                    </div>
              </CardContent>
            </CardActionArea>
          </Card>
        )
      })}
    </div>
  )
}

export default Envelopes
