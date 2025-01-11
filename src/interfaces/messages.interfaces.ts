import { Model, Optional } from 'sequelize';
import { UserInstance } from './user.interfaces';

interface MessagesAttributes {
    message_id: string,
    chat_id: string,
    user_id: string,
    message_text: string,
    created_at: string
}

interface MessagesCreationAttributes extends Optional<MessagesAttributes, 'message_id'> { }
export interface MessageInstance extends Model<MessagesAttributes, MessagesCreationAttributes>, MessagesAttributes {
    user: UserInstance
}

export interface MessagePostDto {
    chat_id: string,
    message_text: string
}