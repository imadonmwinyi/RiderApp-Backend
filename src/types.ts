// import { token } from 'brandi';
// import { UserRepository } from './Repository/Implementation/UserRepository'
// import { Pool } from 'pg';

export const TYPES = {
   userRepository: Symbol.for("UserRepository"),
   IUserService:Symbol.for("IUserService"),
   pool: Symbol.for("Pool")
}; 