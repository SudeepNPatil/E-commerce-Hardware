import { Router } from 'express';
import authMiddleware from '../Middlewares/auth.js';
import Contact from '../Models/Contact.model.js';

const contactRoute = Router();

contactRoute.post('/', authMiddleware, async (req, res) => {
  const { name, email, number, text } = req.body;

  const newcontact = new Contact({
    name,
    email,
    number,
    text,
  });

  await newcontact.save();

  res.status(200).send({ message: 'session booked' });
});

export default contactRoute;
