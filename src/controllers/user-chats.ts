import { Response } from 'express';
import { v4 as uuidv4 } from 'uuid';

import UserChat from '../models/user-chat';
import { handleError } from '../helpers';
import { CustomRequest } from '../interfaces/user.interfaces';

export const addMemberToChat = async (req: CustomRequest, res: Response) => {
    const { member, chat_id } = req.body;
    const id = uuidv4();
    try {
        const userChat = await UserChat.create({
            user_chat_id: id,
            user_id: member,
            chat_id: chat_id,
        });
        res.status(201).json(userChat);
    } catch (error) {
        return handleError({
            error: error,
            statusCode: 500,
            message: 'Internal server error'
        }, res);
    }
}
