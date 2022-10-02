"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const token_1 = require("../../src/token");
const brandi_1 = require("brandi");
class UserService {
    /**
     *
     */
    constructor(userRepo) {
        //super();
    }
    registerUser(user) {
        throw new Error("Method not implemented.");
    }
}
exports.UserService = UserService;
(0, brandi_1.injected)(UserService, token_1.TOKENS.userRepo);
//# sourceMappingURL=UserService.js.map