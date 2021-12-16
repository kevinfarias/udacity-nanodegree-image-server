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
const imageController_1 = __importDefault(require("../controllers/imageController"));
const path_1 = __importDefault(require("path"));
const router = express_1.default.Router();
router.get('/:file', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filename = req.params.file;
    try {
        const ret = yield imageController_1.default.convert(filename);
        if (ret) {
            res.sendFile(path_1.default.resolve(ret));
        }
        else {
            res.status(500).send('Erro desconhecido!');
        }
    }
    catch (err) {
        res.status(500).send(err.message);
    }
}));
exports.default = router;
