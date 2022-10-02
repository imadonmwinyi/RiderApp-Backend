import { IUserService } from "./Contracts/IUserService";
import { User } from '../models/User'
import { UserRepository } from "../Repository/Implementation/UserRepository";
import { injectable, inject } from "inversify";
import bcrypt from "bcryptjs";

@injectable()
export class UserService implements IUserService{
   
    /**
     *
     */
    
    public constructor(@inject("UserRepository") private userRepo:UserRepository) {
        //super();
        
    }
    async registerUser(user: User): Promise<User> {
        let userCreated : User = null;
        const salt = await bcrypt.genSalt(10)
        const encript_password = await bcrypt.hash(user.password, salt)

        const userToCreate : User = {
            email:user.email,
            password:encript_password,
        }

        try {
            userCreated = await this.userRepo.create(userToCreate)
        } catch (error) {
            
        }

        return userCreated;
    
    }
}

