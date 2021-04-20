const { Router } = require('express');
const Service = require('../services/orderService');
const { Sale, User } = require('../models');
const status = require('../utils/httpStatusCode');

const orderRouter = Router();
const erroReturnCatch = status.INTERNAL_SERVER_ERROR;
const messageJson = { message: 'Internal Server Error' };

orderRouter.post('/', async (req, res) => {
  try {
    const { email, totalPrice, deliveryAddress, deliveryNumber, date, saleProduct } = req.body;

    const { id } = await User.findOne({ where: { email } });

    await Service.createSale({ id, totalPrice, deliveryAddress, deliveryNumber, date, saleProduct });

    res.status(200).json(id, totalPrice, deliveryAddress, deliveryNumber, date);
  } catch (error) {
    console.log(error.message);
    return res.status(erroReturnCatch).json(messageJson);
  }
});

orderRouter.get('/', async (_req, res) => {
  try {
    const allSales = await Service.getAll();

    return res.status(status.OK).json(allSales);
  } catch (error) {
    return res.status(erroReturnCatch).json(messageJson);
  }
});

orderRouter.get('/:id', async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    const Sale = await Service.getBySalesId(id);

    return res.status(status.OK).json(Sale);
  } catch (error) {
    return res.status(erroReturnCatch).json(messageJson);
  }
});

orderRouter.put('/', async (req, res) => {
  const { id } = req.body;
  const updateStatus = await Sale.findByPk(id);
  updateStatus.status = 'Entregue';
  updateStatus.save();
  res.status(200).json('atualizado');
});

module.exports = orderRouter;
