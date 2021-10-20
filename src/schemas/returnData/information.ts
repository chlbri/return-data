import {
  object,
  string,
  TypeOf,
  ZodOptional,
  ZodRawShape,
  ZodTypeAny,
} from 'zod';
import {
  isPrimitive,
  OptionalDeepPartial,
  ZodPrimitive,
} from '../../.config';
import { informationStatusSchema } from '../status';

export const informationDataSchema = <
  T extends ZodRawShape | ZodPrimitive,
>(
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
    status: informationStatusSchema,
    payload,
    message: string(),
  });
};

const dert = informationDataSchema({ id: string(), password: string() });

type T = TypeOf<typeof dert>;

/* prettier-ignore */
export const INFORMATION_CONSTANTS = {
  100: { status: 100, message: '' } as T,
  101: { status: 101, message: '' } as T,
  102: { status: 102, message: '' } as T,
  103: { status: 103, message: '' } as T,
  104: { status: 104, message: '' } as T,
  105: { status: 105, message: '' } as T,
  106: { status: 106, message: '' } as T,
  107: { status: 107, message: '' } as T,
  108: { status: 108, message: '' } as T,
  109: { status: 109, message: '' } as T,
  110: { status: 110, message: '' } as T,
  111: { status: 111, message: '' } as T,
  112: { status: 112, message: '' } as T,
  113: { status: 113, message: '' } as T,
  114: { status: 114, message: '' } as T,
  115: { status: 115, message: '' } as T,
  116: { status: 116, message: '' } as T,
  117: { status: 117, message: '' } as T,
  118: { status: 118, message: '' } as T,
  119: { status: 119, message: '' } as T,
  120: { status: 120, message: '' } as T,
  121: { status: 121, message: '' } as T,
  122: { status: 122, message: '' } as T,
  123: { status: 123, message: '' } as T,
  124: { status: 124, message: '' } as T,
  125: { status: 125, message: '' } as T,
  126: { status: 126, message: '' } as T,
  127: { status: 127, message: '' } as T,
  128: { status: 128, message: '' } as T,
  129: { status: 129, message: '' } as T,
  130: { status: 130, message: '' } as T,
  131: { status: 131, message: '' } as T,
  132: { status: 132, message: '' } as T,
  133: { status: 133, message: '' } as T,
  134: { status: 134, message: '' } as T,
  135: { status: 135, message: '' } as T,
  136: { status: 136, message: '' } as T,
  137: { status: 137, message: '' } as T,
  138: { status: 138, message: '' } as T,
  139: { status: 139, message: '' } as T,
  140: { status: 140, message: '' } as T,
  141: { status: 141, message: '' } as T,
  142: { status: 142, message: '' } as T,
  143: { status: 143, message: '' } as T,
  144: { status: 144, message: '' } as T,
  145: { status: 145, message: '' } as T,
  146: { status: 146, message: '' } as T,
  147: { status: 147, message: '' } as T,
  148: { status: 148, message: '' } as T,
  149: { status: 149, message: '' } as T,
  150: { status: 150, message: '' } as T,
  151: { status: 151, message: '' } as T,
  152: { status: 152, message: '' } as T,
  153: { status: 153, message: '' } as T,
  154: { status: 154, message: '' } as T,
  155: { status: 155, message: '' } as T,
  156: { status: 156, message: '' } as T,
  157: { status: 157, message: '' } as T,
  158: { status: 158, message: '' } as T,
  159: { status: 159, message: '' } as T,
  160: { status: 160, message: '' } as T,
  161: { status: 161, message: '' } as T,
  162: { status: 162, message: '' } as T,
  163: { status: 163, message: '' } as T,
  164: { status: 164, message: '' } as T,
  165: { status: 165, message: '' } as T,
  166: { status: 166, message: '' } as T,
  167: { status: 167, message: '' } as T,
  168: { status: 168, message: '' } as T,
  169: { status: 169, message: '' } as T,
  170: { status: 170, message: '' } as T,
  171: { status: 171, message: '' } as T,
  172: { status: 172, message: '' } as T,
  173: { status: 173, message: '' } as T,
  174: { status: 174, message: '' } as T,
  175: { status: 175, message: '' } as T,
  176: { status: 176, message: '' } as T,
  177: { status: 177, message: '' } as T,
  178: { status: 178, message: '' } as T,
  179: { status: 179, message: '' } as T,
  180: { status: 180, message: '' } as T,
  181: { status: 181, message: '' } as T,
  182: { status: 182, message: '' } as T,
  183: { status: 183, message: '' } as T,
  184: { status: 184, message: '' } as T,
  185: { status: 185, message: '' } as T,
  186: { status: 186, message: '' } as T,
  187: { status: 187, message: '' } as T,
  188: { status: 188, message: '' } as T,
  189: { status: 189, message: '' } as T,
  190: { status: 190, message: '' } as T,
  191: { status: 191, message: '' } as T,
  192: { status: 192, message: '' } as T,
  193: { status: 193, message: '' } as T,
  194: { status: 194, message: '' } as T,
  195: { status: 195, message: '' } as T,
  196: { status: 196, message: '' } as T,
  197: { status: 197, message: '' } as T,
  198: { status: 198, message: '' } as T,
  199: { status: 199, message: '' } as T,
} as const;
