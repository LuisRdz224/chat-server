import { Request, Response } from 'express';

export const getMessages = async (req: Request, res: Response) => {
    res.status(200).json('Hello from messages');
}