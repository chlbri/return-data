import {
  object,
  string,
  TypeOf,
  ZodOptional,
  ZodRawShape,
  ZodTypeAny
} from 'zod';
import { isPrimitive } from '../../functions';
import type {
  OptionalDeepPartial, ZodPrimitive
} from '../../types';
import { redirectStatusSchema } from '../status';


export const redirectDataSchema = <T extends ZodRawShape | ZodPrimitive>(
  shape: T,
) => {
  const payload = (
    isPrimitive(shape) ? shape.optional() : object(shape).deepPartial()
  ) as T extends ZodRawShape
    ? OptionalDeepPartial<T>
    : T extends ZodTypeAny
    ? ZodOptional<T>
    : never;

  return object({
    status: redirectStatusSchema,
    payload,
    message: string().optional(),
  });
};

const examples = redirectDataSchema({ id: string(), password: string() });

type T = TypeOf<typeof examples>;

/*prettier-ignore*/
export const REDIRECT_DATAS = {
  300: { status: 300 } as T,
  301: { status: 301 } as T,
  302: { status: 302 } as T,
  303: { status: 303 } as T,
  304: { status: 304 } as T,
  305: { status: 305 } as T,
  306: { status: 306 } as T,
  307: { status: 307 } as T,
  308: { status: 308 } as T,
  309: { status: 309 } as T,
  310: { status: 310 } as T,
  311: { status: 311 } as T,
  312: { status: 312 } as T,
  313: { status: 313 } as T,
  314: { status: 314 } as T,
  315: { status: 315 } as T,
  316: { status: 316 } as T,
  317: { status: 317 } as T,
  318: { status: 318 } as T,
  319: { status: 319 } as T,
  320: { status: 320 } as T,
  321: { status: 321 } as T,
  322: { status: 322 } as T,
  323: { status: 323 } as T,
  324: { status: 324 } as T,
  325: { status: 325 } as T,
  326: { status: 326 } as T,
  327: { status: 327 } as T,
  328: { status: 328 } as T,
  329: { status: 329 } as T,
  330: { status: 330 } as T,
  331: { status: 331 } as T,
  332: { status: 332 } as T,
  333: { status: 333 } as T,
  334: { status: 334 } as T,
  335: { status: 335 } as T,
  336: { status: 336 } as T,
  337: { status: 337 } as T,
  338: { status: 338 } as T,
  339: { status: 339 } as T,
  340: { status: 340 } as T,
  341: { status: 341 } as T,
  342: { status: 342 } as T,
  343: { status: 343 } as T,
  344: { status: 344 } as T,
  345: { status: 345 } as T,
  346: { status: 346 } as T,
  347: { status: 347 } as T,
  348: { status: 348 } as T,
  349: { status: 349 } as T,
  350: { status: 350 } as T,
  351: { status: 351 } as T,
  352: { status: 352 } as T,
  353: { status: 353 } as T,
  354: { status: 354 } as T,
  355: { status: 355 } as T,
  356: { status: 356 } as T,
  357: { status: 357 } as T,
  358: { status: 358 } as T,
  359: { status: 359 } as T,
  360: { status: 360 } as T,
  361: { status: 361 } as T,
  362: { status: 362 } as T,
  363: { status: 363 } as T,
  364: { status: 364 } as T,
  365: { status: 365 } as T,
  366: { status: 366 } as T,
  367: { status: 367 } as T,
  368: { status: 368 } as T,
  369: { status: 369 } as T,
  370: { status: 370 } as T,
  371: { status: 371 } as T,
  372: { status: 372 } as T,
  373: { status: 373 } as T,
  374: { status: 374 } as T,
  375: { status: 375 } as T,
  376: { status: 376 } as T,
  377: { status: 377 } as T,
  378: { status: 378 } as T,
  379: { status: 379 } as T,
  380: { status: 380 } as T,
  381: { status: 381 } as T,
  382: { status: 382 } as T,
  383: { status: 383 } as T,
  384: { status: 384 } as T,
  385: { status: 385 } as T,
  386: { status: 386 } as T,
  387: { status: 387 } as T,
  388: { status: 388 } as T,
  389: { status: 389 } as T,
  390: { status: 390 } as T,
  391: { status: 391 } as T,
  392: { status: 392 } as T,
  393: { status: 393 } as T,
  394: { status: 394 } as T,
  395: { status: 395 } as T,
  396: { status: 396 } as T,
  397: { status: 397 } as T,
  398: { status: 398 } as T,
  399: { status: 399 } as T,
} as const;
