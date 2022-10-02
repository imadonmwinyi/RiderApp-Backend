"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.container = void 0;
const brandi_1 = require("brandi");
const token_1 = require("./token");
const UserRepository_1 = require("./Repository/Implementation/UserRepository");
exports.container = new brandi_1.Container();
exports.container
    .bind(token_1.TOKENS.userRepo)
    .toInstance(UserRepository_1.UserRepository)
    .inTransientScope();
//# sourceMappingURL=container.js.map