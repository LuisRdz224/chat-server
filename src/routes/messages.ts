import { Router } from 'express';
import { getMessages, postMessage } from '../controllers/messages';
import { check } from 'express-validator';
import { validateFields, validateJWT } from '../middlewares';

const router = Router();

router.get('/', getMessages);

router.post('/', [
    validateJWT,
    check('message_text').not().isEmpty().withMessage('Message is required'),
    check('chat_id').not().isEmpty().withMessage('Chat is required'),
    check('user_id').not().isEmpty().withMessage('User is required'),
    validateFields
], postMessage);

export default router;