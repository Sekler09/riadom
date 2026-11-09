import { zodResolver } from '@hookform/resolvers/zod';
import type { EditProfileForm } from '@repo/contracts/profile';
import { EditProfileFormSchema } from '@repo/contracts/profile';
import { useNavigate } from '@tanstack/react-router';
import { useForm } from 'react-hook-form';
import { toast } from '@repo/ui/components/sonner';

import { paths } from '@/constants/paths';
import { useUploadImage } from '@/hooks/upload-image';
import { useImageInput } from '@/hooks/use-image-input';
import { useUnsavedChangesGuard } from '@/hooks/use-unsaved-changes-guard';
import { useEditProfile } from '../api/use-edit-profile';
import { useMyProfile } from '../api/use-my-profile';

const useEditProfileForm = () => {
  const { data: profile } = useMyProfile();
  const avatar = useImageInput();
  const navigate = useNavigate();
  const { mutateAsync: editProfile } = useEditProfile();
  const { mutateAsync: uploadImage } = useUploadImage();

  const form = useForm<EditProfileForm>({
    resolver: zodResolver(EditProfileFormSchema),
    defaultValues: {
      name: profile.name,
    },
  });

  const isSubmitting = form.formState.isSubmitting;
  const isDirty = form.formState.isDirty || avatar.imageFile !== null;

  const blocker = useUnsavedChangesGuard(isDirty);

  const onSubmit = form.handleSubmit(async ({ name }) => {
    let avatarKey = profile.avatarKey;

    if (avatar.imageFile) {
      avatarKey = await uploadImage(avatar.imageFile);
    }

    try {
      await editProfile({ name, avatarKey });

      avatar.handleImageRemove();
      form.reset({ name });
      toast.success('profile saved');
      navigate({ to: paths.profile, ignoreBlocker: true });
    } catch {
      toast.error('could not save — your edits are still here');
    }
  });

  return {
    form,
    onSubmit,
    isDirty,
    isSubmitting,
    blocker,
    ...avatar,
  };
};

export { useEditProfileForm };
