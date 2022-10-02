import { Container } from 'inversify';

import { UserRepository } from './Repository/Implementation/UserRepository';
import { UserService } from './services/UserService'
import { TYPES } from './types';
import { IUserService } from './services/Contracts/IUserService';

export const container = new Container();
container.bind(TYPES.userRepository).to(UserRepository)
container.bind<IUserService>(TYPES.IUserService).to(UserService)

