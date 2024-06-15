import { Router } from 'express';

import userRoutes from './users';
import userChatsRoutes from './chats';

const router = Router();
router.use('/api/users', userRoutes)
router.use('/api/chats', userChatsRoutes)

export default router;