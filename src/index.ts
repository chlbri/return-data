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
import type { ForEach, Status, _ReturnData } from './types';

export * from './constants';
export * from './functions';
export * from './schemas';
export * from './types';

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

  forEach<R>(cases: ForEach<T, R>): R {
    const data = this.data;

    if (isInformation(data)) {
      return cases.information(data.status, data.payload, data.message);
    }

    if (isPermission(data)) {
      return cases.permission(
        data.status,
        data.payload,
        data.notPermitteds,
      );
    }

    if (isRedirect(data)) {
      return cases.redirect(data.status, data.payload, data.message);
    }

    if (isServer(data)) {
      return cases.server(data.status, data.message);
    }

    if (isSuccess(data)) {
      return cases.success(data.status, data.payload);
    }

    if (isTimeout(data)) {
      return cases.timeout(data.status);
    }

    return cases.client(data.status, data.message);
  }
}
