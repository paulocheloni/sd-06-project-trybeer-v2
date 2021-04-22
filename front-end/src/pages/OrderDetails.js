import React, { useContext, useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import AppContext from '../context/app.context';

import { Topbar, Loading, OrderDetails as OrderDetailComponent } from '../components';
import salesApi from '../services/api.sales';

import '../styles/OrderDetails.css';

export default function OrderDetails() {
  const { tokenContext: { token } } = useContext(AppContext);
  const [order, setOrder] = useState();
  const params = useParams();

  const history = useHistory();

  const title = 'Meu Pedido';

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const currOrder = await salesApi({ ...token, saleId: params.id });
        if (currOrder.code) {
          history.push({
            pathname: '/error',
            state: { ...currOrder } });
        }
        setOrder(currOrder);
      } catch (error) {
        console.log(error);
      }
    };
    fetchOrder();
  }, [setOrder, params, token, history]);

  return (
    <section>
      <Topbar title={ title } />
      { (!order)
        ? <Loading />
        : <OrderDetailComponent order={ order } callback={ setOrder } /> }
    </section>
  );
}
