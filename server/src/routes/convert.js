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
const express_1 = __importDefault(require("express"));
const fs_1 = require("fs");
const path_1 = __importDefault(require("path"));
const sharp_1 = __importDefault(require("sharp"));
const router = express_1.default.Router();
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const dirName = path_1.default.dirname(__dirname + '../../images/converted');
        console.log('dirname', dirName);
        if (!(yield fs_1.promises.stat(dirName)) || !(yield fs_1.promises.stat(dirName)).isDirectory()) {
            yield fs_1.promises.mkdir(dirName);
        }
        const dir = yield fs_1.promises.readdir(dirName);
        dir.map((item) => __awaiter(void 0, void 0, void 0, function* () {
            yield (0, sharp_1.default)(item)
                .png()
                .toFile(item.replace('/images/full/', '/images/converted/'), (err) => {
                if (err) {
                    res.sendStatus(500);
                    return;
                }
            });
        }));
    }
    catch (err) {
        console.error('Error occured while reading directory!', err);
    }
}));
exports.default = router;
