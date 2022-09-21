import dotenv from 'dotenv'
dotenv.config()
import pkg from 'pg';
const { Client} = pkg;

export const client = new Client({
    host: process.env.HOST_DATABASE,
    port: process.env.PORT,
    database: process.env.DATABASE_NAME,
    user: process.env.USER,
    password: process.env.PASSWORD,
    ssl: { rejectUnauthorized: false },
})
export const connection = ()=>{
    client
    .connect()
    .then(() => console.log('connected'))
    .catch(err => console.error('connection error', err.stack))
} 