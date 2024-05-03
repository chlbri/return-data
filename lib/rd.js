import { isClientError, isInformation, isPermission, isRedirect, isServer, isSuccess, isTimeout } from './functions.js';

const defaultError = () => {
    throw new Error();
};
class ReturnData {
    data;
    constructor(data) {
        this.data = data;
    }
    // #region Checkers
    get isClienError() {
        return isClientError(this.data);
    }
    get isInformation() {
        return isInformation(this.data);
    }
    get isPermission() {
        return isPermission(this.data);
    }
    get isRedirect() {
        return isRedirect(this.data);
    }
    get isServerError() {
        return isServer(this.data);
    }
    get isSuccess() {
        return isSuccess(this.data);
    }
    get isTimeoutError() {
        return isTimeout(this.data);
    }
    // #endregion
    get hasData() {
        return (this.isInformation ||
            this.isPermission ||
            this.isRedirect ||
            this.isSuccess);
    }
    get status() {
        return this.data.status;
    }
    // #region Mappers
    map({ information, client, permission, redirect, server, success, timeout, }) {
        const data = this.data;
        // #region Checkers
        if (isInformation(data)) {
            data.payload;
            return information(data.status, data.payload, data.messages);
        }
        if (isPermission(data)) {
            return permission(data.status, data.payload, data.notPermitteds);
        }
        if (isRedirect(data)) {
            return redirect(data.status, data.payload, data.messages);
        }
        if (isServer(data)) {
            return server(data.status, data.messages);
        }
        if (isSuccess(data)) {
            return success(data.status, data.payload);
        }
        if (isTimeout(data)) {
            return timeout(data.status);
        }
        // #endregion
        return client(data.status, data.messages);
    }
    maybeMap(cases) {
        // #region Cases
        const client = cases.client ?? cases.else;
        const information = cases.information ??
            cases.else;
        const permission = cases.permission ??
            cases.else;
        const redirect = cases.redirect ?? cases.else;
        const server = cases.server ?? cases.else;
        const success = cases.success ?? cases.else;
        const timeout = cases.timeout ?? cases.else;
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
    successMap(cases) {
        // #region Cases
        const information = cases.information ?? defaultError;
        const permission = cases.permission ?? defaultError;
        const redirect = cases.redirect ?? defaultError;
        const server = cases.server ?? defaultError;
        const success = cases.success;
        const timeout = cases.timeout ?? defaultError;
        const client = cases.client ?? defaultError;
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
    // #endregion
    // #region Chain
    _chainSync({ information, permission, redirect, success, }) {
        return this.map({
            success: (...args) => {
                return success(...args);
            },
            information: (status, payload, messages) => {
                const out = information(status, payload, messages);
                return out.map({
                    success() {
                        return new ReturnData({ status, payload, messages });
                    },
                    information(status, _, messages) {
                        return new ReturnData({ status, payload, messages });
                    },
                    redirect(status, _, messages) {
                        return new ReturnData({ status, payload, messages });
                    },
                    permission(status, _, notPermitteds, messages) {
                        return new ReturnData({
                            status,
                            payload,
                            notPermitteds,
                            messages,
                        });
                    },
                    client(_, messages) {
                        return new ReturnData({ status, payload, messages });
                    },
                    timeout() {
                        return new ReturnData({ status, payload, messages });
                    },
                    server(_, messages) {
                        return new ReturnData({ status, payload, messages });
                    },
                });
            },
            redirect: (status, payload, messages) => {
                const out = redirect(status, payload, messages);
                return out.map({
                    success() {
                        return new ReturnData({ status, payload, messages });
                    },
                    information(_, __, messages) {
                        return new ReturnData({ status, payload, messages });
                    },
                    redirect(status, _, messages) {
                        return new ReturnData({ status, payload, messages });
                    },
                    permission(status, _, notPermitteds, messages) {
                        return new ReturnData({
                            status,
                            payload,
                            notPermitteds,
                            messages,
                        });
                    },
                    client(_, messages) {
                        return new ReturnData({ status, payload, messages });
                    },
                    timeout() {
                        return new ReturnData({ status, payload, messages });
                    },
                    server(_, messages) {
                        return new ReturnData({ status, payload, messages });
                    },
                });
            },
            permission: (status, payload, notPermitteds, messages) => {
                const out = permission(status, payload, notPermitteds, messages);
                return out.maybeMap({
                    success() {
                        return new ReturnData({
                            status,
                            payload,
                            notPermitteds,
                            messages,
                        });
                    },
                    else() {
                        return new ReturnData({
                            status,
                            payload,
                            notPermitteds,
                            messages,
                        });
                    },
                });
            },
            client: () => this,
            timeout: () => this,
            server: () => this,
        });
    }
    chainSync(args) {
        if (args instanceof ReturnData) {
            return this._chainSync({
                information: () => args,
                permission: () => args,
                redirect: () => args,
                success: () => args,
            });
        }
        if (args instanceof Function) {
            return this._chainSync({
                information: args,
                permission: args,
                redirect: args,
                success: args,
            });
        }
        return this._chainSync(args);
    }
    _chainAsync({ information, permission, redirect, success, }) {
        return this.map({
            success: (...args) => success(...args),
            information: async (status, payload, messages) => {
                const out = await information(status, payload, messages);
                return out.successMap({
                    success() {
                        return new ReturnData({ status, payload, messages });
                    },
                    information(status, _, messages) {
                        return new ReturnData({ status, payload, messages });
                    },
                    redirect(status, _, messages) {
                        return new ReturnData({ status, payload, messages });
                    },
                    permission(status, _, notPermitteds, messages) {
                        return new ReturnData({
                            status,
                            payload,
                            notPermitteds,
                            messages,
                        });
                    },
                    client(_, messages) {
                        return new ReturnData({ status, payload, messages });
                    },
                    timeout() {
                        return new ReturnData({ status, payload, messages });
                    },
                    server(_, messages) {
                        return new ReturnData({ status, payload, messages });
                    },
                });
            },
            redirect: async (status, payload, messages) => {
                const out = await redirect(status, payload, messages);
                return out.map({
                    success() {
                        return new ReturnData({ status, payload, messages });
                    },
                    information(_, __, messages) {
                        return new ReturnData({ status, payload, messages });
                    },
                    redirect(status, _, messages) {
                        return new ReturnData({ status, payload, messages });
                    },
                    permission(status, _, notPermitteds, messages) {
                        return new ReturnData({
                            status,
                            payload,
                            notPermitteds,
                            messages,
                        });
                    },
                    client(_, messages) {
                        return new ReturnData({ status, payload, messages });
                    },
                    timeout() {
                        return new ReturnData({ status, payload, messages });
                    },
                    server(_, messages) {
                        return new ReturnData({ status, payload, messages });
                    },
                });
            },
            permission: async (status, payload, notPermitteds, messages) => {
                const out = await permission(status, payload, notPermitteds, messages);
                return out.maybeMap({
                    success() {
                        return new ReturnData({
                            status,
                            payload,
                            notPermitteds,
                            messages,
                        });
                    },
                    else() {
                        return new ReturnData({
                            status,
                            payload,
                            notPermitteds,
                            messages,
                        });
                    },
                });
            },
            client: async () => this,
            timeout: async () => this,
            server: async () => this,
        });
    }
    chainAsync(args) {
        if (args instanceof Function) {
            return this._chainAsync({
                information: args,
                permission: args,
                redirect: args,
                success: args,
            });
        }
        if (args instanceof Promise) {
            return this._chainAsync({
                information: () => args,
                permission: () => args,
                redirect: () => args,
                success: () => args,
            });
        }
        return this._chainAsync(args);
    }
    // #endregion
    // #region Renews
    _renewSync({ information, permission, redirect, success, }) {
        return this.map({
            success: (...args) => {
                return success(...args);
            },
            information: (status, payload, messages) => {
                const out = information(status, payload, messages);
                return out.maybeMap({
                    success(_, payload) {
                        return new ReturnData({ status, payload, messages });
                    },
                    else() {
                        return out;
                    },
                });
            },
            redirect: (status, payload, messages) => {
                const out = redirect(status, payload, messages);
                return out.maybeMap({
                    success(_, payload) {
                        return new ReturnData({ status, payload, messages });
                    },
                    else() {
                        return out;
                    },
                });
            },
            permission,
            client: () => new ReturnData({ status: 400 }),
            timeout: () => new ReturnData({ status: 900 }),
            server: () => new ReturnData({ status: 500 }),
        });
    }
    renewSync(args) {
        if (args instanceof ReturnData) {
            return this._renewSync({
                information: () => args,
                permission: () => args,
                redirect: () => args,
                success: () => args,
            });
        }
        if (args instanceof Function) {
            return this._renewSync({
                information: args,
                permission: args,
                redirect: args,
                success: args,
            });
        }
        return this._renewSync(args);
    }
    _renewAsync({ information, permission, redirect, success, }) {
        return this.map({
            success: (...args) => success(...args),
            information: async (status, payload, messages) => {
                const out = await information(status, payload, messages);
                return out.maybeMap({
                    success(_, payload) {
                        return new ReturnData({ status, payload, messages });
                    },
                    else() {
                        return out;
                    },
                });
            },
            redirect: async (status, payload, messages) => {
                const out = await redirect(status, payload, messages);
                return out.maybeMap({
                    success(_, payload) {
                        return new ReturnData({ status, payload, messages });
                    },
                    else() {
                        return out;
                    },
                });
            },
            permission,
            client: async () => new ReturnData({ status: 400 }),
            timeout: async () => new ReturnData({ status: 900 }),
            server: async () => new ReturnData({ status: 500 }),
        });
    }
    renewAsync(args) {
        if (args instanceof Function) {
            return this._renewAsync({
                information: args,
                permission: args,
                redirect: args,
                success: args,
            });
        }
        if (args instanceof Promise) {
            return this._renewAsync({
                information: () => args,
                permission: () => args,
                redirect: () => args,
                success: () => args,
            });
        }
        return this._renewAsync(args);
    }
    // #endregion
    // #region Static
    static chain(previous, next) {
        return previous.chainAsync(next);
    }
}

export { ReturnData, defaultError };
//# sourceMappingURL=rd.js.map
