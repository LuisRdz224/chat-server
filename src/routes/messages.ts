import { check } from 'express-validator';
import { Router } from 'express';

import { chatExists } from '../helpers/db-validators';
import { getMessagesFromChat, postMessage } from '../controllers/messages';
import { validateFields, validateJWT } from '../middlewares';

const router = Router();

router.get('/:chat_id', [
    validateJWT,
    check('chat_id').not().isEmpty().withMessage('Chat is required'),
    check('chat_id').custom(chatExists),
    validateFields
], getMessagesFromChat);

router.post('/', [
    validateJWT,
    check('message_text').not().isEmpty().withMessage('Message is required'),
    check('chat_id').not().isEmpty().withMessage('Chat is required'),
    check('chat_id').custom(chatExists),
    validateFields
], postMessage);

export default router;