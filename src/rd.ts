import { DeepPartial } from 'core';
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
  PRD,
  RD,
  RDChainAsync,
  RDChainSync,
  RDMap,
  RDMaybeMap,
  RDSuccessMap,
  RedirectFunction,
  ServerFunction,
  Status,
  SuccessFunction,
  TimeoutFunction,
  _ReturnData,
} from './types';

export const error = () => {
  throw new Error();
};

type FPRD<T = any> = (status: Status, payload?: DeepPartial<T>) => PRD<T>;

export default class ReturnData<T, S extends Status> {
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
  }: RDMap<T, R>): R {
    const data = this.data;

    // #region Checkers

    if (isInformation(data)) {
      return information(data.status, data.payload, data.message);
    }

    if (isPermission(data)) {
      return permission(data.status, data.payload, data.notPermitteds);
    }

    if (isRedirect(data)) {
      return redirect(data.status, data.payload, data.message);
    }

    if (isServer(data)) {
      return server(data.status, data.message);
    }

    if (isSuccess(data)) {
      return success(data.status, data.payload);
    }

    if (isTimeout(data)) {
      return timeout(data.status);
    }

    // #endregion

    return client(data.status, data.message);
  }

  successMap<R>(cases: RDSuccessMap<T, R>): R {
    // #region Cases

    const information = cases.information ?? error;
    const permission = cases.permission ?? error;
    const redirect = cases.redirect ?? error;
    const server = cases.server ?? error;
    const success = cases.success;
    const timeout = cases.timeout ?? error;
    const client = cases.client ?? error;

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

  maybeMap<R>(cases: RDMaybeMap<T, R>): R {
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

  // #endregion

  // #region Chain

  private _chainSync({
    information,
    permission,
    redirect,
    success,
  }: RDChainSync<T>): RD<T> {
    return this.map({
      success: (...args) => {
        return success(...args);
      },
      information: (status, payload, message) => {
        const out = information(status, payload, message);
        return out.successMap({
          success() {
            return new ReturnData({ status, payload, message });
          },
          information(status, _, message) {
            return new ReturnData({ status, payload, message });
          },
          redirect(status, _, message) {
            return new ReturnData({ status, payload, message });
          },
          permission(status, _, notPermitteds) {
            return new ReturnData({ status, payload, notPermitteds });
          },
          client(_, message) {
            return new ReturnData({ status, payload, message });
          },
          timeout() {
            return new ReturnData({ status, payload, message });
          },
          server(_, message) {
            return new ReturnData({ status, payload, message });
          },
        });
      },
      redirect: (status, payload, message) => {
        const out = redirect(status, payload, message);
        return out.successMap({
          success() {
            return new ReturnData({ status, payload, message });
          },
          information(_, __, message) {
            return new ReturnData({ status, payload, message });
          },
          redirect(status, _, message) {
            return new ReturnData({ status, payload, message });
          },
          permission(status, _, notPermitteds) {
            return new ReturnData({ status, payload, notPermitteds });
          },
          client(_, message) {
            return new ReturnData({ status, payload, message });
          },
          timeout() {
            return new ReturnData({ status, payload, message });
          },
          server(_, message) {
            return new ReturnData({ status, payload, message });
          },
        });
      },
      permission: (status, payload, notPermitteds) => {
        const out = permission(status, payload, notPermitteds);
        return out.maybeMap({
          success() {
            return new ReturnData({ status, payload, notPermitteds });
          },
          else() {
            return new ReturnData({ status, payload, notPermitteds });
          },
        });
      },
      client: () => this as ReturnData<T, any>,
      timeout: () => this as ReturnData<T, any>,
      server: () => this as ReturnData<T, any>,
    });
  }

  chainSync(args: RDChainSync<T> | RD<T>) {
    if (args instanceof ReturnData) {
      return this._chainSync({
        information: () => args,
        permission: () => args,
        redirect: () => args,
        success: () => args,
      });
    }

    return this._chainSync(args);
  }

  private _chainAsync({
    information,
    permission,
    redirect,
    success,
  }: RDChainAsync<T>): PRD<T> {
    Promise.resolve(information);
    return this.map({
      success: (...args) => success(...args),
      information: async (status, payload, message) => {
        const out = await information(status, payload, message);
        return out.successMap({
          success() {
            return new ReturnData({ status, payload, message });
          },
          information(status, _, message) {
            return new ReturnData({ status, payload, message });
          },
          redirect(status, _, message) {
            return new ReturnData({ status, payload, message });
          },
          permission(status, _, notPermitteds) {
            return new ReturnData({ status, payload, notPermitteds });
          },
          client(_, message) {
            return new ReturnData({ status, payload, message });
          },
          timeout() {
            return new ReturnData({ status, payload, message });
          },
          server(_, message) {
            return new ReturnData({ status, payload, message });
          },
        });
      },
      redirect: async (status, payload, message) => {
        const out = await redirect(status, payload, message);
        return out.map({
          success() {
            return new ReturnData({ status, payload, message });
          },
          information(_, __, message) {
            return new ReturnData({ status, payload, message });
          },
          redirect(status, _, message) {
            return new ReturnData({ status, payload, message });
          },
          permission(status, _, notPermitteds) {
            return new ReturnData({ status, payload, notPermitteds });
          },
          client(_, message) {
            return new ReturnData({ status, payload, message });
          },
          timeout() {
            return new ReturnData({ status, payload, message });
          },
          server(_, message) {
            return new ReturnData({ status, payload, message });
          },
        });
      },
      permission: async (status, payload, notPermitteds) => {
        const out = await permission(status, payload, notPermitteds);
        return out.maybeMap({
          success() {
            return new ReturnData({ status, payload, notPermitteds });
          },
          else() {
            return new ReturnData({ status, payload, notPermitteds });
          },
        });
      },
      client: async () => this as RD<T, any>,
      timeout: async () => this as RD<T, any>,
      server: async () => this as RD<T, any>,
    });
  }

  chainAsync(args: RDChainAsync<T> | FPRD<T>) {
    if (args instanceof Function) {
      return this._chainAsync({
        information: args,
        permission: args,
        redirect: args,
        success: args,
      });
    }

    return this._chainAsync(args);
  }

  // #endregion

  // #region Static

  static chain(previous: RD, next: FPRD | RDChainAsync): PRD {
    return previous.chainAsync(next);
  }

  // #endregion
}
