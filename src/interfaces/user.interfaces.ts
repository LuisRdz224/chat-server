import { Request } from 'express';
import { Model, Optional } from 'sequelize';

interface UserAttributes {
    id: string,
    username: string,
    email: string,
    password: string,
    create_time: string
}
interface UserCreationAttributes extends Optional<UserAttributes, 'id'> { }
export interface UserInstance extends Model<UserAttributes, UserCreationAttributes>, UserAttributes { }

export interface UserMapper {
    id: string,
    username: string,
    email: string,
    password?: string,
    create_time: string
}

export interface LoginUserDto {
    email: string,
    password: string
}