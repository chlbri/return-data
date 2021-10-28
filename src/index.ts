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
}
