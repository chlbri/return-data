"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReturnData = void 0;
const functions_1 = require("./functions");
class ReturnData {
    constructor(data) {
        this.data = data;
    }
    get isClienError() {
        return (0, functions_1.isClientErrorD)(this.data);
    }
    get isInformation() {
        return (0, functions_1.isInformationD)(this.data);
    }
    get isPermission() {
        return (0, functions_1.isPermissionD)(this.data);
    }
    get isRedirect() {
        return (0, functions_1.isRedirectD)(this.data);
    }
    get isServerError() {
        return (0, functions_1.isServerD)(this.data);
    }
    get isSuccess() {
        return (0, functions_1.isSuccessD)(this.data);
    }
    get isTimeoutError() {
        return (0, functions_1.isTimeoutD)(this.data);
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
        if ((0, functions_1.isInformationD)(data)) {
            return cases.information(data.status, data.payload, data.message);
        }
        if ((0, functions_1.isPermissionD)(data)) {
            return cases.permission(data.status, data.payload, data.notPermitteds);
        }
        if ((0, functions_1.isRedirectD)(data)) {
            return cases.redirect(data.status, data.payload, data.message);
        }
        if ((0, functions_1.isServerD)(data)) {
            return cases.server(data.status, data.message);
        }
        if ((0, functions_1.isSuccessD)(data)) {
            return cases.success(data.status, data.payload);
        }
        if ((0, functions_1.isTimeoutD)(data)) {
            return cases.timeout(data.status);
        }
        return cases.client(data.status, data.message);
    }
}
exports.ReturnData = ReturnData;
