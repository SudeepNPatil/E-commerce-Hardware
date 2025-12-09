import Contact from '../Models/Contact.model.js';
import CustomOrder from '../Models/CustomOrders.model.js';
import newsletter from '../Models/newsletter.model.js';
import Products from '../Models/Product.model.js';
import ReadymadeOrder from '../Models/ReadymadeOrders.model.js';
import User from '../Models/User.model.js';

export async function userinfo(req, res) {
  try {
    const users = await User.find();

    if (!users) {
      res.status(200).send({ message: 'no user are there yet', users: [] });
    }

    res.status(200).send({ message: 'userinfo', users: users });
  } catch (err) {
    res.status(500).send({ message: 'internal server error' });
  }
}

export async function deleteuser(req, res) {
  try {
    const { id } = req.params;

    const deluser = await User.findByIdAndDelete(id);

    if (!deluser) {
      res.status(404).send({ message: 'user not found' });
    }

    res.status(200).send({ message: 'deleted successfully', deluser: deluser });
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: 'internal server error', err });
  }
}

export async function totalinfo(req, res) {
  try {
    const totalUsers = await User.find();

    const totalContacts = await Contact.find();

    const totalNewsletter = await newsletter.find();

    const totalProducts = await Products.find();

    const totalCustomOrders = await CustomOrder.find();

    const totalReadymadeOrders = await ReadymadeOrder.find();

    res.status(200).send({
      message: 'all the info count',
      totalUsers: totalUsers.length,
      totalContacts: totalContacts.length,
      totalNewsletter: totalNewsletter.length,
      totalProducts: totalProducts.length,
      totalCustomOrders: totalCustomOrders.length,
      totalReadymadeOrders: totalReadymadeOrders.length,
    });
  } catch (er) {
    res.status(500).send({ message: 'internal server error' });
  }
}
