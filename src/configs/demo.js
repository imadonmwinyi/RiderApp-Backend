import dotenv from 'dotenv'
dotenv.config()
const env = process.env.NODE_ENV
export default {
    host: 'demo',
    port: 5000,
    postgres: {
        client: 'pg',
        connection: {
            host: process.env.HOST_DATABASE,
            port: process.env.PORT,
            database: process.env.DATABASE_NAME,
            user: process.env.USER,
            password: process.env.PASSWORD,
            ssl: { rejectUnauthorized: false }
            
        },
        migrations: {
            tableName: 'Users'
        }
    }
}