import { Request, Response } from 'express';
import { hashSync, compareSync } from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';

import { UserMapper, LoginUserDto, RegisterUserDto } from '../interfaces/user.interfaces';
import User from '../models/user';
import { handleError } from '../helpers';
import { generateToken } from '../config/jwt';

export const getUser = async (req: Request, res: Response) => {
    res.json('hello from /api/users');
}

export const postUser = async (req: Request, res: Response) => {
    const { username, email, password }: RegisterUserDto = req.body;
    const creationDate: string = new Date().toISOString().slice(0, 19).replace('T', ' ');
    try {
        const encryptedPassword: string = hashSync(password);
        const id = uuidv4();
        const user = await User.create({
            user_id: id,
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

export const loginUser = async (req: Request, res: Response) => {
    const { email, password }: LoginUserDto = req.body;
    try {
        const user = await User.findOne({ where: { email: email } })
        if (!user) {
            return handleError({ statusCode: 401, message: 'Login credentials are invalid' }, res);
        }
        if (!compareSync(password, user.password)) {
            return handleError({ statusCode: 401, message: 'Login credentials are invalid' }, res);
        }
        const token = await generateToken({ id: user.user_id })
        if (!token) {
            const error = new Error('Could not generate token');
            return handleError({ error: error, statusCode: 500, message: 'Internal server error' }, res)
        }
        res.json({
            token: token,
            user: {
                id: user.user_id,
                username: user.username,
                email: user.email
            }
        })
    } catch (error) {
        handleError({
            error: error,
            statusCode: 500,
            message: 'Internal server error'
        }, res);
    }

}