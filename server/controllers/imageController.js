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
const fs_1 = __importStar(require("fs"));
const sharp_1 = __importDefault(require("sharp"));
class imageController {
    static convert(image, width, height) {
        return __awaiter(this, void 0, void 0, function* () {
            const dirName = `${__dirname}/../../images/converted`;
            const dirFull = `${__dirname}/../../images/full`;
            const fileName = `${dirFull}/${image.replace('.jpg', '')}.jpg`;
            /* create output dir if not exists */
            if (!fs_1.default.existsSync(dirName)) {
                yield fs_1.promises.mkdir(dirName);
            }
            /* detect if file exists */
            if (!fs_1.default.existsSync(fileName)) {
                throw new Error(`Image ${fileName} does not exists!`);
            }
            const newFile = `${dirName}/${image.replace('.jpg', '')}_${width}x${height}.jpg`;
            if (!fs_1.default.existsSync(newFile)) {
                yield (0, sharp_1.default)(fileName)
                    .resize({ width, height })
                    .toFile(newFile)
                    .catch((e) => {
                    console.log('error', e);
                });
            }
            return newFile;
        });
    }
}
exports.default = imageController;
