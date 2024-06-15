import { Request, Response } from 'express';
import { hashSync, compareSync } from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';

import { UserMapper } from '../interfaces/user.interfaces';
import User from '../models/user';
import { handleError } from '../helpers';

export const getUser = async (req: Request, res: Response) => {
    res.json('hello from /api/users');
}

export const postUser = async (req: Request, res: Response) => {
    const { username, email, password } = req.body;
    const creationDate: string = new Date().toISOString().slice(0, 19).replace('T', ' ');
    try {
        const encryptedPassword: string = hashSync(password);
        const id = uuidv4();
        const user = await User.create({
            id: id,
            username: username,
            email: email,
            password: encryptedPassword,
            create_time: creationDate
        })
        const userWithoutPassword: UserMapper = { ...user.dataValues };
        delete userWithoutPassword.password;
        res.status(201).json(userWithoutPassword)
    } catch (error) {
        handleError({
            error: error,
            statusCode: 500,
            message: 'Internal server error'
        }, res);
    }
}