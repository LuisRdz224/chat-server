import crypto from 'crypto';
import { envs } from '../config/envs';

const algorithm = 'aes-256-cbc';
const secretKey = envs.ENCRYPTION_KEY;
const ivLength = 16;


export const encrypt = (text: string): string => {
    const iv = crypto.randomBytes(ivLength);
    const cipher = crypto.createCipheriv(algorithm, Buffer.from(secretKey, 'hex'), iv);
    const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);
    return `${iv.toString('hex')}:${encrypted.toString('hex')}`;
};

export const decrypt = (hash: string): string => {
    const [ivPart, encryptedData] = hash.split(':');
    const iv = Buffer.from(ivPart, 'hex');
    const decipher = crypto.createDecipheriv(algorithm, Buffer.from(secretKey, 'hex'), iv);
    const decrypted = Buffer.concat([decipher.update(Buffer.from(encryptedData, 'hex')), decipher.final()]);
    return decrypted.toString();
};