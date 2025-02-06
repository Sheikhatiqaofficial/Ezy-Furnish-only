"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.client = void 0;
// sanityClient.ts
const client_1 = require("@sanity/client");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.client = (0, client_1.createClient)({
    projectId:'069qbsbt', // Replace with your project ID
    dataset: 'production', // Or your dataset name
    apiVersion: '2024-01-04', // Today's date or latest API version
    useCdn: true, // Disable CDN for real-time updates
    token: 'sk1xGR9bIlAdBYx3HSz56PqUcmHjMTY8PmHH0a1WFn2bNW6W3FPGEFy3msWzljBxyWZg55Odkc1xDyF36x0XQQVlcMnRU95FxkoCQiCbqkzIAZ7Xgy55mBfkj1cNF0hm7e4NTk1yKFmpNL3RWpxh4AGX3hb7afQJHCUBEaKCw653x3lP9jtY',
});