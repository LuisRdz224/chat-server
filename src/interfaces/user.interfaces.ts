import { Request } from 'express';
import { Model, Optional } from 'sequelize';

interface UserAttributes {
    user_id: string,
    username: string,
    email: string,
    password: string,
    create_time: string
}
interface UserCreationAttributes extends Optional<UserAttributes, 'user_id'> { }
export interface UserInstance extends Model<UserAttributes, UserCreationAttributes>, UserAttributes { }

export interface UserMapper {
    user_id: string,
    username: string,
    email: string,
    password?: string,
    create_time: string
}

export interface LoginUserDto {
    email: string,
    password: string
}

export interface RegisterUserDto {
    username: string,
    email: string,
    password: string
}

export interface RegisterChatMembersDto {
    member: string,
    chat_id: string
}

export interface CustomRequest extends Request {
    user?: {
        user_id: string,
        username: string,
        email: string
    }
}