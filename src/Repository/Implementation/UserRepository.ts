import { User } from "../../models/User";
import { Pool } from "pg";
import { PGRepository } from "../PGRepository";


export class UserRepository extends PGRepository<User>{

    /**
     *
     */
    constructor(pool:Pool) {
        super({
            pool,
            table: 'users',
            mapping: {
              userId: 'userId',
              email: 'email',
              password:'password',
              isActive:'isActive',
              createdAt: 'created_at',
              lastLogin:'last_login'
            },
          })
        
    }
    
}

