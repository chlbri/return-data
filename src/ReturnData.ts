import { TypeOf } from 'zod';
import {
  isInformationD,
  isPermissionD,
  isRedirectD,
  isServerD,
  isSuccessD,
  isTimeoutD,
} from './functions';
import {
  clientErrorStatusSchema,
  informationStatusSchema,
  permissionStatusSchema,
  redirectStatusSchema,
  serverErrorStatusSchema,
  successfullStatusSchema,
  timeoutErrorStatusSchema,
} from './schemas/status';
import type { ForEach, Status, _ReturnData } from './types';

export class ReturnData<T, S extends TypeOf<Status>> {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor(private data: _ReturnData<T, S>) {}

  get isClienError(): boolean {
    return clientErrorStatusSchema.safeParse(this.data.status).success;
  }

  get isInformation(): boolean {
    return informationStatusSchema.safeParse(this.data.status).success;
  }
  get isPermission(): boolean {
    return permissionStatusSchema.safeParse(this.data.status).success;
  }
  get isRedirect(): boolean {
    return redirectStatusSchema.safeParse(this.data.status).success;
  }
  get isServerError(): boolean {
    return serverErrorStatusSchema.safeParse(this.data.status).success;
  }
  get isSuccess(): boolean {
    return successfullStatusSchema.safeParse(this.data.status).success;
  }
  get isTimeoutError(): boolean {
    return timeoutErrorStatusSchema.safeParse(this.data.status).success;
  }

  foreach<R>(cases: ForEach<T, R>) {
    const data = this.data;

    if (isInformationD(data)) {
      return cases.information(data.status, data.payload, data.message);
    }
    if (isPermissionD(data)) {
      return cases.permission(
        data.status,
        data.payload,
        data.notPermitteds,
      );
    }
    if (isRedirectD(data)) {
      return cases.redirect(data.status, data.payload, data.message);
    }
    if (isServerD(data)) {
      return cases.server(data.status, data.message);
    }
    if (isSuccessD(data)) {
      return cases.success(data.status, data.payload);
    }
    if (isTimeoutD(data)) {
      return cases.timeout(data.status);
    }
    return cases.client(data.status, data.message);
  }
}
