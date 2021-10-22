"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.statusSchema = exports.timeoutErrorStatusSchema = exports.successfullStatusSchema = exports.serverErrorStatusSchema = exports.redirectStatusSchema = exports.permissionStatusSchema = exports.informationStatusSchema = exports.clientErrorStatusSchema = void 0;
const zod_1 = require("zod");
const client_1 = __importDefault(require("./client"));
exports.clientErrorStatusSchema = client_1.default;
const information_1 = __importDefault(require("./information"));
exports.informationStatusSchema = information_1.default;
const permission_1 = __importDefault(require("./permission"));
exports.permissionStatusSchema = permission_1.default;
const redirect_1 = __importDefault(require("./redirect"));
exports.redirectStatusSchema = redirect_1.default;
const server_1 = __importDefault(require("./server"));
exports.serverErrorStatusSchema = server_1.default;
const successfull_1 = __importDefault(require("./successfull"));
exports.successfullStatusSchema = successfull_1.default;
const timeout_1 = __importDefault(require("./timeout"));
exports.timeoutErrorStatusSchema = timeout_1.default;
exports.statusSchema = (0, zod_1.union)([
    ...client_1.default.options,
    ...information_1.default.options,
    ...permission_1.default.options,
    ...redirect_1.default.options,
    ...server_1.default.options,
    ...successfull_1.default.options,
    ...timeout_1.default.options,
]);
