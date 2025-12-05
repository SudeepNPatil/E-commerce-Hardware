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

contactRoute.get('/', async (req, res) => {
  try {
    const contactinfo = await Contact.find();

    if (!contactinfo) {
      return res.status(200).send({ message: 'no contact yet', Contacts: [] });
    }

    res.status(200).send({ message: 'all contactinfo', Contacts: contactinfo });
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: 'internal server error' });
  }
});

contactRoute.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).send({ message: 'id is required' });
    }

    const deletecontact = await Contact.findByIdAndDelete(id);

    res.status(200).send({ message: 'deleted the contact successfully' });
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: 'internal server error' });
  }
});

export default contactRoute;
