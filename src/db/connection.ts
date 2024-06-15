import { Sequelize } from 'sequelize';
import { envs } from '../config';

const db = new Sequelize(envs.DB_NAME, envs.DB_USER, envs.DB_PASSWORD, {
    host: envs.DB_URL,
    dialect: 'mysql',
});

export const checkConnection = async (): Promise<void> => {
    try {
        await db.authenticate();
        console.log('Database online');
    } catch (error) {
        console.log('MySQL connection error');
        throw error;
    }
}

export default db;