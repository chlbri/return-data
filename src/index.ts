import {
  isClientError,
  isInformation,
  isPermission,
  isRedirect,
  isServer,
  isSuccess,
  isTimeout
} from './functions';
import type {
  ClientErrorFunction,
  InformationFunction,
  PermissionErrorFunction,
  RDMap,
  RDMaybeMap,
  RDSuccessMap,
  RedirectFunction,
  ServerFunction,
  Status,
  SuccessFunction,
  TimeoutFunction,
  _ReturnData
} from './types';

export * from './constants';
export * from './functions';
export * from './schemas';
export * from './types';

export const error = () => {
  throw new Error();
};

export default class ReturnData<T, S extends Status> {
  constructor(private data: _ReturnData<T, S>) {}

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

    return client(data.status, data.message);
  }

  successMap<R>({
    information,
    client,
    permission,
    redirect,
    server,
    success,
    timeout,
  }: RDSuccessMap<T, R>): R {
    const data = this.data;

    if (isInformation(data)) {
      if (!information) return error();
      return information(data.status, data.payload, data.message);
    }

    if (isPermission(data)) {
      if (!permission) return error();
      return permission(data.status, data.payload, data.notPermitteds);
    }

    if (isRedirect(data)) {
      if (!redirect) return error();
      return redirect(data.status, data.payload, data.message);
    }

    if (isServer(data)) {
      if (!server) return error();
      return server(data.status, data.message);
    }

    if (isSuccess(data)) {
      return success(data.status, data.payload);
    }

    if (isTimeout(data)) {
      if (!timeout) return error();
      return timeout(data.status);
    }

    if (!client) return error();
    return client(data.status, data.message);
  }

  maybeMap<R>(cases: RDMaybeMap<T, R>): R {
    const data = this.data;

    if (isInformation(data)) {
      const information =
        ((cases as any).information as InformationFunction<T, R>) ??
        cases.else;
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

    if (isPermission(data)) {
      const permission =
        ((cases as any).permission as PermissionErrorFunction<T, R>) ??
        cases.else;
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

    if (isRedirect(data)) {
      const redirect =
        ((cases as any).redirect as RedirectFunction<T, R>) ?? cases.else;
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

    if (isServer(data)) {
      const server =
        ((cases as any).server as ServerFunction<R>) ?? cases.else;
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

    if (isSuccess(data)) {
      const success =
        ((cases as any).success as SuccessFunction<T, R>) ?? cases.else;
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

    if (isTimeout(data)) {
      const timeout =
        ((cases as any).timeout as TimeoutFunction<R>) ?? cases.else;
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

    const client =
      ((cases as any).client as ClientErrorFunction<R>) ?? cases.else;
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
