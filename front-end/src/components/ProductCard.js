import React, { useContext, useState, useEffect } from 'react';
import propTypes from 'prop-types';
import Context from '../Context/Context';

function ProductCard({ indexId, id, price, name, img }) {
  const [quantity, setQuantity] = useState(0);
  const { cart, updateProduct } = useContext(Context);

  const changedPrice = price.replace('.', ',');

  useEffect(() => {
    const findItemById = cart.find((item) => item.id === id);
    if (findItemById !== undefined) {
      setQuantity(findItemById.qtd);
    }
  }, [cart, id]);

  function increaseQtd() {
    const qtd = quantity + 1;
    setQuantity(qtd);
    updateProduct(id, price, name, qtd);
  }

  function decreaseQtd() {
    if (quantity > 0) {
      const qtd = quantity - 1;
      setQuantity(qtd);
      updateProduct(id, price, name, qtd);
    }
  }

  return (
    <div
      data-testid={ `${indexId}-product-card` }
      className="card p-4 flex-fill w-25 p-3"
    >
      <div className="card-header">
        <p data-testid={ `${indexId}-product-price` }>{`R$ ${changedPrice}`}</p>
      </div>
      <img
        data-testid={ `${indexId}-product-img` }
        src={ img }
        alt="Product cover"
        className="card-img-top w-100 p-3"
      />
      <div className="card-body d-flex">
        <p data-testid={ `${indexId}-product-name` } className="align-self-end">{name}</p>
      </div>
      <div className="card-footer d-inline-flex justify-content-around">
        <button
          type="button"
          data-testid={ `${indexId}-product-minus` }
          className="btn btn-danger"
          onClick={ () => decreaseQtd() }
        >
          -
        </button>
        <p data-testid={ `${indexId}-product-qtd` }>{quantity}</p>
        <button
          type="button"
          data-testid={ `${indexId}-product-plus` }
          className="btn btn-primary"
          onClick={ () => increaseQtd() }
        >
          +
        </button>
      </div>
    </div>
  );
}

ProductCard.propTypes = {
  indexId: propTypes.number.isRequired,
  price: propTypes.string.isRequired,
  id: propTypes.number.isRequired,
  name: propTypes.string.isRequired,
  img: propTypes.string.isRequired,
};

export default ProductCard;
