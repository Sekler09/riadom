import { Button } from '@repo/ui/components/button';
import { Input } from '@repo/ui/components/input';
import { Logo } from '@repo/ui/components/logo';
import { cn } from '@repo/ui/lib/utils';
import { ArrowUpRight, Camera, Lock } from 'lucide-react';
import { useEffect, useRef, useState, type ChangeEvent, type FormEvent } from 'react';

type OnboardingFieldBlockProps = {
  index: string;
  children: React.ReactNode;
};

const OnboardingFieldBlock = ({ index, children }: OnboardingFieldBlockProps) => {
  return (
    <div className="border-t border-foreground/20 pt-6">
      <div className="mb-5 flex items-end justify-between gap-4">
        <span
          className="font-display text-3xl font-medium tracking-[-0.04em] text-foreground/15 sm:text-4xl"
          aria-hidden="true"
        >
          {index}
        </span>
        {children}
      </div>
    </div>
  );
};

const RequiredMark = () => {
  return (
    <>
      <span aria-hidden="true"> *</span>
      <span className="sr-only"> (required)</span>
    </>
  );
};

const OnboardingPage = () => {
  const avatarInputRef = useRef<HTMLInputElement>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

  useEffect(() => {
    return () => {
      if (avatarPreview) {
        URL.revokeObjectURL(avatarPreview);
      }
    };
  }, [avatarPreview]);

  const handleAvatarChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    setAvatarPreview(URL.createObjectURL(file));
  };

  const handleAvatarRemove = () => {
    setAvatarPreview(null);

    if (avatarInputRef.current) {
      avatarInputRef.current.value = '';
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <main className="flex min-h-dvh flex-col bg-background">
      <form
        className="flex min-h-dvh flex-col touch-manipulation"
        onSubmit={handleSubmit}
      >
        <header className="sticky top-0 z-10 shrink-0 border-b border-border/60 bg-background">
          <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4 pt-[max(1rem,env(safe-area-inset-top))] sm:px-10">
            <Logo />
            <p className="text-kicker">setup</p>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto">
          <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-12 px-6 py-10 sm:px-10 lg:grid-cols-12 lg:gap-16 lg:py-16">
            <div className="lg:col-span-5 lg:sticky lg:top-[calc(5rem+env(safe-area-inset-top))] lg:self-start">
              <p className="text-label mb-8 border-l border-foreground pl-4">
                before you hit the map
              </p>
              <h1 className="type-display-lg">
                who are you
                <span className="block text-muted-foreground">
                  showing up as
                </span>
              </h1>
              <p className="text-body-lg mt-6 max-w-[36ch]">
                people see this once you share an activity — not while they
                browse the map.
              </p>
            </div>

            <div className="flex flex-col gap-8 lg:col-span-7">
              <fieldset className="min-w-0">
                <legend className="sr-only">photo (required)</legend>

                <OnboardingFieldBlock index="01">
                  <span className="text-label" aria-hidden="true">
                    photo
                    <RequiredMark />
                  </span>
                </OnboardingFieldBlock>

                <div className="flex items-start gap-4">
                  <input
                    ref={avatarInputRef}
                    id="onboarding-avatar"
                    name="avatar"
                    type="file"
                    accept="image/*"
                    aria-required="true"
                    aria-describedby="onboarding-avatar-hint onboarding-avatar-error"
                    className="peer sr-only"
                    onChange={handleAvatarChange}
                  />

                  <label
                    htmlFor="onboarding-avatar"
                    className={cn(
                      'relative flex size-32 shrink-0 cursor-pointer items-center justify-center overflow-hidden border border-border/70 bg-muted/40 transition-colors duration-200 sm:size-40',
                      'hover:border-foreground/30',
                      'peer-focus-visible:border-ring peer-focus-visible:ring-3 peer-focus-visible:ring-ring/50',
                    )}
                  >
                    {avatarPreview ? (
                      <img
                        src={avatarPreview}
                        alt="Profile photo preview"
                        width={160}
                        height={160}
                        className="size-full object-cover"
                      />
                    ) : (
                      <Camera
                        className="size-6 text-muted-foreground"
                        strokeWidth={1.5}
                        aria-hidden="true"
                      />
                    )}

                    <span className="icon-box absolute right-1.5 bottom-1.5 size-8 bg-background">
                      <Camera
                        className="size-3.5"
                        strokeWidth={1.5}
                        aria-hidden="true"
                      />
                    </span>

                    <span className="sr-only">
                      {avatarPreview
                        ? 'Replace profile photo'
                        : 'Upload a profile photo'}
                    </span>
                  </label>

                  <div className="flex min-h-32 min-w-0 flex-1 flex-col justify-center gap-2 sm:min-h-40">
                    <p
                      id="onboarding-avatar-hint"
                      className="text-[13px] leading-[1.6] text-muted-foreground"
                    >
                      {avatarPreview
                        ? 'tap the photo to replace it.'
                        : 'required · so people can recognize you irl.'}
                    </p>

                    {avatarPreview ? (
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="h-11 w-fit px-0 text-[11px] tracking-caps uppercase"
                        onClick={handleAvatarRemove}
                      >
                        remove
                      </Button>
                    ) : null}

                    <p
                      id="onboarding-avatar-error"
                      role="alert"
                      className="min-h-4 text-[11px] leading-4 text-destructive"
                    />
                  </div>
                </div>
              </fieldset>

              <div>
                <OnboardingFieldBlock index="02">
                  <label
                    htmlFor="onboarding-display-name"
                    className="text-label"
                  >
                    display name
                    <RequiredMark />
                  </label>
                </OnboardingFieldBlock>

                <Input
                  id="onboarding-display-name"
                  name="displayName"
                  type="text"
                  autoComplete="nickname"
                  autoCapitalize="words"
                  spellCheck={false}
                  placeholder="how you want to be called"
                  aria-required="true"
                  aria-describedby="onboarding-display-name-hint onboarding-display-name-error"
                  className="h-12 text-base transition-colors duration-200"
                />
                <p
                  id="onboarding-display-name-hint"
                  className="mt-2 text-[11px] leading-relaxed text-muted-foreground"
                >
                  this is the name people see on activities — not your telegram
                  handle.
                </p>
                <p
                  id="onboarding-display-name-error"
                  role="alert"
                  className="mt-1 min-h-4 text-[11px] leading-4 text-destructive"
                />
              </div>

              <div>
                <OnboardingFieldBlock index="03">
                  <label htmlFor="onboarding-birth-date" className="text-label">
                    date of birth
                    <RequiredMark />
                  </label>
                </OnboardingFieldBlock>

                <Input
                  id="onboarding-birth-date"
                  name="birthDate"
                  type="date"
                  autoComplete="bday"
                  aria-required="true"
                  aria-describedby="onboarding-birth-date-hint onboarding-birth-date-error"
                  className="h-12 text-base transition-colors duration-200"
                />
                <p
                  id="onboarding-birth-date-hint"
                  className="mt-2 text-[11px] leading-relaxed text-muted-foreground"
                >
                  we show your age on your profile, never the date itself.
                </p>
                <p
                  id="onboarding-birth-date-error"
                  role="alert"
                  className="mt-1 min-h-4 text-[11px] leading-4 text-destructive"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="sticky bottom-0 z-10 shrink-0 border-t border-border/60 bg-background">
          <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 px-6 pt-4 pb-[max(1rem,env(safe-area-inset-bottom))] sm:px-10 lg:flex-row lg:items-center lg:justify-between lg:gap-8">
            <p className="flex items-start gap-2 text-[11px] leading-relaxed text-muted-foreground lg:max-w-sm">
              <Lock
                className="mt-0.5 size-3.5 shrink-0"
                strokeWidth={1.5}
                aria-hidden="true"
              />
              <span>
                your telegram stays private until you share an approved
                activity.
              </span>
            </p>

            <Button type="submit" size="lg" className="h-12 w-full lg:w-auto">
              continue
              <ArrowUpRight className="size-4" aria-hidden="true" />
            </Button>
          </div>
        </div>
      </form>
    </main>
  );
};

export { OnboardingPage };
