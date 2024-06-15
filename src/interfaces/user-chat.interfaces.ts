import { Model } from 'sequelize';

interface UserChatAttributes {
    user_chat_id: string,
    user_id: string,
    chat_id: string
}

export interface UserChatInstance extends Model<UserChatAttributes>, UserChatAttributes { }