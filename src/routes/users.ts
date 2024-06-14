import { Router } from 'express';
import { check } from 'express-validator';

import { getUser, postUser } from '../controllers/users';
//TODO: Import middlewares, helpers, controllers


const router = Router();

router.get('/', getUser)

router.post('/', postUser)

export default router;