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
        const data = this.data;
        if ((0, functions_1.isInformation)(data)) {
            const _information = cases.information;
            if (!_information)
                return (0, exports.error)();
            const information = _information;
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
            const _permission = cases.permission;
            if (!_permission)
                return (0, exports.error)();
            const permission = _permission;
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
            const _redirect = cases.redirect;
            if (!_redirect)
                return (0, exports.error)();
            const redirect = _redirect;
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
            const _server = cases.server;
            if (!_server)
                return (0, exports.error)();
            const server = _server;
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
            const _success = cases.success;
            if (!_success)
                return (0, exports.error)();
            const success = _success;
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
            const _timeout = cases.timeout;
            if (!_timeout)
                return (0, exports.error)();
            const timeout = _timeout;
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
        const _client = cases.client;
        if (!_client)
            return (0, exports.error)();
        const client = _client;
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
const _schemas = new ReturnData({ status: 900 });
_schemas.maybeMap({ information: () => 1, else: () => 2 });
