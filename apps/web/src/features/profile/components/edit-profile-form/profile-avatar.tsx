import { Avatar, AvatarBadge, AvatarImage } from '@repo/ui/components/avatar';
import { Button } from '@repo/ui/components/button';
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldLabel,
} from '@repo/ui/components/field';
import { Separator } from '@repo/ui/components/separator';
import { cn } from '@repo/ui/lib/utils';
import type { ChangeEvent, RefObject } from 'react';
import { Camera } from 'lucide-react';

type ProfileAvatarProps = {
  inputRef: RefObject<HTMLInputElement | null>;
  preview: string | null;
  currentAvatar: string;
  error: string | null;
  disabled?: boolean;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onRemove: () => void;
};

export const ProfileAvatar = ({
  inputRef,
  preview,
  currentAvatar,
  error,
  disabled = false,
  onChange,
  onRemove,
}: ProfileAvatarProps) => {
  return (
    <Field data-invalid={!error}>
      <div className="pt-2">
        <Separator className="mb-6 bg-foreground/20" />
        <div className="mb-5 flex items-end justify-between gap-4">
          <span
            className="font-display text-3xl font-medium tracking-[-0.04em] text-foreground/15 sm:text-4xl"
            aria-hidden="true"
          >
            01
          </span>
          <FieldLabel htmlFor="edit-profile-avatar" className="text-label">
            photo
          </FieldLabel>
        </div>
      </div>

      <div className="flex items-start gap-4">
        <input
          id="edit-profile-avatar"
          ref={inputRef}
          name="avatar"
          type="file"
          accept="image/*"
          aria-describedby="edit-profile-avatar-hint"
          className="peer sr-only"
          disabled={disabled}
          onChange={onChange}
        />

        <FieldLabel
          htmlFor="edit-profile-avatar"
          className={cn(
            'relative size-32 shrink-0 cursor-pointer overflow-hidden rounded-none border border-border/70 bg-muted/40 p-0 transition-colors duration-200 sm:size-40',
            'hover:border-foreground/30',
            'peer-focus-visible:border-ring peer-focus-visible:ring-3 peer-focus-visible:ring-ring/50',
            disabled && 'pointer-events-none opacity-60',
          )}
        >
          <Avatar
            className="size-full rounded-none after:rounded-none"
            aria-hidden="true"
          >
            <AvatarImage
              src={preview ?? currentAvatar}
              alt=""
              className="rounded-none"
            />
            <AvatarBadge className="icon-box size-8! rounded-none bg-background text-foreground ring-0 right-1.5 bottom-1.5">
              <Camera
                className="size-3.5!"
                strokeWidth={1.5}
                aria-hidden="true"
              />
            </AvatarBadge>
          </Avatar>

          <span className="sr-only">Replace profile photo</span>
        </FieldLabel>

        <FieldContent className="min-h-32 justify-center gap-2 sm:min-h-40">
          <FieldDescription id="edit-profile-avatar-hint">
            tap the photo to replace it. uploads only when you save.
          </FieldDescription>

          {preview && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="h-11 w-fit px-0 text-[11px] tracking-caps uppercase"
              disabled={disabled}
              onClick={onRemove}
            >
              remove
            </Button>
          )}
          <FieldError className="min-h-4 text-[11px] leading-4">
            {error}
          </FieldError>
        </FieldContent>
      </div>
    </Field>
  );
};
