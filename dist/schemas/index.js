"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
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
__exportStar(require("./client"), exports);
__exportStar(require("./information"), exports);
__exportStar(require("./permission"), exports);
__exportStar(require("./redirect"), exports);
__exportStar(require("./server"), exports);
__exportStar(require("./successfull"), exports);
__exportStar(require("./timeout"), exports);
exports.statusSchema = (0, zod_1.union)([
    client_1.default,
    information_1.default,
    permission_1.default,
    redirect_1.default,
    server_1.default,
    successfull_1.default,
    timeout_1.default,
]);
