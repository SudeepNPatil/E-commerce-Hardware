import { Router } from 'express';
import CustomOrder from '../Models/CustomOrders.model.js';

const router = Router();

router.post('/save-order', async (req, res) => {
  try {
    const newOrder = await CustomOrder.create(req.body);
    res.json({ success: true, data: newOrder });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/allorders', async (req, res) => {
  try {
    const allorders = await CustomOrder.find();

    if (!allorders || allorders.length === 0) {
      return res.status(200).send({ message: 'no orders yet' });
    }

    res.status(200).send({ message: 'all orders info', orders: allorders });
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: 'internal server error' });
  }
});

router.get('/orders/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const orders = await CustomOrder.find({ userId: id });

    if (!orders) {
      return res.status(200).send({ message: 'no orders yet', orders: [] });
    }

    res.status(200).send({ message: 'orders info', orders: orders });
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: 'internal server error' });
  }
});

router.put('/trackorder/:id/:status', async (req, res) => {
  try {
    const { id, status } = req.params;
    const updatedata = { status };

    if (status === 'confirmed') {
      updatedata.confirmedOn = new Date();
    }
    if (status === 'shipped') {
      updatedata.shippedOn = new Date();
    }
    if (status === 'outfordelivery') {
      updatedata.outfordeliveryOn = new Date();
    }
    if (status === 'delivered') {
      updatedata.deliveredOn = new Date();
    }

    const updatedstatus = await CustomOrder.findByIdAndUpdate(
      id,
      { $set: updatedata },
      {
        new: true,
      }
    );

    if (!updatedstatus) {
      return res.status(200).send({ message: 'no orders found' });
    }

    res
      .status(200)
      .send({ message: 'updated the orderstatus info', orders: updatedstatus });
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: 'internal server error' });
  }
});

router.delete('/orders/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedorders = await CustomOrder.findByIdAndDelete(id);

    if (!deletedorders) {
      return res.status(400).send({ message: 'not found' });
    }

    res
      .status(200)
      .send({ message: 'orders info', deletedorders: deletedorders });
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: 'internal server error' });
  }
});

export default router;
