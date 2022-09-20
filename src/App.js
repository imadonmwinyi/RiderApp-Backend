import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import route from './routes/user.js'


const app = express();
app.use(bodyParser.json());
app.use(cors())

app.use('/',route);




export default app