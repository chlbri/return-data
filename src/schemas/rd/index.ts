import { z } from 'zod';
import { clientErrorSchema } from './client';
import { informationSchema } from './information';
import { permissionSchema } from './permission';
import { redirectSchema } from './redirect';
import { serverErrorSchema } from './server';
import { successSchema } from './success';
import { timeoutErrorSchema } from './timeout';

export {
  clientErrorSchema,
  informationSchema,
  permissionSchema,
  redirectSchema,
  serverErrorSchema,
  successSchema,
  timeoutErrorSchema,
};

export const rdSchema = <T extends z.ZodTypeAny>(payload: T) => {
  // #region Building
  const information = informationSchema(payload);
  const permisson = permissionSchema(payload);
  const redirect = redirectSchema(payload);
  const success = successSchema(payload);
  // #endregion

  return z.union([
    clientErrorSchema,
    information,
    permisson,
    redirect,
    serverErrorSchema,
    success,
    timeoutErrorSchema,
  ]);
};

const tt = successSchema(z.number());
