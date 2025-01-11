import { DataTypes } from 'sequelize';

import { UserInstance } from '../interfaces/user.interfaces';
import db from '../db/connection';
import Chat from './chats';
import Message from './messages';

const User = db.define<UserInstance>('user', {
    user_id: {
        type: DataTypes.UUIDV4,
        primaryKey: true,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    create_time: {
        type: DataTypes.TIME
    },
}, {
    freezeTableName: true,
    timestamps: false
})

export default User;