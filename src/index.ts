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
      const _information = (cases as any).information;
      if (!_information) return error();
      const information = _information as InformationFunction<T, R>;
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
      const _permission = (cases as any).permission;
      if (!_permission) return error();
      const permission = _permission as PermissionErrorFunction<T, R>;
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
      const _redirect = (cases as any).redirect;
      if (!_redirect) return error();
      const redirect = _redirect as RedirectFunction<T, R>;
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
      const _server = (cases as any).server;
      if (!_server) return error();
      const server = _server as ServerFunction<R>;
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
      const _success = (cases as any).success;
      if (!_success) return error();
      const success = _success as SuccessFunction<T, R>;
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
      const _timeout = (cases as any).timeout;
      if (!_timeout) return error();
      const timeout = _timeout as TimeoutFunction<R>;
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

    const _client = (cases as any).client;
    if (!_client) return error();
    const client = _client as ClientErrorFunction<R>;
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

const _schemas = new ReturnData({ status: 900 });
_schemas.maybeMap({ information: () => 1, else: () => 2 });
