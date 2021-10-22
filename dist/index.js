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
Object.defineProperty(exports, "__esModule", { value: true });
const functions_1 = require("./functions");
__exportStar(require("./constants"), exports);
__exportStar(require("./functions"), exports);
__exportStar(require("./schemas"), exports);
__exportStar(require("./types"), exports);
class ReturnData {
    constructor(data) {
        this.data = data;
    }
    get isClienError() {
        return (0, functions_1.isClientError)(this.data);
    }
    get isInformation() {
        return (0, functions_1.isInformation)(this.data);
    }
    get isPermission() {
        return (0, functions_1.isPermission)(this.data);
    }
    get isRedirect() {
        return (0, functions_1.isRedirect)(this.data);
    }
    get isServerError() {
        return (0, functions_1.isServer)(this.data);
    }
    get isSuccess() {
        return (0, functions_1.isSuccess)(this.data);
    }
    get isTimeoutError() {
        return (0, functions_1.isTimeout)(this.data);
    }
    get hasData() {
        return (this.isInformation ||
            this.isPermission ||
            this.isRedirect ||
            this.isSuccess);
    }
    get status() {
        return this.data.status;
    }
    forEach(cases) {
        const data = this.data;
        if ((0, functions_1.isInformation)(data)) {
            return cases.information(data.status, data.payload, data.message);
        }
        if ((0, functions_1.isPermission)(data)) {
            return cases.permission(data.status, data.payload, data.notPermitteds);
        }
        if ((0, functions_1.isRedirect)(data)) {
            return cases.redirect(data.status, data.payload, data.message);
        }
        if ((0, functions_1.isServer)(data)) {
            return cases.server(data.status, data.message);
        }
        if ((0, functions_1.isSuccess)(data)) {
            return cases.success(data.status, data.payload);
        }
        if ((0, functions_1.isTimeout)(data)) {
            return cases.timeout(data.status);
        }
        return cases.client(data.status, data.message);
    }
}
exports.default = ReturnData;
