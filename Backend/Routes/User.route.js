import { Router } from 'express';
import { logincontroller } from '../Controllers/User.controllers.js';
import { signupcontroller } from '../Controllers/User.controllers.js';
import { updateusercontroller } from '../Controllers/User.controllers.js';
import { deleteusercontroller } from '../Controllers/User.controllers.js';
import authMiddleware from '../Middlewares/auth.js';

const route = Router();

route.get('/login', logincontroller);

route.post('/signup', signupcontroller);

route.put('/update/:id', authMiddleware, updateusercontroller);

route.delete('/user/:id', authMiddleware, deleteusercontroller);

route.get('logout', authMiddleware, (req, res) => {
  res.status(200).send({ message: 'logout successfully' });
});

export default route;
