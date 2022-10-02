import 'dotenv/config'
import 'reflect-metadata'
import sourceMapSupport from 'source-map-support';
sourceMapSupport.install();

import { App } from './App'

import './controllers/user'
// import { connection } from './db/connection.js'


// connection()

export function bootstrap(){
  const app = new App()
  app.setup()
}

bootstrap()
// app.get("/",async (req, res) => {
//   const user = await client.query('SELECT * FROM Users')
//   res.send(user.rows)
// })


