import { DataTypes } from 'sequelize';

import { ChatInstance } from '../interfaces/chats.interfaces';
import db from '../db/connection';
import User from './user';
import UserChat from './user-chat';
import Message from './messages';

const Chat = db.define<ChatInstance>('chats', {
    chat_id: {
        type: DataTypes.UUIDV4,
        primaryKey: true,
    },
    creator_id: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {
    freezeTableName: true,
    timestamps: false
})

Chat.hasMany(UserChat, { foreignKey: 'chat_id' });
UserChat.belongsTo(Chat, { foreignKey: 'chat_id' });

Chat.hasMany(Message, { foreignKey: 'chat_id' });
Message.belongsTo(Chat, { foreignKey: 'chat_id' });
export default Chat;