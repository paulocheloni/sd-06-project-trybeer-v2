import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';

import { getAdminOrderById, updateStatus } from '../../Services/Apis';

import CardAdminProduct from '../CardAdminProduct';

import S from './styles';

const modifyStatus = async (setPending, id) => {

  setPending(false);

  await updateStatus(id, 'Entregue');
};

const modifyPreparingStatus = async (setPreparing, id) => {
  setPreparing(false);
  console.log('entrei no preparingStatus');
  await updateStatus(id, 'Preparando');
};

const CardAdminDetails = () => {
  const [orders, setOrders] = useState();
  const [pending, setPending] = useState(true);
  const [status, setStatus] = useState(false);
  const [preparing, setPreparing] = useState(true);

  const { id } = useParams();

  useEffect(() => {
    const fetchMyOrders = async () => {
      const fetchData = await getAdminOrderById(id);
      setOrders(fetchData);
      setStatus(fetchData.status);
      
      if (fetchData.status === 'Pendente') {
        setPending(true);
      } else {
        setPending(false);
      }
      if (fetchData.status === 'Preparando' || fetchData.status === 'Pendente') {
        setPreparing(true);
      } else {
        setPreparing(false);
      }
    };

    fetchMyOrders();
  }, [id]);

  return (
    <S.Container pending={ pending }>
      <S.ColorStatus pending={ pending } />
      <S.ColorStatusBottom pending={ pending } />

      {orders && (
        <S.Content>
          <S.ContentLeft pending={ pending }>
            <div>
              <h1 data-testid="order-number">
                {`Pedido ${orders.id}`}
              </h1>

              <h2 data-testid="order-status">
                {status}
              </h2>
            </div>

            <h3>{`${orders.deliveryAddress}, ${orders.deliveryNumber}`}</h3>
          </S.ContentLeft>

          {orders.products.map((product, index) => (
            <CardAdminProduct
              key={ index }
              product={ product }
              index={ index }
            />
          ))}

          <S.ContentRight>
            <h1 data-testid="order-total-value">
              <span>Valor total:</span>
              {' '}
              R$
              {' '}
              {(!orders.totalPrice ? '' : Number(orders.totalPrice)).toFixed(2).replace('.', ',')}
            </h1>

            <S.PreparingButton
              type="button"
              preparing={ preparing }
              data-testid="mark-as-prepared-btn"
              onClick={ () => modifyPreparingStatus(setPreparing, id) }
            >
              Preparar Pedido
            </S.PreparingButton>

            <S.ConfirmButton
              type="button"
              pending={ pending }
              data-testid="mark-as-delivered-btn"
              onClick={ () => modifyStatus(setPending, id) }
            >
              Marcar como entregue
            </S.ConfirmButton>
          </S.ContentRight>
        </S.Content>
      )}

    </S.Container>
  );
};
export default CardAdminDetails;
