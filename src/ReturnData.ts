import {
  isClientError,
  isInformation,
  isPermission,
  isRedirect,
  isServer,
  isSuccess,
  isTimeout,
} from '#functions/checkers';
import { createMap } from '#functions/map';
import { mapParsers } from '#functions/parser';

import type {
  FunctionRD,
  FunctionRDwithReturn,
  MapChain,
  MapRenew,
  MaybeMap,
  RD,
  RdMap,
  ReturnDataObject,
  Status,
  SuccessMap,
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
    return (
      this.isSuccess ||
      this.isInformation ||
      this.isRedirect ||
      this.isPermission
    );
  }

  compare = (to: ReturnData) => {
    const _to = to as any;
    return this.map({
      client: (status, messages) => {
        const checkStatus = status === _to.status;
        const checkMessages = messages === _to.data.messages;
        return checkStatus && checkMessages;
      },
      information: (status, payload, messages) => {
        const checkStatus = status === _to.status;
        const checkPayload = payload === _to.data.payload;
        const checkMessages = messages === _to.data.messages;
        return checkStatus && checkPayload && checkMessages;
      },
      permission: (status, payload, notPermitteds, messages) => {
        const checkStatus = status === _to.status;
        const checkPayload = payload === _to.data.payload;
        const checkPermitteds = notPermitteds === _to.data.notPermitteds;
        const checkMessages = messages === _to.data.messages;
        console.log('permission', checkPermitteds);
        console.log('payload', checkPayload);
        console.log('messages', checkMessages);
        console.log('status', checkStatus);
        return (
          checkStatus && checkPayload && checkPermitteds && checkMessages
        );
      },
      redirect: (status, payload, messages) => {
        const checkStatus = status === _to.status;
        const checkPayload = payload === _to.data.payload;
        const checkMessages = messages === _to.data.messages;
        return checkStatus && checkPayload && checkMessages;
      },
      server: (status, messages) => {
        const checkStatus = status === _to.status;
        const checkMessages = messages === _to.data.messages;
        return checkStatus && checkMessages;
      },
      success: (status, payload) => {
        const checkStatus = status === _to.status;
        const checkPayload = payload === _to.data.payload;
        return checkStatus && checkPayload;
      },
      timeout: status => status === to.status,
    });
  };
  // #endregion

  get type() {
    const mapTypes = createMap(status => {
      for (const key in mapParsers) {
        if (Object.prototype.hasOwnProperty.call(mapParsers, key)) {
          const _key = key as keyof typeof mapParsers;
          const element = mapParsers[_key];
          const check = element(status);
          if (check) return _key;
        }
      }
      throw 'not reachable';
    });
    return this.map(mapTypes);
  }

  get status() {
    return this.data.status;
  }

  // #region Mappers
  map = <R>(cases: RdMap<T, R>) => {
    return ReturnData.map(this.data, cases);
  };

  maybeMap = <R>(cases: MaybeMap<T, R>) => {
    // #region Cases
    const client = cases.client ?? cases.else;
    const information = cases.information ?? cases.else;
    const permission = cases.permission ?? cases.else;
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
  };

  successMap<R>(cases: SuccessMap<T, R>) {
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
  private _chain({
    information,
    permission,
    redirect,
    success,
  }: MapChain<T>): RD<T> {
    return this.map({
      success,
      information,
      redirect,
      permission,
      client: () => this,
      timeout: () => this,
      server: () => this,
    });
  }

  chain = (cases: MapChain<T> | RD<T> | FunctionRD<T>): RD<T> => {
    if (cases instanceof ReturnData) {
      return this._chain({
        information: () => cases,
        permission: () => cases,
        redirect: () => cases,
        success: () => cases,
      });
    }
    if (cases instanceof Function) {
      return this._chain({
        information: cases,
        permission: cases,
        redirect: cases,
        success: cases,
      });
    }

    return this._chain(cases);
  };
  // #endregion

  // #region Renews
  private _renew<R>({
    information,
    permission,
    redirect,
    success,
  }: MapRenew<T, R>): RD<R> {
    return this.map({
      information,
      permission,
      redirect,
      success,
      client: () => new ReturnData<R>({ status: 400 }),
      timeout: () => new ReturnData<R>({ status: 900 }),
      server: () => new ReturnData<R>({ status: 500 }),
    });
  }

  renew<R>(
    cases: MapRenew<T, R> | RD<R> | FunctionRDwithReturn<T, R>,
  ): RD<R> {
    if (cases instanceof ReturnData) {
      return this._renew({
        information: () => cases,
        permission: () => cases,
        redirect: () => cases,
        success: () => cases,
      });
    }
    if (cases instanceof Function) {
      return this._renew({
        information: cases,
        permission: cases,
        redirect: cases,
        success: cases,
      });
    }

    return this._renew(cases);
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
    }: RdMap<T, R>,
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

  static defaultClient = <R>() => new ReturnData<R>({ status: 400 });
  static defaultServer = <R>() => new ReturnData<R>({ status: 500 });
  static defaultTimeout = <R>() => new ReturnData<R>({ status: 900 });
  // #endregion
}
