import { User } from "../../models/User";

export interface IUserService{

    registerUser(user:User):Promise<User>;
    
}