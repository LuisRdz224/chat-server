import { DataTypes } from 'sequelize';

import { UserInstance } from '../interfaces/user.interfaces';
import db from '../db/connection';

const User = db.define<UserInstance>('user', {
    id: {
        type: DataTypes.UUID,
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
    timestamps: true
})

export default User;