import { Model, Optional } from 'sequelize';
import { UserInstance } from './user.interfaces';

interface ChatAttributes {
    chat_id: string,
    creator_id: string,
    name: string
}
interface ChatCreationAttributes extends Optional<ChatAttributes, 'chat_id'> { }
export interface ChatInstance extends Model<ChatAttributes, ChatCreationAttributes>, ChatAttributes {
    user: UserInstance
}

export interface RegisterChatDto {
    name: string
}