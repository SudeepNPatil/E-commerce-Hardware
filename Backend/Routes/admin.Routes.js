import { Router } from 'express';
import {
  deleteuser,
  totalinfo,
  userinfo,
} from '../Controllers/admin.controller.js';
import authMiddleware, { authorizerole } from '../Middlewares/auth.js';

const adminroute = Router();

adminroute.get('/userinfo', authMiddleware, userinfo);

adminroute.delete('/deleteuser/:id', deleteuser);

adminroute.get('/info', totalinfo);

export default adminroute;
