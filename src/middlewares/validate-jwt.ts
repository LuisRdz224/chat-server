import { Response, NextFunction } from 'express';

import { CustomRequest } from '../interfaces/user.interfaces';
import { validateToken } from '../config';
import User from '../models/user';

export const validateJWT = async (req: CustomRequest, res: Response, next: NextFunction) => {
    const authorization: string | undefined = req.header('Authorization');
    if (!authorization) return res.status(401).json({ error: 'no token provided' });
    if (!authorization.startsWith('Bearer ')) return res.status(401).json({ error: 'Invalid bearer token' })
    const token: string = authorization.split(' ').at(1) || '';
    try {
        const payload = await validateToken<{ id: number }>(token);
        if (!payload) return res.status(401).json({ error: 'Invalid token' })
        const user = await User.findByPk(payload.id);
        if (!user) return res.status(401).json({ error: 'Invalid token - User not found' })
        req.user = {
            id: user.id,
            username: user.username,
            email: user.email,
        };
        next();
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Internal server error' });
    }

}

