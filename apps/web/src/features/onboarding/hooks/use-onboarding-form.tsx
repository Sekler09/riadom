import { zodResolver } from '@hookform/resolvers/zod';
import {
  OnboardingFormSchema,
  type OnboardingForm,
} from '@repo/contracts/onboarding';
import { useEffect, useRef, useState, type ChangeEvent } from 'react';
import { useForm } from 'react-hook-form';

import { useSessionQuery } from '@/features/auth/api/use-session-query';
import { useUploadImage } from '@/hooks/upload-image';
import { useOnboardUser } from '../api/use-user-onboard';
import { useNavigate } from '@tanstack/react-router';
import { paths } from '@/constants/paths';

const useOnboardingForm = () => {
  const avatarInputRef = useRef<HTMLInputElement>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarError, setAvatarError] = useState<string | null>(null);

  const { data: session } = useSessionQuery();
  const { mutateAsync: onboardUser } = useOnboardUser();
  const { mutateAsync: uploadImage } = useUploadImage();
  const navigate = useNavigate();

  const form = useForm<OnboardingForm>({
    resolver: zodResolver(OnboardingFormSchema),
    defaultValues: {
      name: '',
    },
  });

  useEffect(() => {
    return () => {
      if (avatarPreview) {
        URL.revokeObjectURL(avatarPreview);
      }
    };
  }, [avatarPreview]);

  useEffect(() => {
    const sessionName = session?.user?.name;
    if (!sessionName) {
      return;
    }

    if (!form.getValues('name')) {
      form.setValue('name', sessionName);
    }
  }, [session?.user?.name, form]);

  const handleAvatarChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    setAvatarFile(file);
    setAvatarError(null);
    setAvatarPreview((current) => {
      if (current) {
        URL.revokeObjectURL(current);
      }

      return URL.createObjectURL(file);
    });
  };

  const handleAvatarRemove = () => {
    setAvatarFile(null);
    setAvatarError(null);
    setAvatarPreview((current) => {
      if (current) {
        URL.revokeObjectURL(current);
      }

      return null;
    });

    if (avatarInputRef.current) {
      avatarInputRef.current.value = '';
    }
  };

  const onSubmit = form.handleSubmit(async (data) => {
    if (!avatarFile) {
      setAvatarError('required · so people can recognize you irl.');
      return;
    }

    const avatarKey = await uploadImage(avatarFile);

    await onboardUser({ ...data, avatarKey });

    navigate({ to: paths.profile });
  });

  return {
    form,
    onSubmit,
    avatarInputRef,
    avatarPreview,
    avatarError,
    handleAvatarChange,
    handleAvatarRemove,
  };
};

export { useOnboardingForm };
