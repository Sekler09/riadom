import { FieldDescription, FieldGroup } from '@repo/ui/components/field';
import { Logo } from '@repo/ui/components/logo';
import { ArrowUpRight, Lock } from 'lucide-react';

import { Form } from '@/components/form/form';
import { SubmitButton } from '@/components/form/submit-button';
import { OnboardingAvatarField } from '@/features/onboarding/components/onboarding-avatar-field';
import { OnboardingBirthDateField } from '@/features/onboarding/components/onboarding-birth-date-field';
import { OnboardingIntro } from '@/features/onboarding/components/onboarding-intro';
import { OnboardingNameField } from '@/features/onboarding/components/onboarding-name-field';
import { useOnboardingForm } from '@/features/onboarding/hooks/use-onboarding-form';

const OnboardingForm = () => {
  const {
    form,
    onSubmit,
    avatarInputRef,
    avatarPreview,
    avatarError,
    handleAvatarChange,
    handleAvatarRemove,
  } = useOnboardingForm();

  return (
    <main className="flex min-h-dvh flex-col bg-background">
      <Form
        form={form}
        onSubmit={onSubmit}
        className="flex min-h-dvh flex-col touch-manipulation"
      >
        <header className="sticky top-0 z-10 shrink-0 border-b border-border/60 bg-background">
          <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4 pt-[max(1rem,env(safe-area-inset-top))] sm:px-10">
            <Logo />
            <p className="text-kicker">setup</p>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto">
          <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-12 px-6 py-10 sm:px-10 lg:grid-cols-12 lg:gap-16 lg:py-16">
            <OnboardingIntro />

            <FieldGroup className="gap-8 lg:col-span-7">
              <OnboardingAvatarField
                inputRef={avatarInputRef}
                preview={avatarPreview}
                error={avatarError}
                onChange={handleAvatarChange}
                onRemove={handleAvatarRemove}
              />

              <OnboardingNameField />

              <OnboardingBirthDateField />
            </FieldGroup>
          </div>
        </div>

        <div className="sticky bottom-0 z-10 shrink-0 border-t border-border/60 bg-background">
          <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 px-6 pt-4 pb-[max(1rem,env(safe-area-inset-bottom))] sm:px-10 lg:flex-row lg:items-center lg:justify-between lg:gap-8">
            <FieldDescription className="flex items-start gap-2 text-[11px] leading-relaxed lg:max-w-sm">
              <Lock
                className="mt-0.5 size-3.5 shrink-0"
                strokeWidth={1.5}
                aria-hidden="true"
              />
              <span>
                your telegram stays private until you share an approved
                activity.
              </span>
            </FieldDescription>

            <SubmitButton size="lg" className="h-12 w-full lg:w-auto">
              continue
              <ArrowUpRight data-icon="inline-end" aria-hidden="true" />
            </SubmitButton>
          </div>
        </div>
      </Form>
    </main>
  );
};

export { OnboardingForm };
