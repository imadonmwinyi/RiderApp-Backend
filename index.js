import dotenv from 'dotenv'
dotenv.config()
import app from './src/App.js'
import { connection } from './db/connection.js'


connection()

  
app.get("/",async (req, res) => {
  const user = await client.query('SELECT * FROM Users')
  res.send(user.rows)
})


const PORT = 4000 || 5000
app.listen(PORT, ()=> console.log(`app listening on port ${PORT}`))