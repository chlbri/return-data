import {
  isClientError,
  isInformation,
  isPermission,
  isRedirect,
  isServer,
  isSuccess,
  isTimeout,
} from '#functions/checkers';
import { getType } from '#functions/type';

import type {
  FunctionPromiseRD,
  FunctionPromiseRDwithReturn,
  FunctionRD,
  FunctionRDwithReturn,
  PromiseRD,
  RD,
  ReturnDataChainAsync,
  ReturnDataChainSync,
  ReturnDataMap,
  ReturnDataMaybeMap,
  ReturnDataObject,
  ReturnDataRenewAsync,
  ReturnDataRenewSync,
  ReturnDataSuccessMap,
  Status,
} from '#types';

export const defaultError = () => {
  throw new Error();
};

export class ReturnData<T = any, S extends Status = Status> {
  constructor(private data: ReturnDataObject<T, S>) {}

  // #region Checkers
  get isClienError() {
    return ReturnData.isClientError(this.data);
  }

  get isInformation() {
    return ReturnData.isInformation(this.data);
  }

  get isPermission() {
    return ReturnData.isPermission(this.data);
  }

  get isRedirect() {
    return ReturnData.isRedirect(this.data);
  }

  get isServerError() {
    return ReturnData.isServer(this.data);
  }

  get isSuccess() {
    return ReturnData.isSuccess(this.data);
  }

  get isTimeoutError() {
    return ReturnData.isTimeout(this.data);
  }

  get canData() {
    return ReturnData.canData(this.data);
  }
  // #endregion

  get type() {
    return ReturnData.getType(this.data);
  }

  get status() {
    return this.data.status;
  }

  // #region Mappers
  map = <R>(cases: ReturnDataMap<T, R>) => {
    return ReturnData.map(this.data, cases);
  };

  maybeMap = <R>(cases: ReturnDataMaybeMap<T, R>) => {
    return ReturnData.maybeMap(this.data, cases);
  };

  successMap<R>(cases: ReturnDataSuccessMap<T, R>) {
    return ReturnData.successMap(this.data, cases);
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

  chainSync = (
    cases: ReturnDataChainSync<T> | RD<T> | FunctionRD<T>,
  ): RD<T> => {
    if (cases instanceof ReturnData) {
      return this._chainSync({
        information: () => cases,
        permission: () => cases,
        redirect: () => cases,
        success: () => cases,
      });
    }
    if (cases instanceof Function) {
      return this._chainSync({
        information: cases,
        permission: cases,
        redirect: cases,
        success: cases,
      });
    }

    return this._chainSync(cases);
  };

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

  chainAsync(
    args: ReturnDataChainAsync<T> | FunctionPromiseRD<T> | PromiseRD<T>,
  ): PromiseRD<T> {
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

  renewSync<R>(
    args: ReturnDataRenewSync<T, R> | RD<R> | FunctionRDwithReturn<T, R>,
  ): RD<R> {
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

  renewAsync<R>(
    args:
      | ReturnDataRenewAsync<T, R>
      | PromiseRD<R>
      | FunctionPromiseRDwithReturn<T, R>,
  ): PromiseRD<R> {
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
  static isClientError = isClientError;
  static isInformation = isInformation;
  static isPermission = isPermission;
  static isRedirect = isRedirect;
  static isServer = isServer;
  static isSuccess = isSuccess;
  static isTimeout = isTimeout;
  static getType = getType;

  static canData = <T = any>(data: T) => {
    return (
      this.isSuccess(data) ||
      this.isInformation(data) ||
      this.isRedirect(data) ||
      this.isPermission(data)
    );
  };

  static map = <T, R, S extends Status>(
    data: ReturnDataObject<T, S>,
    {
      information,
      client,
      permission,
      redirect,
      server,
      success,
      timeout,
    }: ReturnDataMap<T, R>,
  ) => {
    if (isInformation(data)) {
      return information(data.status, data.payload, data.messages);
    }

    if (isPermission(data)) {
      return permission(
        data.status,
        data.payload,
        data.notPermitteds,
        data.messages,
      );
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

    return client(data.status, data.messages);
  };

  static maybeMap = <T, R, S extends Status>(
    data: ReturnDataObject<T, S>,
    cases: ReturnDataMaybeMap<T, R>,
  ): R => {
    // #region Cases
    const client = cases.client ?? cases.else;
    const information = cases.information ?? cases.else;
    const permission = cases.permission ?? cases.else;
    const redirect = cases.redirect ?? cases.else;
    const server = cases.server ?? cases.else;
    const success = cases.success ?? cases.else;
    const timeout = cases.timeout ?? cases.else;
    // #endregion

    return this.map(data, {
      client,
      information,
      permission,
      redirect,
      server,
      success,
      timeout,
    });
  };

  static successMap<T, R, S extends Status>(
    data: ReturnDataObject<T, S>,
    cases: ReturnDataSuccessMap<T, R>,
  ) {
    // #region Cases
    const information = cases.information ?? defaultError;
    const permission = cases.permission ?? defaultError;
    const redirect = cases.redirect ?? defaultError;
    const server = cases.server ?? defaultError;
    const success = cases.success;
    const timeout = cases.timeout ?? defaultError;
    const client = cases.client ?? defaultError;
    // #endregion

    return this.map(data, {
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
}
