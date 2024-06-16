import { DataTypes } from 'sequelize';

import db from '../db/connection';
import { UserChatInstance } from '../interfaces/user-chat.interfaces';

const UserChat = db.define<UserChatInstance>('user_chat', {
    user_chat_id: {
        type: DataTypes.UUIDV4,
        primaryKey: true,
    },
    user_id: {
        type: DataTypes.UUIDV4,
        allowNull: false,
    },
    chat_id: {
        type: DataTypes.UUIDV4,
        allowNull: false,
    }
}, {
    freezeTableName: true,
    timestamps: false
})

export default UserChat