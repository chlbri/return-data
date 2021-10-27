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
    successMap({ information, client, permission, redirect, server, success, timeout, }) {
        const data = this.data;
        if ((0, functions_1.isInformation)(data)) {
            if (!information)
                return (0, exports.error)();
            return information(data.status, data.payload, data.message);
        }
        if ((0, functions_1.isPermission)(data)) {
            if (!permission)
                return (0, exports.error)();
            return permission(data.status, data.payload, data.notPermitteds);
        }
        if ((0, functions_1.isRedirect)(data)) {
            if (!redirect)
                return (0, exports.error)();
            return redirect(data.status, data.payload, data.message);
        }
        if ((0, functions_1.isServer)(data)) {
            if (!server)
                return (0, exports.error)();
            return server(data.status, data.message);
        }
        if ((0, functions_1.isSuccess)(data)) {
            return success(data.status, data.payload);
        }
        if ((0, functions_1.isTimeout)(data)) {
            if (!timeout)
                return (0, exports.error)();
            return timeout(data.status);
        }
        if (!client)
            return (0, exports.error)();
        return client(data.status, data.message);
    }
    maybeMap(cases) {
        var _a, _b, _c, _d, _e, _f, _g;
        const data = this.data;
        if ((0, functions_1.isInformation)(data)) {
            const information = (_a = cases.information) !== null && _a !== void 0 ? _a : cases.else;
            return this.map({
                information,
                client: cases.else,
                permission: cases.else,
                redirect: cases.else,
                success: cases.else,
                server: cases.else,
                timeout: cases.else,
            });
        }
        if ((0, functions_1.isPermission)(data)) {
            const permission = (_b = cases.permission) !== null && _b !== void 0 ? _b : cases.else;
            return this.map({
                information: cases.else,
                client: cases.else,
                permission,
                redirect: cases.else,
                success: cases.else,
                server: cases.else,
                timeout: cases.else,
            });
        }
        if ((0, functions_1.isRedirect)(data)) {
            const redirect = (_c = cases.redirect) !== null && _c !== void 0 ? _c : cases.else;
            return this.map({
                information: cases.else,
                client: cases.else,
                permission: cases.else,
                redirect,
                success: cases.else,
                server: cases.else,
                timeout: cases.else,
            });
        }
        if ((0, functions_1.isServer)(data)) {
            const server = (_d = cases.server) !== null && _d !== void 0 ? _d : cases.else;
            return this.map({
                information: cases.else,
                client: cases.else,
                permission: cases.else,
                redirect: cases.else,
                success: cases.else,
                server,
                timeout: cases.else,
            });
        }
        if ((0, functions_1.isSuccess)(data)) {
            const success = (_e = cases.success) !== null && _e !== void 0 ? _e : cases.else;
            return this.map({
                information: cases.else,
                client: cases.else,
                permission: cases.else,
                redirect: cases.else,
                server: cases.else,
                success,
                timeout: cases.else,
            });
        }
        if ((0, functions_1.isTimeout)(data)) {
            const timeout = (_f = cases.timeout) !== null && _f !== void 0 ? _f : cases.else;
            return this.map({
                information: cases.else,
                client: cases.else,
                permission: cases.else,
                redirect: cases.else,
                success: cases.else,
                timeout,
                server: cases.else,
            });
        }
        const client = (_g = cases.client) !== null && _g !== void 0 ? _g : cases.else;
        return this.map({
            information: cases.else,
            client,
            permission: cases.else,
            redirect: cases.else,
            success: cases.else,
            timeout: cases.else,
            server: cases.else,
        });
    }
}
exports.default = ReturnData;
