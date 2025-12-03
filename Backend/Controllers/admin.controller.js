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
