import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ cart, disabled, id, callback }) => {
  const cartTotal = Object.keys(cart).reduce(
    (sum, curr) => (
      sum + (cart[curr].price * cart[curr].quantity)
    ), 0,
  ).toFixed(2).replace('.', ',');

  let testId;
  let label;
  switch (id) {
  case 'cart':
    label = 'Ver Carrinho';
    testId = 'checkout-bottom-btn';
    break;
  case 'checkout':
    label = 'Finalizar Pedido';
    testId = 'checkout-finish-btn';
    break;
  case 'updateDeliver':
    label = 'Marcar como entregue';
    testId = 'mark-as-delivered-btn';
    break;
  default:
    return null;
  }

  return (
    <button
      type="button"
      onClick={ callback }
      disabled={ disabled }
      data-testid={ testId }
    >
      <span>
        { label }
      </span>
      { (id !== 'updateDeliver') && (
        <span data-testid="checkout-bottom-btn-value">
          { `R$ ${cartTotal}` }
        </span>
      ) }
    </button>
  );
};

export default Button;

Button.propTypes = {
  cart: PropTypes.objectOf(PropTypes.any),
  disabled: PropTypes.bool,
  id: PropTypes.string,
  callback: PropTypes.func,
};

Button.defaultProps = {
  cart: {},
  callback: () => {},
  disabled: false,
  id: '',
};
