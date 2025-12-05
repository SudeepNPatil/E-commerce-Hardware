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
