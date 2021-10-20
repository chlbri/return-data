import {
  object,
  TypeOf,
  z,
  ZodObject,
  ZodRawShape,
  ZodTypeAny,
} from 'zod';
import { isPrimitive } from '../../functions';
import type { Success, ZodPrimitive } from '../../types';
import { successfullStatusSchema } from '../status';

export const successfullDataSchema = <
  T extends ZodRawShape | ZodPrimitive,
>(
  shape: T,
): Success<T> => {
  const payload = (
    isPrimitive(shape) ? shape : object(shape)
  ) as T extends ZodRawShape
    ? ZodObject<T>
    : T extends ZodTypeAny
    ? T
    : never;

  return object({
    status: successfullStatusSchema,
    payload,
  });
};

const examples = successfullDataSchema(z.undefined());

type T = TypeOf<typeof examples>;

/*prettier-ignore*/
export const SUCCESS_DATAS = {
  200: { status: 200 } as T,
  201: { status: 201 } as T,
  202: { status: 202 } as T,
  203: { status: 203 } as T,
  204: { status: 204 } as T,
  205: { status: 205 } as T,
  206: { status: 206 } as T,
  207: { status: 207 } as T,
  208: { status: 208 } as T,
  209: { status: 209 } as T,
  210: { status: 210 } as T,
  211: { status: 211 } as T,
  212: { status: 212 } as T,
  213: { status: 213 } as T,
  214: { status: 214 } as T,
  215: { status: 215 } as T,
  216: { status: 216 } as T,
  217: { status: 217 } as T,
  218: { status: 218 } as T,
  219: { status: 219 } as T,
  220: { status: 220 } as T,
  221: { status: 221 } as T,
  222: { status: 222 } as T,
  223: { status: 223 } as T,
  224: { status: 224 } as T,
  225: { status: 225 } as T,
  226: { status: 226 } as T,
  227: { status: 227 } as T,
  228: { status: 228 } as T,
  229: { status: 229 } as T,
  230: { status: 230 } as T,
  231: { status: 231 } as T,
  232: { status: 232 } as T,
  233: { status: 233 } as T,
  234: { status: 234 } as T,
  235: { status: 235 } as T,
  236: { status: 236 } as T,
  237: { status: 237 } as T,
  238: { status: 238 } as T,
  239: { status: 239 } as T,
  240: { status: 240 } as T,
  241: { status: 241 } as T,
  242: { status: 242 } as T,
  243: { status: 243 } as T,
  244: { status: 244 } as T,
  245: { status: 245 } as T,
  246: { status: 246 } as T,
  247: { status: 247 } as T,
  248: { status: 248 } as T,
  249: { status: 249 } as T,
  250: { status: 250 } as T,
  251: { status: 251 } as T,
  252: { status: 252 } as T,
  253: { status: 253 } as T,
  254: { status: 254 } as T,
  255: { status: 255 } as T,
  256: { status: 256 } as T,
  257: { status: 257 } as T,
  258: { status: 258 } as T,
  259: { status: 259 } as T,
  260: { status: 260 } as T,
  261: { status: 261 } as T,
  262: { status: 262 } as T,
  263: { status: 263 } as T,
  264: { status: 264 } as T,
  265: { status: 265 } as T,
  266: { status: 266 } as T,
  267: { status: 267 } as T,
  268: { status: 268 } as T,
  269: { status: 269 } as T,
  270: { status: 270 } as T,
  271: { status: 271 } as T,
  272: { status: 272 } as T,
  273: { status: 273 } as T,
  274: { status: 274 } as T,
  275: { status: 275 } as T,
  276: { status: 276 } as T,
  277: { status: 277 } as T,
  278: { status: 278 } as T,
  279: { status: 279 } as T,
  280: { status: 280 } as T,
  281: { status: 281 } as T,
  282: { status: 282 } as T,
  283: { status: 283 } as T,
  284: { status: 284 } as T,
  285: { status: 285 } as T,
  286: { status: 286 } as T,
  287: { status: 287 } as T,
  288: { status: 288 } as T,
  289: { status: 289 } as T,
  290: { status: 290 } as T,
  291: { status: 291 } as T,
  292: { status: 292 } as T,
  293: { status: 293 } as T,
  294: { status: 294 } as T,
  295: { status: 295 } as T,
  296: { status: 296 } as T,
  297: { status: 297 } as T,
  298: { status: 298 } as T,
  299: { status: 299 } as T,
} as const;
