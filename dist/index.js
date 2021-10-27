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
exports.error = void 0;
const functions_1 = require("./functions");
__exportStar(require("./constants"), exports);
__exportStar(require("./functions"), exports);
__exportStar(require("./schemas"), exports);
__exportStar(require("./types"), exports);
const error = () => {
    throw new Error();
};
exports.error = error;
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
    map({ information, client, permission, redirect, server, success, timeout, }) {
        const data = this.data;
        if ((0, functions_1.isInformation)(data)) {
            return information(data.status, data.payload, data.message);
        }
        if ((0, functions_1.isPermission)(data)) {
            return permission(data.status, data.payload, data.notPermitteds);
        }
        if ((0, functions_1.isRedirect)(data)) {
            return redirect(data.status, data.payload, data.message);
        }
        if ((0, functions_1.isServer)(data)) {
            return server(data.status, data.message);
        }
        if ((0, functions_1.isSuccess)(data)) {
            return success(data.status, data.payload);
        }
        if ((0, functions_1.isTimeout)(data)) {
            return timeout(data.status);
        }
        return client(data.status, data.message);
    }
    successMap(cases) {
        // #region Cases
        var _a, _b, _c, _d, _e, _f;
        const information = (_a = cases.information) !== null && _a !== void 0 ? _a : exports.error;
        const permission = (_b = cases.permission) !== null && _b !== void 0 ? _b : exports.error;
        const redirect = (_c = cases.redirect) !== null && _c !== void 0 ? _c : exports.error;
        const server = (_d = cases.server) !== null && _d !== void 0 ? _d : exports.error;
        const success = cases.success;
        const timeout = (_e = cases.timeout) !== null && _e !== void 0 ? _e : exports.error;
        const client = (_f = cases.client) !== null && _f !== void 0 ? _f : exports.error;
        // #endregion
        return this.map({
            client,
            information,
            permission,
            redirect,
            server,
            success,
            timeout,
        });
    }
    maybeMap(cases) {
        // #region Cases
        var _a, _b, _c, _d, _e, _f, _g;
        const client = (_a = cases.client) !== null && _a !== void 0 ? _a : cases.else;
        const information = (_b = cases.information) !== null && _b !== void 0 ? _b : cases.else;
        const permission = (_c = cases.permission) !== null && _c !== void 0 ? _c : cases.else;
        const redirect = (_d = cases.redirect) !== null && _d !== void 0 ? _d : cases.else;
        const server = (_e = cases.server) !== null && _e !== void 0 ? _e : cases.else;
        const success = (_f = cases.success) !== null && _f !== void 0 ? _f : cases.else;
        const timeout = (_g = cases.timeout) !== null && _g !== void 0 ? _g : cases.else;
        // #endregion
        return this.map({
            client,
            information,
            permission,
            redirect,
            server,
            success,
            timeout,
        });
    }
}
exports.default = ReturnData;
