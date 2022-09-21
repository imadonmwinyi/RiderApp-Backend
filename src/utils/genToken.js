import dotenv from 'dotenv'
dotenv.config()

export const generateToken = (id, jwt)=>{
    return jwt.sign({id}, process.env.JWT_SECRET,{expiresIn:'30d'})
}