import { Router } from 'express';
import ReadymadeOrder from '../Models/ReadymadeOrders.model.js';

const router = Router();

router.post('/save-order', async (req, res) => {
  try {
    const newOrder = await ReadymadeOrder.create(req.body);
    res.json({ success: true, data: newOrder });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/allorders', async (req, res) => {
  try {
    const allorders = await ReadymadeOrder.find();

    if (!allorders) {
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
    const orders = await ReadymadeOrder.find({ userId: id });

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
    const updatedstatus = await ReadymadeOrder.findByIdAndUpdate(id, status, {
      new: true,
    });

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
    const deletedorders = await ReadymadeOrder.findByIdAndDelete(id);

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
