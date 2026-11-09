import type { Profile } from '@repo/contracts/profile';
import { Separator } from '@repo/ui/components/separator';
import { getAgeYears } from '@/features/profile/utils/get-age-years';
import { Lock } from 'lucide-react';

type ReadonlyFieldsProps = {
  profile: Profile;
  tgUsername: string;
};

export const ReadonlyFields = ({
  profile,
  tgUsername,
}: ReadonlyFieldsProps) => {
  return (
    <section aria-label="Read-only details" className="flex flex-col gap-6">
      <div className="pt-2">
        <Separator className="mb-6 bg-foreground/20" />
        <div className="mb-5 flex items-end justify-between gap-4">
          <span
            className="font-display text-3xl font-medium tracking-[-0.04em] text-foreground/15 sm:text-4xl"
            aria-hidden="true"
          >
            03
          </span>
          <p className="text-label">fixed details</p>
        </div>
      </div>

      <dl className="border-t border-border/60">
        <div className="flex min-h-11 items-center justify-between gap-4 border-b border-border/60 py-3">
          <dt className="text-sm font-medium">Age</dt>
          <dd className="truncate text-sm text-muted-foreground">
            {getAgeYears(profile.birthDate)}
          </dd>
        </div>
        <div className="flex min-h-11 items-center justify-between gap-4 border-b border-border/60 py-3">
          <dt className="text-sm font-medium">Telegram</dt>
          <dd className="truncate text-sm text-muted-foreground">
            {tgUsername}
          </dd>
        </div>
      </dl>

      <p className="flex items-start gap-2 text-[11px] leading-relaxed text-muted-foreground">
        <Lock
          className="mt-0.5 size-3.5 shrink-0"
          strokeWidth={1.5}
          aria-hidden="true"
        />
        <span>
          birth date and telegram stay fixed. contact is visible only after an
          approved activity.
        </span>
      </p>
    </section>
  );
};
