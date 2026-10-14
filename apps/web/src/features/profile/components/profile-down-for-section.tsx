import { Button } from '@repo/ui/components/button';

import { ACTIVITY_TAG_EXAMPLES } from '@/features/profile/constants/activity-tags';

const ProfileDownForSection = () => {
  return (
    <section className="space-y-4" aria-labelledby="profile-down-for-heading">
      <div className="space-y-1">
        <p className="text-label">Down for</p>
        <h2
          id="profile-down-for-heading"
          className="text-base font-medium tracking-[-0.02em]"
        >
          What you&apos;re usually down for
        </h2>
        <p className="text-sm leading-relaxed text-muted-foreground">
          Add a short note and a few activity tags.
        </p>
      </div>

      <div className="space-y-3 border border-border/60 bg-background p-4">
        <p className="text-kicker">Examples</p>
        <ul className="flex flex-wrap gap-2" aria-label="Example activity tags">
          {ACTIVITY_TAG_EXAMPLES.map((tag) => (
            <li
              key={tag}
              className="border border-border/70 px-2.5 py-1 text-[11px] tracking-caps text-muted-foreground uppercase"
            >
              {tag}
            </li>
          ))}
        </ul>

        <Button
          type="button"
          variant="outline"
          size="lg"
          className="min-h-11 w-full"
          disabled
          aria-disabled="true"
        >
          Add · Soon
        </Button>
      </div>
    </section>
  );
};

export { ProfileDownForSection };
