import { Router } from 'express';

import userRoutes from './users';
import chatsRoutes from './chats';
import userChatsRoutes from './user-chats';
import messagesRoutes from './messages';

const router = Router();
router.use('/api/users', userRoutes)
router.use('/api/chats', chatsRoutes)
router.use('/api/user-chats', userChatsRoutes)
router.use('/api/messages', messagesRoutes)

export default router;