"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const fs_1 = __importStar(require("fs"));
const sharp_1 = __importDefault(require("sharp"));
const router = express_1.default.Router();
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const dirName = __dirname + '/../../images/converted';
        const dirFull = __dirname + '/../../images/full';
        console.log('dirname', dirName);
        if (!fs_1.default.existsSync(dirName)) {
            yield fs_1.promises.mkdir(dirName);
        }
        const dir = yield fs_1.promises.readdir(dirFull);
        dir.map((item) => __awaiter(void 0, void 0, void 0, function* () {
            const newFile = dirName + '/' + item;
            if (!fs_1.default.existsSync(newFile)) {
                yield (0, sharp_1.default)(`${dirFull}/${item}`)
                    .resize({ width: 200 })
                    .toFile(dirName + '/' + item);
            }
        }));
        res.status(200).send('Convertido com sucesso!');
    }
    catch (err) {
        console.error('Error occured while reading directory!', err);
    }
}));
exports.default = router;
