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
        id: string,
        username: string,
        email: string
    }
}