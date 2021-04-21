import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle, faMinusCircle } from '@fortawesome/free-solid-svg-icons';
import { PropTypes } from 'prop-types';

import { handleProductQuantity } from '../utils';

export default function ProductCard({ product, index, cart, callback }) {
  const { id, urlImage, price, name } = product;

  const updateQuantity = (action, data = {}) => {
    const newCart = handleProductQuantity({
      action,
      id,
      data,
      cart });
    callback(newCart);
  };

  return (
    <section className="product-card" key={ `${index}-${name}` }>
      <img
        src={ urlImage }
        data-testid={ `${index}-product-img` }
        alt="Img do produto."
      />
      <section className="name" data-testid={ `${index}-product-name` }>
        { name }
      </section>
      <section className="price" data-testid={ `${index}-product-price` }>
        { `R$ ${price.replace('.', ',')}` }
      </section>
      <section className="quantity">
        <button
          type="button"
          onClick={ () => updateQuantity('sub') }
          data-testid={ `${index}-product-minus` }
        >
          <FontAwesomeIcon
            icon={ faMinusCircle }
            className="quantity-icon"
          />
        </button>
        <span data-testid={ `${index}-product-qtd` }>
          { cart[id] ? cart[id].quantity : 0 }
        </span>
        <button
          type="button"
          onClick={ () => updateQuantity('add', { name, price }) }
          data-testid={ `${index}-product-plus` }
        >
          <FontAwesomeIcon
            icon={ faPlusCircle }
            className="quantity-icon"
          />
        </button>
      </section>
    </section>
  );
}

ProductCard.propTypes = {
  cart: PropTypes.objectOf(PropTypes.any).isRequired,
  callback: PropTypes.func.isRequired,
  product: PropTypes.objectOf(PropTypes.any).isRequired,
  index: PropTypes.number.isRequired,
};
