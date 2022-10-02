import bcrypt from "bcryptjs";
// import {client} from '../db/connection.js'
import jwt from "jsonwebtoken"
import express from "express"
import {generateToken} from '../utils/genToken.js'
import { controller, httpPost, request, response} from 'inversify-express-utils'
import { inject } from "inversify";
import { UserService } from "../services/UserService.js";
import { IUserService } from "../services/Contracts/IUserService.js";
import { User } from "../models/User.js";
 
@controller('/v')
export class UserController{
    constructor(@inject('UserService') private userService: IUserService){

    }
    @httpPost('/')
    private async RegisterUser(@request() req: UserRequest, @response() res: express.Response){
        //const b = req.body
        const userdata : User = {
            email: req.user.email,
            password: req.user.password
        }
        const user = await this.userService.registerUser(userdata);
        res.send(user)
    }
        // const {email, password} = req.body;
        // const query = {
        //     text: 'SELECT * FROM Users WHERE email = $1',
        //     values: [email],
        // }
        // const user = await client.query(query)
        // if(user){
        //     return res.status(500).send({error: 'User already exist'})
        // }
        // try {
        //     const salt = await bcrypt.genSalt(10)
        //     const encript_password = await bcrypt.hash(password, salt)
        //     client.query('INSERT INTO Users(email, password) VALUES($1, $2) RETURNING *', [email, encript_password ])
        //     .then(result => res.send({...result.rows[0], token: generateToken(result.rows[0].userid, jwt), id: result.rows[0].userid}))
        //     .catch(e => console.error(e.stack))
            
        // } catch (error) {
        //     res.status(500).json({
        //         message: error.message
        //     })
        // }
    
    }

    interface UserRequest extends Request{
        user:User;
    }
   