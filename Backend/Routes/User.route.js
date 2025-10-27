import { Router } from 'express';
import { logincontroller } from '../Controllers/User.controllers.js';
import { signupcontroller } from '../Controllers/User.controllers.js';
import { updateusercontroller } from '../Controllers/User.controllers.js';
import { deleteusercontroller } from '../Controllers/User.controllers.js';
import authMiddleware from '../Middlewares/auth.js';
import User from '../Models/User.model.js';

const route = Router();

route.post('/login', logincontroller);

route.post('/signup', signupcontroller);

route.put('/update/:id', authMiddleware, updateusercontroller);

route.delete('/user/:id', authMiddleware, deleteusercontroller);

route.get('/verify', authMiddleware, async (req, res) => {
  const id = req.user.id;
  const user = await User.findById(id);
  res.status(200).send({ message: 'varified', user: user });
});

route.get('logout', authMiddleware, (req, res) => {
  res.status(200).send({ message: 'logout successfully' });
});

export default route;
