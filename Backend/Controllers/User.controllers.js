import User from '../Models/User.model.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

// login

export async function logincontroller(req, res) {
  try {
    const { Email, password } = req.body;

    const user = await User.findOne({ Email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const ismatch = await bcrypt.compare(password, user.password);
    if (!ismatch)
      return res.status(400).json({ message: 'ivalid credentials' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '6h',
    });

    res.status(200).send({ token: token, message: 'user logedin', user: user });
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: 'internal server error' });
  }
}

// sign up

export async function signupcontroller(req, res) {
  try {
    const { firstname, lastname, Email, password } = req.body;

    const existingUser = await User.findOne({ Email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newuser = new User({
      firstname,
      lastname,
      Email,
      password: hashedPassword,
      role: 'user',
    });

    await newuser.save();
    res.status(200).send({ message: 'user registered' });
  } catch (err) {
    res.status(500).send({ message: 'internal server error' });
  }
}

// delete user

export async function deleteusercontroller(req, res) {
  try {
    const { id } = req.param;
    const deleteuser = await User.findByIdAndDelate(id);

    if (!deleteuser) return res.status(404).send({ message: 'user not found' });

    res.status(200).send({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(500).send({ message: 'Internal server error' });
  }
}

// update user

export async function updateusercontroller(req, res) {
  try {
    const { id } = req.param;
    const { firstname, lastname, Email, password } = req.body;

    const updateuser = await User.findByIdAndUpdate(
      id,
      { firstname, lastname, Email, password },
      { new: true }
    );

    if (!updateuser) return res.status(404).send({ message: 'user not found' });

    res.status(200).send({ message: 'infomation updated successfully' });
  } catch (err) {
    res
      .status(500)
      .send({ message: 'Error updating item due to iternale server error' });
  }
}
