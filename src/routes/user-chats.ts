import { Router } from 'express';

import { addMemberToChat } from '../controllers/user-chats';
import { chatExists, memberExistsInChat, userExists } from '../helpers/db-validators';
import { check } from 'express-validator';
import { validateFields } from '../middlewares';



const router = Router();

router.post('/', [
    check('member', 'member is required').notEmpty(),
    check('member', 'member must be a valid UUID').isUUID(),
    check('chat_id', 'chat is required').notEmpty(),
    check('chat_id', 'chat must be a valid UUID').isUUID(),
    check('chat_id').custom(chatExists),
    check('member').custom(userExists),
    check('member').custom(memberExistsInChat),
    validateFields
], addMemberToChat);

export default router;