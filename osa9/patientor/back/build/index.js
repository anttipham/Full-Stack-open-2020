"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const PORT = 3001;
const app = express_1.default();
app.use(cors_1.default());
app.get('/api/ping', (_req, res) => {
    res.send('pong');
});
app.listen(PORT, () => {
    console.log('はあちゃまっちゃまー');
    console.log('Server running on port', PORT);
});
