import { check } from 'express-validator';
import { Router } from 'express';

import { getUser, loginUser, postUser } from '../controllers/users';
import { isNewEmail, isNewUsername } from '../helpers/db-validators';
import { validateFields } from '../middlewares';

const router = Router();

router.get('/', getUser)

router.post('/', [
    check('username', 'Username is required').trim().notEmpty().isString().isLength({ max: 50 }),
    check('email', 'Email is not valid').isEmail(),
    check('password', 'Password must be at least 6 characters').notEmpty().isLength({ min: 6 }),
    check('email').custom(isNewEmail),
    check('username').custom(isNewUsername),
    validateFields
], postUser)

router.post('/login', [
    check('email', 'email is required').notEmpty(),
    check('password', 'password is required').notEmpty(),
    validateFields
], loginUser)

export default router;