"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bootstrap = void 0;
require("dotenv/config");
require("reflect-metadata");
const source_map_support_1 = __importDefault(require("source-map-support"));
source_map_support_1.default.install();
const inversify_1 = require("inversify");
const express_1 = __importDefault(require("express"));
const inversify_express_utils_1 = require("inversify-express-utils");
// import app from './App.js'
// import { connection } from './db/connection.js'
// connection()
function bootstrap() {
    const container = new inversify_1.Container();
    const server = new inversify_express_utils_1.InversifyExpressServer(container);
    server.setConfig((app) => {
        app.use(express_1.default.json());
    });
    const app = server.build();
    const PORT = 4000 || 5000;
    app.listen(PORT, () => console.log(`app listening on port ${PORT}`));
}
exports.bootstrap = bootstrap;
bootstrap();
// app.get("/",async (req, res) => {
//   const user = await client.query('SELECT * FROM Users')
//   res.send(user.rows)
// })
//# sourceMappingURL=index.js.map