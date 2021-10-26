import type { TypeOf } from 'zod';
import {
  isClientError,
  isInformation,
  isPermission,
  isRedirect,
  isServer,
  isSuccess,
  isTimeout,
} from './functions';
import type { RDMap, RDMaybeMap, Status, _ReturnData } from './types';

export * from './constants';
export * from './functions';
export * from './schemas';
export * from './types';

export const error = () => {
  throw new Error();
};

export default class ReturnData<T, S extends TypeOf<Status>> {
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

  get status(): TypeOf<Status> {
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

  maybeMap<R>({
    information,
    client,
    permission,
    redirect,
    server,
    success,
    timeout,
  }: RDMaybeMap<T, R>): R {
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
}
