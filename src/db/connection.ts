import dotenv from 'dotenv'
dotenv.config()
import { Pool,PoolConfig } from 'pg';





export let pool: Pool

export const connectPostgres = async () => {
    const credentials:PoolConfig = {
        host: process.env.HOST_DATABASE,
        port: Number(process.env.PORT),
        database: process.env.DATABASE_NAME,
        user: process.env.USER,
        password: process.env.PASSWORD,
        ssl: { rejectUnauthorized: false },
    }
  const newPool = new Pool(credentials)

  await newPool.connect()

  pool = newPool
  return newPool
}