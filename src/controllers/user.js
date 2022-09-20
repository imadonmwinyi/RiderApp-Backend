import bcrypt from "bcryptjs";
import {client} from '../../db/connection.js'
import jwt from "jsonwebtoken"
import {generateToken} from '../utils/genToken.js'

export const RegisterUser = async(req, res)=>{
    const {email, password} = req.body;
    const query = {
        text: 'SELECT * FROM Users WHERE email = $1',
        values: [email],
    }
    const user = await client.query(query)
    if(user){
        return res.status(500).send({error: 'User already exist'})
    }
    try {
        const salt = await bcrypt.genSalt(10)
        const encript_password = await bcrypt.hash(password, salt)
        client.query('INSERT INTO Users(email, password) VALUES($1, $2) RETURNING *', [email, encript_password ])
        .then(result => res.send({...result.rows[0], token: generateToken(result.rows[0].userid, jwt), id: result.rows[0].userid}))
        .catch(e => console.error(e.stack))
        
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}