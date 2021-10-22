"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.statusSchema = exports.timeoutErrorStatusSchema = exports.successfullStatusSchema = exports.serverErrorStatusSchema = exports.redirectStatusSchema = exports.permissionStatusSchema = exports.informationStatusSchema = exports.clientErrorStatusSchema = void 0;
const zod_1 = require("zod");
const client_1 = require("./client");
Object.defineProperty(exports, "clientErrorStatusSchema", { enumerable: true, get: function () { return client_1.clientErrorStatusSchema; } });
const information_1 = require("./information");
Object.defineProperty(exports, "informationStatusSchema", { enumerable: true, get: function () { return information_1.informationStatusSchema; } });
const permission_1 = require("./permission");
Object.defineProperty(exports, "permissionStatusSchema", { enumerable: true, get: function () { return permission_1.permissionStatusSchema; } });
const redirect_1 = require("./redirect");
Object.defineProperty(exports, "redirectStatusSchema", { enumerable: true, get: function () { return redirect_1.redirectStatusSchema; } });
const server_1 = require("./server");
Object.defineProperty(exports, "serverErrorStatusSchema", { enumerable: true, get: function () { return server_1.serverErrorStatusSchema; } });
const successfull_1 = require("./successfull");
Object.defineProperty(exports, "successfullStatusSchema", { enumerable: true, get: function () { return successfull_1.successfullStatusSchema; } });
const timeout_1 = require("./timeout");
Object.defineProperty(exports, "timeoutErrorStatusSchema", { enumerable: true, get: function () { return timeout_1.timeoutErrorStatusSchema; } });
exports.statusSchema = (0, zod_1.union)([
    ...client_1.clientErrorStatusSchema.options,
    ...information_1.informationStatusSchema.options,
    ...permission_1.permissionStatusSchema.options,
    ...redirect_1.redirectStatusSchema.options,
    ...server_1.serverErrorStatusSchema.options,
    ...successfull_1.successfullStatusSchema.options,
    ...timeout_1.timeoutErrorStatusSchema.options,
]);
