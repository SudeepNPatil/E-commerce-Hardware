import { Router } from 'express';
import { userinfo } from '../Controllers/admin.controller.js';
import authMiddleware, { authorizerole } from '../Middlewares/auth.js';

const adminroute = Router();

adminroute.get('/userinfo', authMiddleware, userinfo);

export default adminroute;
