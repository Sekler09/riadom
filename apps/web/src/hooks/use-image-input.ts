import type { ChangeEvent } from 'react';
import { useEffect, useRef, useState } from 'react';

export const useImageInput = () => {
  const imageInputRef = useRef<HTMLInputElement>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageError, setImageError] = useState<string | null>(null);

  useEffect(() => {
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    setImageFile(file);
    setImageError(null);
    setImagePreview((current) => {
      if (current) {
        URL.revokeObjectURL(current);
      }

      return URL.createObjectURL(file);
    });
  };

  const handleImageRemove = () => {
    setImageFile(null);
    setImageError(null);
    setImagePreview((current) => {
      if (current) {
        URL.revokeObjectURL(current);
      }

      return null;
    });

    if (imageInputRef.current) {
      imageInputRef.current.value = '';
    }
  };

  return {
    imageInputRef,
    imageFile,
    imagePreview,
    imageError,
    setImageError,
    handleImageChange,
    handleImageRemove,
  };
};
