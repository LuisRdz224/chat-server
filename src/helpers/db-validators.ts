import { CustomValidator } from 'express-validator';

import User from '../models/user';

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