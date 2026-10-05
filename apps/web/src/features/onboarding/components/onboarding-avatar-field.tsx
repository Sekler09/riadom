import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarImage,
} from '@repo/ui/components/avatar';
import { Button } from '@repo/ui/components/button';
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from '@repo/ui/components/field';
import { cn } from '@repo/ui/lib/utils';
import { Camera } from 'lucide-react';
import type { ChangeEvent, RefObject } from 'react';

import {
  OnboardingFieldBlock,
  RequiredMark,
} from '@/features/onboarding/components/onboarding-field-block';

type OnboardingAvatarFieldProps = {
  inputRef: RefObject<HTMLInputElement | null>;
  preview: string | null;
  error: string | null;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onRemove: () => void;
};

const OnboardingAvatarField = ({
  inputRef,
  preview,
  error,
  onChange,
  onRemove,
}: OnboardingAvatarFieldProps) => {
  return (
    <FieldSet>
      <FieldLegend className="sr-only">photo (required)</FieldLegend>

      <Field data-invalid={!!error}>
        <OnboardingFieldBlock index="01">
          <FieldLabel className="text-label" aria-hidden="true">
            photo
            <RequiredMark />
          </FieldLabel>
        </OnboardingFieldBlock>

        <div className="flex items-start gap-4">
          <input
            ref={inputRef}
            id="onboarding-avatar"
            name="avatar"
            type="file"
            accept="image/*"
            aria-required="true"
            aria-invalid={!!error}
            aria-describedby="onboarding-avatar-hint onboarding-avatar-error"
            className="peer sr-only"
            onChange={onChange}
          />

          <FieldLabel
            htmlFor="onboarding-avatar"
            className={cn(
              'relative size-32 shrink-0 cursor-pointer overflow-hidden rounded-none border border-border/70 bg-muted/40 p-0 transition-colors duration-200 sm:size-40',
              'hover:border-foreground/30',
              'peer-focus-visible:border-ring peer-focus-visible:ring-3 peer-focus-visible:ring-ring/50',
            )}
          >
            <Avatar
              className="size-full rounded-none after:rounded-none"
              aria-hidden="true"
            >
              {preview ? (
                <AvatarImage
                  src={preview}
                  alt="Profile photo preview"
                  className="rounded-none"
                />
              ) : (
                <AvatarFallback className="rounded-none bg-transparent">
                  <Camera
                    className="size-6 text-muted-foreground"
                    strokeWidth={1.5}
                    aria-hidden="true"
                  />
                </AvatarFallback>
              )}
              <AvatarBadge className="icon-box size-8! rounded-none bg-background text-foreground ring-0 right-1.5 bottom-1.5">
                <Camera
                  className="size-3.5!"
                  strokeWidth={1.5}
                  aria-hidden="true"
                />
              </AvatarBadge>
            </Avatar>

            <span className="sr-only">
              {preview ? 'Replace profile photo' : 'Upload a profile photo'}
            </span>
          </FieldLabel>

          <FieldContent className="min-h-32 justify-center gap-2 sm:min-h-40">
            <FieldDescription id="onboarding-avatar-hint">
              {preview
                ? 'tap the photo to replace it.'
                : 'required · so people can recognize you irl.'}
            </FieldDescription>

            {preview ? (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="h-11 w-fit px-0 text-[11px] tracking-caps uppercase"
                onClick={onRemove}
              >
                remove
              </Button>
            ) : null}

            <FieldError
              id="onboarding-avatar-error"
              className="min-h-4 text-[11px] leading-4"
            >
              {error}
            </FieldError>
          </FieldContent>
        </div>
      </Field>
    </FieldSet>
  );
};

export { OnboardingAvatarField };
