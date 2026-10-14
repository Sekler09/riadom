import { useSessionQuery } from '@/features/auth/api/use-session-query';
import { useMyProfile } from '@/features/profile/api/use-my-profile';
import { ProfileDownForSection } from '@/features/profile/components/profile-down-for-section';
import { ProfileSoonRows } from '@/features/profile/components/profile-soon-rows';
import { getAgeYears } from '@/features/profile/utils/get-age-years';
import { ProfileAvatar } from '@/features/profile/components/profile-avatar';
import { SignOutButton } from '@/features/profile/components/sign-out-button';

const ProfilePage = () => {
  const { data: profile } = useMyProfile();
  const { data: session } = useSessionQuery();

  const tgUsername = session?.user?.tgUsername;
  const age = getAgeYears(profile.birthDate);

  return (
    <main className="flex min-h-dvh flex-col bg-background touch-manipulation">
      <header className="shrink-0 border-b border-border/60 bg-background">
        <div className="mx-auto flex w-full max-w-md items-center px-6 py-4 pt-[max(1rem,env(safe-area-inset-top))]">
          <p className="text-kicker">Profile</p>
        </div>
      </header>

      <div className="mx-auto flex w-full max-w-md flex-1 flex-col gap-8 px-6 py-8 animate-fade-up">
        <section
          className="flex flex-col items-center gap-4 text-center"
          aria-label="Your identity"
        >
          <ProfileAvatar profile={profile} />

          <div className="space-y-1">
            <h1 className="type-display-md normal-case tracking-[-0.02em]">
              {profile.name}
            </h1>
            <p className="text-muted-foreground text-sm">{age} years old</p>
          </div>
        </section>

        <ProfileDownForSection />

        <section aria-label="Contact">
          <p className="text-label mb-2">Contact</p>
          <dl className="border-t border-border/60">
            <div className="flex min-h-11 items-center justify-between gap-4 border-b border-border/60 py-3">
              <dt className="text-sm font-medium">Telegram</dt>
              <dd className="truncate text-sm text-muted-foreground">
                {tgUsername ? `@${tgUsername}` : '—'}
              </dd>
            </div>
          </dl>
          <p className="mt-2 text-[11px] leading-relaxed text-muted-foreground">
            Visible only after an approved activity — not public on your
            profile.
          </p>
        </section>

        <ProfileSoonRows />
      </div>

      <div className="mx-auto w-full max-w-md px-6 pb-[max(1.5rem,env(safe-area-inset-bottom))]">
        <SignOutButton />
      </div>
    </main>
  );
};

export { ProfilePage };
