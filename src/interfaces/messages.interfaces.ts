import { Model } from 'sequelize';

interface MessagesAttributes {
    message_id: string,
    chat_id: string,
    user_id: string,
    message_text: string
}

export interface MessageInstance extends Model<MessagesAttributes>, MessagesAttributes { }

export interface MessagePostDto {
    chat_id: string,
    message_text: string
}