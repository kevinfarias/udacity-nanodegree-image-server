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
const index_1 = __importDefault(require("../index"));
const supertest_1 = __importDefault(require("supertest"));
const imageController_1 = __importDefault(require("../controllers/imageController"));
const fs_1 = __importStar(require("fs"));
describe('Test app main routes', () => {
    it('GET /convert/fjord.jpg = HAVE TO CONVERT THE IMAGE SUCCESSFULLY', () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(index_1.default).get('/convert/fjord.jpg/300/300').expect(200);
    }));
    it('GET /convert/fjord1.jpg = HAVE NOT TO CONVERT THE IMAGE', () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(index_1.default).get('/convert/fjord1.jpg/300/300').expect(500);
    }));
});
describe('Unit testing', () => __awaiter(void 0, void 0, void 0, function* () {
    const dirName = `${__dirname}/../../images/converted`;
    const pureName = 'fjord.jpg';
    const fileName = 'fjord_300x300.jpg';
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        if (fs_1.default.existsSync(`${dirName}/${fileName}`)) {
            yield fs_1.promises.unlink(`${dirName}/${fileName}`);
        }
    }));
    it('Test creating image', () => __awaiter(void 0, void 0, void 0, function* () {
        yield imageController_1.default.convert(pureName, 300, 300);
        const exists = fs_1.default.existsSync(`${dirName}/${fileName}`);
        expect(exists).toBeTruthy();
    }));
}));
