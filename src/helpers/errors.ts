import { Response } from 'express';

interface ErrorInfo {
    error?: unknown,
    statusCode: number,
    message: string
}

export const handleError = (errorInfo: ErrorInfo, res: Response) => {
    const { error, statusCode, message } = errorInfo;
    if (error) console.log(error);
    return res.status(statusCode).json({ error: message });
}