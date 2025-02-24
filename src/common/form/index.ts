import { zodResolver } from '@hookform/resolvers/zod';
import { DefaultValues, FieldValues, UseFormProps, useForm } from 'react-hook-form';
import { z } from 'zod';

function createFormHandler<T extends FieldValues>(
  defaultValues: DefaultValues<T>,
  schema: z.ZodSchema<T>,
) {
  return function (mode?: UseFormProps<T>['mode']) {
    return useForm<z.infer<z.ZodSchema<T>>>({
      mode,
      defaultValues,
      resolver: zodResolver(schema, { async: true }),
    });
  };
}

export { createFormHandler };
