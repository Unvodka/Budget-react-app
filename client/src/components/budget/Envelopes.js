import './Envelopes.css';
import * as React from 'react';
import Card from '@mui/material/Card';

const Envelopes = ({ products, onDelete, Update }) => {
  const onClickFactory = (id) => {
    return (e) => {
      onDelete(e, id);
    };
  };

  const toggle = (e) => {
    e.preventDefault();
    const id = e.target.name;
    const classname = document.querySelectorAll('.update');

    if (document.getElementById(id).style.display === 'flex') {
      document.getElementById(id).style.display = 'none';
    } else {
      for (let i = 0; i < classname.length; i++) {
        classname[i].style.display = 'none';
      }
      document.getElementById(id).style.display = 'flex';
    }
  };
  const onChange = (e) => {
    e.preventDefault();
  };

  return (
    <div className="products-list">
      {products.map((product) => {
        return (
          <div key={product._id + product.name}>
            <Card
              name={product.name}
              className="products"
              sx={{ maxWidth: 345 }}
            >
              <button
                className="btn-delete btn-delete-envelope"
                onClick={onClickFactory(product._id)}
              >
                X
              </button>
              {/* <div className="envelopes-txt">
                {[product.name + ':  ' + product.amount + ' $']}
              </div> */}
              <input
                value={[product.name + ':  ' + product.amount + ' $']}
                name={product.name}
                id={product._id}
                onClick={toggle}
                onChange={onChange}
                className="envelopesTxt"
              />
            </Card>
            <form
              name={product.name}
              className="update"
              onSubmit={Update}
              id={product.name}
              key={product._id}
            >
              <p>Update :</p>
              <input
                className="input-name"
                type="text"
                placeholder="name"
                value={product.name}
                onChange={onChange}
              />
              <input
                className="input-amount"
                type="number"
                placeholder="amount"
              />
              <button className="btn-form" type="submit">
                Update
              </button>
            </form>
          </div>
        );
      })}
    </div>
  );
};

export default Envelopes;
