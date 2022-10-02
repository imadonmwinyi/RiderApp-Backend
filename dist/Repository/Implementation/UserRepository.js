"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const PGRepository_1 = require("../PGRepository");
const brandi_1 = require("brandi");
const token_1 = require("../../token");
class UserRepository extends PGRepository_1.PGRepository {
    /**
     *
     */
    constructor(pool) {
        super({
            pool,
            table: 'users',
            mapping: {
                userId: 'userId',
                email: 'email',
                password: 'password',
                isActive: 'isActive',
                createdAt: 'created_at',
                lastLogin: 'last_login'
            },
        });
    }
}
exports.UserRepository = UserRepository;
(0, brandi_1.injected)(UserRepository, token_1.TOKENS.connPool);
//# sourceMappingURL=UserRepository.js.map