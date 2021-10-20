import {
  array,
  object,
  string,
  TypeOf,
  union,
  literal,
  ZodOptional,
  ZodRawShape,
  ZodTypeAny,
} from 'zod';
import {
  isPrimitive,
  OptionalDeepPartial,
  ZodPrimitive,
} from '../../.config';
import { permissionStatusSchema } from '../status';

export const permissionDataSchema = <T extends ZodRawShape | ZodPrimitive>(
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
    status: permissionStatusSchema,
    payload,
    notPermitteds: union([literal('all'), array(string())]).default('all'),
  });
};

const dert = permissionDataSchema({ id: string(), password: string() });

type T = TypeOf<typeof dert>;

const test: T = { notPermitteds: 'all', status: 606 };

/*prettier-ignore*/
export const PERMISSION_DENIED_CONSTANTS = {
  600: { status: 600 , notPermitteds: 'all' } as T,
  601: { status: 601 , notPermitteds: 'all' } as T,
  602: { status: 602 , notPermitteds: 'all' } as T,
  603: { status: 603 , notPermitteds: 'all' } as T,
  604: { status: 604 , notPermitteds: 'all' } as T,
  605: { status: 605 , notPermitteds: 'all' } as T,
  606: { status: 606 , notPermitteds: 'all' } as T,
  607: { status: 607 , notPermitteds: 'all' } as T,
  608: { status: 608 , notPermitteds: 'all' } as T,
  609: { status: 609 , notPermitteds: 'all' } as T,
  610: { status: 610 , notPermitteds: 'all' } as T,
  611: { status: 611 , notPermitteds: 'all' } as T,
  612: { status: 612 , notPermitteds: 'all' } as T,
  613: { status: 613 , notPermitteds: 'all' } as T,
  614: { status: 614 , notPermitteds: 'all' } as T,
  615: { status: 615 , notPermitteds: 'all' } as T,
  616: { status: 616 , notPermitteds: 'all' } as T,
  617: { status: 617 , notPermitteds: 'all' } as T,
  618: { status: 618 , notPermitteds: 'all' } as T,
  619: { status: 619 , notPermitteds: 'all' } as T,
  620: { status: 620 , notPermitteds: 'all' } as T,
  621: { status: 621 , notPermitteds: 'all' } as T,
  622: { status: 622 , notPermitteds: 'all' } as T,
  623: { status: 623 , notPermitteds: 'all' } as T,
  624: { status: 624 , notPermitteds: 'all' } as T,
  625: { status: 625 , notPermitteds: 'all' } as T,
  626: { status: 626 , notPermitteds: 'all' } as T,
  627: { status: 627 , notPermitteds: 'all' } as T,
  628: { status: 628 , notPermitteds: 'all' } as T,
  629: { status: 629 , notPermitteds: 'all' } as T,
  630: { status: 630 , notPermitteds: 'all' } as T,
  631: { status: 631 , notPermitteds: 'all' } as T,
  632: { status: 632 , notPermitteds: 'all' } as T,
  633: { status: 633 , notPermitteds: 'all' } as T,
  634: { status: 634 , notPermitteds: 'all' } as T,
  635: { status: 635 , notPermitteds: 'all' } as T,
  636: { status: 636 , notPermitteds: 'all' } as T,
  637: { status: 637 , notPermitteds: 'all' } as T,
  638: { status: 638 , notPermitteds: 'all' } as T,
  639: { status: 639 , notPermitteds: 'all' } as T,
  640: { status: 640 , notPermitteds: 'all' } as T,
  641: { status: 641 , notPermitteds: 'all' } as T,
  642: { status: 642 , notPermitteds: 'all' } as T,
  643: { status: 643 , notPermitteds: 'all' } as T,
  644: { status: 644 , notPermitteds: 'all' } as T,
  645: { status: 645 , notPermitteds: 'all' } as T,
  646: { status: 646 , notPermitteds: 'all' } as T,
  647: { status: 647 , notPermitteds: 'all' } as T,
  648: { status: 648 , notPermitteds: 'all' } as T,
  649: { status: 649 , notPermitteds: 'all' } as T,
  650: { status: 650 , notPermitteds: 'all' } as T,
  651: { status: 651 , notPermitteds: 'all' } as T,
  652: { status: 652 , notPermitteds: 'all' } as T,
  653: { status: 653 , notPermitteds: 'all' } as T,
  654: { status: 654 , notPermitteds: 'all' } as T,
  655: { status: 655 , notPermitteds: 'all' } as T,
  656: { status: 656 , notPermitteds: 'all' } as T,
  657: { status: 657 , notPermitteds: 'all' } as T,
  658: { status: 658 , notPermitteds: 'all' } as T,
  659: { status: 659 , notPermitteds: 'all' } as T,
  660: { status: 660 , notPermitteds: 'all' } as T,
  661: { status: 661 , notPermitteds: 'all' } as T,
  662: { status: 662 , notPermitteds: 'all' } as T,
  663: { status: 663 , notPermitteds: 'all' } as T,
  664: { status: 664 , notPermitteds: 'all' } as T,
  665: { status: 665 , notPermitteds: 'all' } as T,
  666: { status: 666 , notPermitteds: 'all' } as T,
  667: { status: 667 , notPermitteds: 'all' } as T,
  668: { status: 668 , notPermitteds: 'all' } as T,
  669: { status: 669 , notPermitteds: 'all' } as T,
  670: { status: 670 , notPermitteds: 'all' } as T,
  671: { status: 671 , notPermitteds: 'all' } as T,
  62: { status: 672 , notPermitteds: 'all' } as T,
  673: { status: 673 , notPermitteds: 'all' } as T,
  674: { status: 674 , notPermitteds: 'all' } as T,
  675: { status: 675 , notPermitteds: 'all' } as T,
  676: { status: 676 , notPermitteds: 'all' } as T,
  677: { status: 677 , notPermitteds: 'all' } as T,
  678: { status: 678 , notPermitteds: 'all' } as T,
  679: { status: 679 , notPermitteds: 'all' } as T,
  680: { status: 680 , notPermitteds: 'all' } as T,
  681: { status: 681 , notPermitteds: 'all' } as T,
  682: { status: 682 , notPermitteds: 'all' } as T,
  683: { status: 683 , notPermitteds: 'all' } as T,
  684: { status: 684 , notPermitteds: 'all' } as T,
  685: { status: 685 , notPermitteds: 'all' } as T,
  686: { status: 686 , notPermitteds: 'all' } as T,
  687: { status: 687 , notPermitteds: 'all' } as T,
  688: { status: 688 , notPermitteds: 'all' } as T,
  689: { status: 689 , notPermitteds: 'all' } as T,
  690: { status: 690 , notPermitteds: 'all' } as T,
  691: { status: 691 , notPermitteds: 'all' } as T,
  692: { status: 692 , notPermitteds: 'all' } as T,
  693: { status: 693 , notPermitteds: 'all' } as T,
  694: { status: 694 , notPermitteds: 'all' } as T,
  695: { status: 695 , notPermitteds: 'all' } as T,
  696: { status: 696 , notPermitteds: 'all' } as T,
  697: { status: 697 , notPermitteds: 'all' } as T,
  698: { status: 698 , notPermitteds: 'all' } as T,
  699: { status: 699 , notPermitteds: 'all' } as T,
} as const;
