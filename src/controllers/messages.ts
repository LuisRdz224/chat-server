import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';

import { CustomRequest } from '../interfaces/user.interfaces';
import { decrypt, encrypt } from '../helpers/encrypt-decrypt';
import { handleError } from '../helpers';
import { MessagePostDto } from '../interfaces/messages.interfaces';
import Message from '../models/messages';


export const getMessagesFromChat = async (req: Request, res: Response) => {
    try {
        const messages = await Message.findAll({
            where: {
                chat_id: req.params.chat_id
            }
        });

        const decryptedMessages = messages.map((message) => {
            return {
                message_id: message.message_id,
                chat_id: message.chat_id,
                user_id: message.user_id,
                message_text: decrypt(message.message_text),
                created_at: message.created_at
            }
        })
        res.status(200).json(decryptedMessages);
    } catch (error) {
        return handleError({
            error: error,
            statusCode: 500,
            message: 'Internal server error'
        }, res);
    }
}

export const postMessage = async (req: CustomRequest, res: Response) => {
    const { message_text, chat_id }: MessagePostDto = req.body;
    const id = uuidv4();
    try {
        const encryptedMessage = encrypt(message_text);
        const message = await Message.create({
            message_id: id,
            chat_id: chat_id,
            user_id: req.user!.id,
            message_text: encryptedMessage,
            created_at: new Date().toISOString().slice(0, 19).replace('T', ' ')
        });
        res.status(201).json(message);
    } catch (error) {
        return handleError({
            error: error,
            statusCode: 500,
            message: 'Internal server error'
        }, res);
    }
}