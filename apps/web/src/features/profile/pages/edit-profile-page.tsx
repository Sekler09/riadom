import { Button } from '@repo/ui/components/button';
import { FieldGroup } from '@repo/ui/components/field';
import { Link } from '@tanstack/react-router';
import { ArrowLeft } from 'lucide-react';

import { paths } from '@/constants/paths';
import { useEditProfileForm } from '../hooks/use-edit-profile-form';
import { Form } from '@/components/form/form';
import { DisplayNameInput } from '../components/edit-profile-form/display-name-input';
import { SubmitButton } from '@/components/form/submit-button';
import { useSessionQuery } from '@/features/auth/api/use-session-query';
import { ReadonlyFields } from '../components/edit-profile-form/read-only-fields';
import { useMyProfile } from '../api/use-my-profile';
import { ProfileAvatar } from '../components/edit-profile-form/profile-avatar';
import { UnsavedChangesDialog } from '../components/edit-profile-form/unsaved-changes-dialog';

const EditProfilePage = () => {
  const { data: session } = useSessionQuery();
  const { data: profile } = useMyProfile();

  const tgUsername = session?.user.tgUsername
    ? `@${session?.user.tgUsername}`
    : '-';

  const {
    form,
    onSubmit,
    isDirty,
    isSubmitting,
    blocker,
    imageInputRef,
    imagePreview,
    imageError,
    handleImageChange,
    handleImageRemove,
  } = useEditProfileForm();

  return (
    <main className="flex min-h-dvh flex-col bg-background touch-manipulation">
      <header className="sticky top-0 z-10 shrink-0 border-b border-border/60 bg-background">
        <div className="mx-auto flex w-full max-w-md items-center gap-3 px-6 py-3 pt-[max(0.75rem,env(safe-area-inset-top))]">
          <Button
            type="button"
            variant="ghost"
            size="icon-lg"
            className="shrink-0 transition-colors duration-200"
            nativeButton={false}
            render={<Link to={paths.profile} />}
            aria-label="Back to profile"
          >
            <ArrowLeft strokeWidth={1.5} aria-hidden="true" />
          </Button>

          <div className="min-w-0 flex-1">
            <p className="text-kicker">Profile</p>
            <h1 className="truncate text-sm font-medium">Edit profile</h1>
          </div>
        </div>
      </header>

      <Form
        form={form}
        onSubmit={onSubmit}
        className="mx-auto flex w-full max-w-md flex-1 flex-col"
      >
        <div className="flex-1 animate-fade-up px-6 py-8">
          <FieldGroup className="gap-8">
            <ProfileAvatar
              inputRef={imageInputRef}
              preview={imagePreview}
              currentAvatar={profile.avatarUrl}
              error={imageError}
              disabled={isSubmitting}
              onChange={handleImageChange}
              onRemove={handleImageRemove}
            />

            <DisplayNameInput disabled={isSubmitting} />

            <ReadonlyFields profile={profile} tgUsername={tgUsername} />
          </FieldGroup>
        </div>

        <div className="sticky bottom-0 z-10 shrink-0 border-t border-border/60 bg-background">
          <div className="mx-auto flex w-full max-w-md flex-col gap-3 px-6 pt-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
            <SubmitButton
              size="lg"
              className="h-12 w-full transition-colors duration-200"
              disabled={!isDirty}
            >
              save changes
            </SubmitButton>

            <Button
              type="button"
              variant="ghost"
              size="lg"
              className="h-12 w-full transition-colors duration-200"
              nativeButton={false}
              render={<Link to={paths.profile} />}
            >
              cancel
            </Button>

            <p className="text-center text-[11px] leading-relaxed text-muted-foreground">
              save stays off until something changes.
            </p>
          </div>
        </div>
      </Form>

      <UnsavedChangesDialog
        open={blocker.status === 'blocked'}
        onKeepEditing={() => blocker.reset?.()}
        onDiscard={() => blocker.proceed?.()}
      />
    </main>
  );
};

export { EditProfilePage };
