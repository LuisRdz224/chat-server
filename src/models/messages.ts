import { DataTypes } from 'sequelize';


import db from '../db/connection';
import { MessageInstance } from '../interfaces/messages.interfaces';

const Message = db.define<MessageInstance>('messages', {
    message_id: {
        type: DataTypes.UUIDV4,
        primaryKey: true,
    },
    chat_id: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    user_id: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    message_text: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    created_at: {
        type: DataTypes.STRING,
    },
}, {
    freezeTableName: true,
    timestamps: false
})

// Chat.hasMany(UserChat, { foreignKey: 'chat_id' });
// UserChat.belongsTo(Chat, { foreignKey: 'chat_id' });

export default Message;