import jwt from 'jsonwebtoken';
import { envs } from './envs';

export const generateToken = (payload: Object): Promise<string | null> => {
    return new Promise((resolve) => {
        jwt.sign(payload, envs.JWT_SEED, { expiresIn: '1h' }, (err, token) => {
            if (err) resolve(null);
            resolve(token!);
        });
    });
}

export const validateToken = <T>(token: string): Promise<T | null> => {
    return new Promise((resolve) => {
        jwt.verify(token, envs.JWT_SEED, (err, decoded) => {
            if (err) return resolve(null);
            resolve(decoded as T);
        });
    });
}