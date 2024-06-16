import { Router } from 'express';
import { check } from 'express-validator';

import { postChat } from '../controllers/chats';
import { validateFields } from '../middlewares';
import { validateJWT } from '../middlewares';


const router = Router();

router.post('/', [
    validateJWT,
    check('name', 'name field is required').trim().notEmpty().isString(),
    check('name', 'name must be not longer than 255 characters').notEmpty().isLength({ max: 255 }),
    validateFields
], postChat)

export default router;