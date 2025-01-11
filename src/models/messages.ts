import { DataTypes } from 'sequelize';


import { MessageInstance } from '../interfaces/messages.interfaces';
import db from '../db/connection';
import User from './user';

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

Message.belongsTo(User, { foreignKey: 'user_id' });
User.hasMany(Message, { foreignKey: 'user_id' });

export default Message;