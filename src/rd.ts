import {
  isClientError,
  isInformation,
  isPermission,
  isRedirect,
  isServer,
  isSuccess,
  isTimeout,
} from './functions';
import type {
  ClientErrorFunction,
  InformationFunction,
  PermissionErrorFunction,
  PromiseRD,
  RD,
  RedirectFunction,
  ReturnDataChainAsync,
  ReturnDataChainSync,
  ReturnDataMap,
  ReturnDataRenewAsync,
  ReturnDataRenewSync,
  ReturnDataSuccessMap,
  ReturnDatatMaybeMap,
  ServerFunction,
  Status,
  SuccessFunction,
  TimeoutFunction,
  _ReturnData,
} from './types';

export const defaultError = () => {
  throw new Error();
};

type FunctionPromiseRD<T = any> = (status: Status, payload?: T) => PromiseRD<T>;
type FunctionPromiseRD2<T = any, R = any> = (status: Status, payload?: T) => PromiseRD<R>;
type FunctionRD<T = any> = (status: Status, payload?: T) => RD<T>;
type FunctionRD2<T = any, R = any> = (status: Status, payload?: T) => RD<R>;

export class ReturnData<T = any, S extends Status = Status> {
  constructor(private data: _ReturnData<T, S>) {}

  // #region Checkers

  get isClienError(): boolean {
    return isClientError(this.data);
  }

  get isInformation(): boolean {
    return isInformation(this.data);
  }

  get isPermission(): boolean {
    return isPermission(this.data);
  }

  get isRedirect(): boolean {
    return isRedirect(this.data);
  }

  get isServerError(): boolean {
    return isServer(this.data);
  }

  get isSuccess(): boolean {
    return isSuccess(this.data);
  }

  get isTimeoutError(): boolean {
    return isTimeout(this.data);
  }
  // #endregion

  get hasData(): boolean {
    return (
      this.isInformation ||
      this.isPermission ||
      this.isRedirect ||
      this.isSuccess
    );
  }

  get status(): Status {
    return this.data.status;
  }

  // #region Mappers

  map<R>({
    information,
    client,
    permission,
    redirect,
    server,
    success,
    timeout,
  }: ReturnDataMap<T, R>): R {
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

  maybeMap<R>(cases: ReturnDatatMaybeMap<T, R>): R {
    // #region Cases

    const client =
      ((cases as any).client as ClientErrorFunction<R>) ?? cases.else;

    const information =
      ((cases as any).information as InformationFunction<T, R>) ??
      cases.else;

    const permission =
      ((cases as any).permission as PermissionErrorFunction<T, R>) ??
      cases.else;

    const redirect =
      ((cases as any).redirect as RedirectFunction<T, R>) ?? cases.else;

    const server =
      ((cases as any).server as ServerFunction<R>) ?? cases.else;

    const success =
      ((cases as any).success as SuccessFunction<T, R>) ?? cases.else;

    const timeout =
      ((cases as any).timeout as TimeoutFunction<R>) ?? cases.else;

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

  successMap<R>(cases: ReturnDataSuccessMap<T, R>): R {
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

  private _chainSync({
    information,
    permission,
    redirect,
    success,
  }: ReturnDataChainSync<T>): RD<T> {
    return this.map({
      success: (...args) => {
        return success(...args);
      },
      information: (status, payload, messages) => {
        const out = information(status, payload, messages);
        return out.map({
          success() {
            return new ReturnData<T>({ status, payload, messages });
          },
          information(status, _, messages) {
            return new ReturnData<T>({ status, payload, messages });
          },
          redirect(status, _, messages) {
            return new ReturnData<T>({ status, payload, messages });
          },
          permission(status, _, notPermitteds, messages) {
            return new ReturnData<T>({
              status,
              payload,
              notPermitteds,
              messages,
            });
          },
          client(_, messages) {
            return new ReturnData<T>({ status, payload, messages });
          },
          timeout() {
            return new ReturnData<T>({ status, payload, messages });
          },
          server(_, messages) {
            return new ReturnData<T>({ status, payload, messages });
          },
        });
      },
      redirect: (status, payload, messages) => {
        const out = redirect(status, payload, messages);
        return out.map({
          success() {
            return new ReturnData<T>({ status, payload, messages });
          },
          information(_, __, messages) {
            return new ReturnData<T>({ status, payload, messages });
          },
          redirect(status, _, messages) {
            return new ReturnData<T>({ status, payload, messages });
          },
          permission(status, _, notPermitteds, messages) {
            return new ReturnData<T>({
              status,
              payload,
              notPermitteds,
              messages,
            });
          },
          client(_, messages) {
            return new ReturnData<T>({ status, payload, messages });
          },
          timeout() {
            return new ReturnData<T>({ status, payload, messages });
          },
          server(_, messages) {
            return new ReturnData<T>({ status, payload, messages });
          },
        });
      },
      permission: (status, payload, notPermitteds, messages) => {
        const out = permission(status, payload, notPermitteds, messages);
        return out.maybeMap({
          success() {
            return new ReturnData<T>({
              status,
              payload,
              notPermitteds,
              messages,
            });
          },
          else() {
            return new ReturnData<T>({
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

  chainSync(args: ReturnDataChainSync<T> | RD<T> | FunctionRD<T>): RD<T> {
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

  private _chainAsync({
    information,
    permission,
    redirect,
    success,
  }: ReturnDataChainAsync<T>): PromiseRD<T> {
    return this.map({
      success: (...args) => success(...args),
      information: async (status, payload, messages) => {
        const out = await information(status, payload, messages);
        return out.successMap({
          success() {
            return new ReturnData<T>({ status, payload, messages });
          },
          information(status, _, messages) {
            return new ReturnData<T>({ status, payload, messages });
          },
          redirect(status, _, messages) {
            return new ReturnData<T>({ status, payload, messages });
          },
          permission(status, _, notPermitteds, messages) {
            return new ReturnData<T>({
              status,
              payload,
              notPermitteds,
              messages,
            });
          },
          client(_, messages) {
            return new ReturnData<T>({ status, payload, messages });
          },
          timeout() {
            return new ReturnData<T>({ status, payload, messages });
          },
          server(_, messages) {
            return new ReturnData<T>({ status, payload, messages });
          },
        });
      },
      redirect: async (status, payload, messages) => {
        const out = await redirect(status, payload, messages);
        return out.map({
          success() {
            return new ReturnData<T>({ status, payload, messages });
          },
          information(_, __, messages) {
            return new ReturnData<T>({ status, payload, messages });
          },
          redirect(status, _, messages) {
            return new ReturnData<T>({ status, payload, messages });
          },
          permission(status, _, notPermitteds, messages) {
            return new ReturnData<T>({
              status,
              payload,
              notPermitteds,
              messages,
            });
          },
          client(_, messages) {
            return new ReturnData<T>({ status, payload, messages });
          },
          timeout() {
            return new ReturnData<T>({ status, payload, messages });
          },
          server(_, messages) {
            return new ReturnData<T>({ status, payload, messages });
          },
        });
      },
      permission: async (status, payload, notPermitteds, messages) => {
        const out = await permission(
          status,
          payload,
          notPermitteds,
          messages,
        );
        return out.maybeMap({
          success() {
            return new ReturnData<T>({
              status,
              payload,
              notPermitteds,
              messages,
            });
          },
          else() {
            return new ReturnData<T>({
              status,
              payload,
              notPermitteds,
              messages,
            });
          },
        });
      },
      client: async () => this as RD<T, any>,
      timeout: async () => this as RD<T, any>,
      server: async () => this as RD<T, any>,
    });
  }

  chainAsync(args: ReturnDataChainAsync<T> | FunctionPromiseRD<T> | PromiseRD<T>): PromiseRD<T> {
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

  private _renewSync<R>({
    information,
    permission,
    redirect,
    success,
  }: ReturnDataRenewSync<T, R>): RD<R> {
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
      client: () => new ReturnData<R, Status>({ status: 400 }),
      timeout: () => new ReturnData<R, Status>({ status: 900 }),
      server: () => new ReturnData<R, Status>({ status: 500 }),
    });
  }

  renewSync<R>(args: ReturnDataRenewSync<T, R> | RD<R> | FunctionRD2<T, R>): RD<R> {
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

  private _renewAsync<R>({
    information,
    permission,
    redirect,
    success,
  }: ReturnDataRenewAsync<T, R>): PromiseRD<R> {
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
      client: async () => new ReturnData<R, Status>({ status: 400 }),
      timeout: async () => new ReturnData<R, Status>({ status: 900 }),
      server: async () => new ReturnData<R, Status>({ status: 500 }),
    });
  }

  renewAsync<R>(args: ReturnDataRenewAsync<T, R> | PromiseRD<R> | FunctionPromiseRD2<T, R>): PromiseRD<R> {
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

  static chain(previous: RD, next: FunctionPromiseRD | ReturnDataChainAsync): PromiseRD {
    return previous.chainAsync(next);
  }

  // #endregion
}
