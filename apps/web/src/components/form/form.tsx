import type { ComponentProps } from 'react';
import {
  FormProvider,
  type FieldValues,
  type UseFormReturn,
} from 'react-hook-form';

type FormProps<TFieldValues extends FieldValues> = ComponentProps<'form'> & {
  form: UseFormReturn<TFieldValues>;
};

const Form = <TFieldValues extends FieldValues>({
  form,
  onSubmit,
  children,
  noValidate = true,
  ...props
}: FormProps<TFieldValues>) => {
  return (
    <FormProvider {...form}>
      <form onSubmit={onSubmit} noValidate={noValidate} {...props}>
        {children}
      </form>
    </FormProvider>
  );
};

export { Form };
export type { FormProps };
