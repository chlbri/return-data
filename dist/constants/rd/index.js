"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TIMEOUT_ERRORS = exports.SUCCESS = exports.SERVER_ERRORS = exports.REDIRECTS = exports.PERMISSION_DENIEDS = exports.INFORMATIONS = exports.CLIENT_ERRORS = exports.RETURN_DATAS = void 0;
const client_1 = __importDefault(require("./client"));
exports.CLIENT_ERRORS = client_1.default;
const information_1 = __importDefault(require("./information"));
exports.INFORMATIONS = information_1.default;
const permission_1 = __importDefault(require("./permission"));
exports.PERMISSION_DENIEDS = permission_1.default;
const redirect_1 = __importDefault(require("./redirect"));
exports.REDIRECTS = redirect_1.default;
const server_1 = __importDefault(require("./server"));
exports.SERVER_ERRORS = server_1.default;
const success_1 = __importDefault(require("./success"));
exports.SUCCESS = success_1.default;
const timeout_1 = __importDefault(require("./timeout"));
exports.TIMEOUT_ERRORS = timeout_1.default;
exports.RETURN_DATAS = {
    ...client_1.default,
    ...information_1.default,
    ...permission_1.default,
    ...redirect_1.default,
    ...server_1.default,
    ...success_1.default,
    ...timeout_1.default,
};
