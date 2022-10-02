"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_js_1 = require("../controllers/user.js");
const router = express_1.default.Router();
router.post('/', user_js_1.RegisterUser);
router.get('/', (req, res) => {
});
exports.default = router;
//# sourceMappingURL=user.js.map