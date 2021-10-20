import {
  object,
  string,
  TypeOf,
  ZodOptional,
  ZodRawShape,
  ZodTypeAny
} from 'zod';
import { isPrimitive } from '../../functions';
import {
  Information,
  OptionalDeepPartial,
  ZodPrimitive
} from '../../types';
import { informationStatusSchema } from '../status';

export const informationDataSchema = <
  T extends ZodRawShape | ZodPrimitive,
>(
  shape: T,
): Information<T> => {
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
    message: string().optional(),
  });
};

const examples = informationDataSchema({
  id: string(),
  password: string(),
});

type T = TypeOf<typeof examples>;

/* prettier-ignore */
export const INFORMATION_DATAS = {
  100: { status: 100 } as T,
  101: { status: 101 } as T,
  102: { status: 102 } as T,
  103: { status: 103 } as T,
  104: { status: 104 } as T,
  105: { status: 105 } as T,
  106: { status: 106 } as T,
  107: { status: 107 } as T,
  108: { status: 108 } as T,
  109: { status: 109 } as T,
  110: { status: 110 } as T,
  111: { status: 111 } as T,
  112: { status: 112 } as T,
  113: { status: 113 } as T,
  114: { status: 114 } as T,
  115: { status: 115 } as T,
  116: { status: 116 } as T,
  117: { status: 117 } as T,
  118: { status: 118 } as T,
  119: { status: 119 } as T,
  120: { status: 120 } as T,
  121: { status: 121 } as T,
  122: { status: 122 } as T,
  123: { status: 123 } as T,
  124: { status: 124 } as T,
  125: { status: 125 } as T,
  126: { status: 126 } as T,
  127: { status: 127 } as T,
  128: { status: 128 } as T,
  129: { status: 129 } as T,
  130: { status: 130 } as T,
  131: { status: 131 } as T,
  132: { status: 132 } as T,
  133: { status: 133 } as T,
  134: { status: 134 } as T,
  135: { status: 135 } as T,
  136: { status: 136 } as T,
  137: { status: 137 } as T,
  138: { status: 138 } as T,
  139: { status: 139 } as T,
  140: { status: 140 } as T,
  141: { status: 141 } as T,
  142: { status: 142 } as T,
  143: { status: 143 } as T,
  144: { status: 144 } as T,
  145: { status: 145 } as T,
  146: { status: 146 } as T,
  147: { status: 147 } as T,
  148: { status: 148 } as T,
  149: { status: 149 } as T,
  150: { status: 150 } as T,
  151: { status: 151 } as T,
  152: { status: 152 } as T,
  153: { status: 153 } as T,
  154: { status: 154 } as T,
  155: { status: 155 } as T,
  156: { status: 156 } as T,
  157: { status: 157 } as T,
  158: { status: 158 } as T,
  159: { status: 159 } as T,
  160: { status: 160 } as T,
  161: { status: 161 } as T,
  162: { status: 162 } as T,
  163: { status: 163 } as T,
  164: { status: 164 } as T,
  165: { status: 165 } as T,
  166: { status: 166 } as T,
  167: { status: 167 } as T,
  168: { status: 168 } as T,
  169: { status: 169 } as T,
  170: { status: 170 } as T,
  171: { status: 171 } as T,
  172: { status: 172 } as T,
  173: { status: 173 } as T,
  174: { status: 174 } as T,
  175: { status: 175 } as T,
  176: { status: 176 } as T,
  177: { status: 177 } as T,
  178: { status: 178 } as T,
  179: { status: 179 } as T,
  180: { status: 180 } as T,
  181: { status: 181 } as T,
  182: { status: 182 } as T,
  183: { status: 183 } as T,
  184: { status: 184 } as T,
  185: { status: 185 } as T,
  186: { status: 186 } as T,
  187: { status: 187 } as T,
  188: { status: 188 } as T,
  189: { status: 189 } as T,
  190: { status: 190 } as T,
  191: { status: 191 } as T,
  192: { status: 192 } as T,
  193: { status: 193 } as T,
  194: { status: 194 } as T,
  195: { status: 195 } as T,
  196: { status: 196 } as T,
  197: { status: 197 } as T,
  198: { status: 198 } as T,
  199: { status: 199 } as T,
} as const;
