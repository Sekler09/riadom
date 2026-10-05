import { Field, FieldDescription, FieldError } from '@repo/ui/components/field';
import { createContext, useContext, useId, type ReactNode } from 'react';
import {
  Controller,
  useFormContext,
  type ControllerRenderProps,
  type FieldError as RhfFieldError,
  type FieldPath,
  type FieldValues,
} from 'react-hook-form';

type FormFieldControlProps = {
  id: string;
  'aria-invalid'?: boolean;
  'aria-describedby'?: string;
  'aria-required'?: boolean;
};

type FormFieldContextValue = {
  id: string;
  name: string;
  descriptionId: string;
  errorId: string;
  error?: RhfFieldError;
};

const FormFieldContext = createContext<FormFieldContextValue | null>(null);

const useFormField = () => {
  const context = useContext(FormFieldContext);

  if (!context) {
    throw new Error('useFormField must be used within a FormField');
  }

  return context;
};

type FormFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  name: TName;
  label?: ReactNode;
  description?: ReactNode;
  required?: boolean;
  className?: string;
  descriptionClassName?: string;
  errorClassName?: string;
  children: (
    field: ControllerRenderProps<TFieldValues, TName>,
    controlProps: FormFieldControlProps,
  ) => ReactNode;
};

const FormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  name,
  label,
  description,
  required = false,
  className,
  descriptionClassName,
  errorClassName,
  children,
}: FormFieldProps<TFieldValues, TName>) => {
  const { control } = useFormContext<TFieldValues>();
  const reactId = useId();
  const id = `${String(name)}-${reactId}`;
  const descriptionId = `${id}-description`;
  const errorId = `${id}-error`;

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => {
        const invalid = !!fieldState.error;
        const describedBy = [
          description ? descriptionId : null,
          fieldState.error ? errorId : null,
        ]
          .filter(Boolean)
          .join(' ');

        const controlProps: FormFieldControlProps = {
          id,
          ...(invalid ? { 'aria-invalid': true } : {}),
          ...(describedBy ? { 'aria-describedby': describedBy } : {}),
          ...(required ? { 'aria-required': true } : {}),
        };

        return (
          <FormFieldContext.Provider
            value={{
              id,
              name: String(name),
              descriptionId,
              errorId,
              error: fieldState.error,
            }}
          >
            <Field data-invalid={invalid || undefined} className={className}>
              {label}
              {children(field, controlProps)}
              {description ? (
                <FieldDescription
                  id={descriptionId}
                  className={descriptionClassName}
                >
                  {description}
                </FieldDescription>
              ) : null}
              <FieldError id={errorId} className={errorClassName}>
                {fieldState.error?.message}
              </FieldError>
            </Field>
          </FormFieldContext.Provider>
        );
      }}
    />
  );
};

export { FormField, useFormField };
export type { FormFieldControlProps, FormFieldProps };
