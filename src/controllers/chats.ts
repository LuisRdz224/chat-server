import { Response } from 'express';
import { v4 as uuidv4 } from 'uuid';

import { CustomRequest } from '../interfaces/user.interfaces';
import { handleError } from '../helpers';
import { RegisterChatDto } from '../interfaces/chats.interfaces';
import Chat from '../models/chats';
import User from '../models/user';

export const getChats = async (req: CustomRequest, res: Response) => {
    try {
        const chats = await Chat.findAll({
            include: [{
                model: User,
                attributes: ['username']
            }]
        });

        const formattedChats = chats.map(chat => ({
            chat_id: chat.chat_id,
            name: chat.name,
            creator_name: chat.user!.username
        }));

        res.status(200).json(formattedChats);
    } catch (error) {
        return handleError({
            error: error,
            statusCode: 500,
            message: 'Internal server error',
        }, res);
    }
};



export const postChat = async (req: CustomRequest, res: Response) => {
    const { name }: RegisterChatDto = req.body;
    const id = uuidv4();
    try {
        const chat = await Chat.create({
            chat_id: id,
            name: name,
            creator_id: req.user!.user_id
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
