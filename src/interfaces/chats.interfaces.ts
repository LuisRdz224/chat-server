import { Model } from 'sequelize';

interface ChatAttributes {
    chat_id: string,
    creator_id: string,
    name: string
}

export interface ChatInstance extends Model<ChatAttributes>, ChatAttributes { }

export interface RegisterChatDto {
    name: string
}