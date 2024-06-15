import { DataTypes } from 'sequelize';

import { ChatInstance } from '../interfaces/chats.interfaces';
import db from '../db/connection';

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

export default Chat;