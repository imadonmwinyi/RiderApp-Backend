"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const env = process.env.NODE_ENV;
exports.default = {
    host: 'demo',
    port: 5000,
    postgres: {
        client: 'pg',
        connection: {
            host: process.env.HOST_DATABASE,
            port: process.env.PORT,
            database: process.env.DATABASE_NAME,
            user: process.env.USER,
            password: process.env.PASSWORD,
            ssl: { rejectUnauthorized: false }
        },
        migrations: {
            tableName: 'Users'
        }
    }
};
//# sourceMappingURL=demo.js.map