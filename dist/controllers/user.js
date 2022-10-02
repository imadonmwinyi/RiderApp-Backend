"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterUser = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const connection_js_1 = require("../db/connection.js");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const genToken_js_1 = require("../utils/genToken.js");
const RegisterUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const query = {
        text: 'SELECT * FROM Users WHERE email = $1',
        values: [email],
    };
    const user = yield connection_js_1.client.query(query);
    if (user) {
        return res.status(500).send({ error: 'User already exist' });
    }
    try {
        const salt = yield bcryptjs_1.default.genSalt(10);
        const encript_password = yield bcryptjs_1.default.hash(password, salt);
        connection_js_1.client.query('INSERT INTO Users(email, password) VALUES($1, $2) RETURNING *', [email, encript_password])
            .then(result => res.send(Object.assign(Object.assign({}, result.rows[0]), { token: (0, genToken_js_1.generateToken)(result.rows[0].userid, jsonwebtoken_1.default), id: result.rows[0].userid })))
            .catch(e => console.error(e.stack));
    }
    catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});
exports.RegisterUser = RegisterUser;
//# sourceMappingURL=user.js.map