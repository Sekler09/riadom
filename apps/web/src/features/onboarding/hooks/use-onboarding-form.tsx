import { zodResolver } from '@hookform/resolvers/zod';
import {
  OnboardingFormSchema,
  type OnboardingForm,
} from '@repo/contracts/onboarding';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { useSessionQuery } from '@/features/auth/api/use-session-query';
import { useUploadImage } from '@/hooks/upload-image';
import { useOnboardUser } from '../api/use-user-onboard';
import { useNavigate } from '@tanstack/react-router';
import { paths } from '@/constants/paths';
import { useImageInput } from '@/hooks/use-image-input';

const useOnboardingForm = () => {
  const { data: session } = useSessionQuery();
  const { mutateAsync: onboardUser } = useOnboardUser();
  const { mutateAsync: uploadImage } = useUploadImage();
  const avatar = useImageInput();
  const navigate = useNavigate();

  const form = useForm<OnboardingForm>({
    resolver: zodResolver(OnboardingFormSchema),
    defaultValues: {
      name: '',
    },
  });

  useEffect(() => {
    const sessionName = session?.user?.name;
    if (!sessionName) {
      return;
    }

    if (!form.getValues('name')) {
      form.setValue('name', sessionName);
    }
  }, [session?.user?.name, form]);

  const onSubmit = form.handleSubmit(async (data) => {
    if (!avatar.imageFile) {
      avatar.setImageError('required · so people can recognize you irl.');
      return;
    }

    const avatarKey = await uploadImage(avatar.imageFile);

    await onboardUser({ ...data, avatarKey });

    navigate({ to: paths.profile });
  });

  return {
    form,
    onSubmit,
    avatarInputRef: avatar.imageInputRef,
    avatarPreview: avatar.imagePreview,
    avatarError: avatar.imageError,
    handleAvatarChange: avatar.handleImageChange,
    handleAvatarRemove: avatar.handleImageRemove,
  };
};

export { useOnboardingForm };
