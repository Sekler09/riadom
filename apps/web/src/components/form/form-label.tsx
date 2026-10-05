import { FieldLabel } from '@repo/ui/components/field';
import type { ComponentProps } from 'react';

import { useFormField } from '@/components/form/form-field';

type FormLabelProps = ComponentProps<typeof FieldLabel>;

const FormLabel = ({ className, ...props }: FormLabelProps) => {
  const { id } = useFormField();

  return <FieldLabel htmlFor={id} className={className} {...props} />;
};

export { FormLabel };
export type { FormLabelProps };
