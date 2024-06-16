import { Response } from 'express';
import { v4 as uuidv4 } from 'uuid';

import Chat from '../models/chats';
import { handleError } from '../helpers';
import { CustomRequest } from '../interfaces/user.interfaces';

export const postChat = async (req: CustomRequest, res: Response) => {
    const { name } = req.body;
    const id = uuidv4();
    try {
        const chat = await Chat.create({
            chat_id: id,
            name: name,
            creator_id: req.user!.id
        });
        res.status(201).json(chat);
    } catch (error) {
        return handleError({
            error: error,
            statusCode: 500,
            message: 'Internal server error'
        }, res);
    }
}
