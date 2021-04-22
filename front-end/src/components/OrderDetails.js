import React, { useContext } from 'react';
import { PropTypes } from 'prop-types';
import AppContext from '../context/app.context';

import OrderProduct from './OrderProduct';
import { convertDate } from '../utils';

export default function OrderDetails({ order }) {
  const { productsContext: { products } } = useContext(AppContext);

  if (!order.products || !products) return 'Loading order...';

  return (
    <section className="order-detail-wrapper">
      <h3 data-testid="order-number">{ `Pedido ${order.id}` }</h3>
      <p data-testid="order-date">{ convertDate(order.createdAt)[0] }</p>
      <section>
        <p data-testid="order-status">{ order.status }</p>
      </section>
      { order.products.map((curr, index) => (
        <OrderProduct index={ index } product={ curr } key={ index } />
      )) }
      <p data-testid="order-total-value">
        { `Total: R$ ${order.totalPrice.replace('.', ',')}` }
      </p>
    </section>
  );
}

OrderDetails.propTypes = {
  order: PropTypes.objectOf(PropTypes.any),
};

OrderDetails.defaultProps = {
  order: {},
};
