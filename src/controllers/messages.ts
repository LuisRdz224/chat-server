import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';

import Message from '../models/messages';
import { handleError } from '../helpers';
import { CustomRequest } from '../interfaces/user.interfaces';
import { MessagePostDto } from '../interfaces/messages.interfaces';


export const getMessages = async (req: Request, res: Response) => {
    res.status(200).json('Hello from messages');
}

export const postMessage = async (req: CustomRequest, res: Response) => {
    const { message_text, chat_id }: MessagePostDto = req.body;
    const id = uuidv4();
    console.log(message_text, chat_id, req.user!.id);
    res.status(200).json('Hello from messages');

    // try {
    //     const message = await Message.create({
    //         message_id: id,
    //         chat_id: chat_id,
    //         user_id: user_id,
    //         message_text: message_text
    //     });
    //     res.status(201).json(message);
    // } catch (error) {
    //     return handleError({
    //         error: error,
    //         statusCode: 500,
    //         message: 'Internal server error'
    //     }, res);
    // }
}