import { CustomValidator } from 'express-validator';

import User from '../models/user';
import Chat from '../models/chats';
import UserChat from '../models/user-chat';

export const isNewEmail: CustomValidator = async (email: string) => {
    const query = await User.findOne({ where: { email: email } });
    if (query) {
        throw new Error('The email address provided already exists');
    }
    return true;
}

export const isNewUsername: CustomValidator = async (username: string) => {
    const query = await User.findOne({ where: { username: username } });
    if (query) {
        throw new Error('The username address provided already exists');
    }
    return true;
}

export const userExists: CustomValidator = async (user_id: string) => {
    const query = await User.findOne({ where: { user_id: user_id } });
    if (!query) {
        throw new Error('The user provided was not found');
    }
    return true;
}

export const chatExists: CustomValidator = async (chat_id: string) => {
    const query = await Chat.findOne({ where: { chat_id: chat_id } });
    if (!query) {
        throw new Error('The chat provided was not found');
    }
    return true;
}

export const memberExistsInChat: CustomValidator = async (user_id: string, { req }) => {
    const chat_id = req.body.chat_id;
    const query = await UserChat.findOne({
        where: {
            chat_id: chat_id,
            user_id: user_id
        }
    });
    if (query) {
        throw new Error('This user is already a member of the chat');
    }
    return true;
}