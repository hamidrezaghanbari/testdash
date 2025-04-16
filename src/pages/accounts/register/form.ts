import { createFormHandler } from '@/common';
import { RegisterRequestInput, registerRequestSchema } from '@/services/auth/schema';

const useRegisterForm = createFormHandler<RegisterRequestInput>(
  { firstName: '', lastName: '', phone: '', inputPassword: '' },
  registerRequestSchema,
);

export { useRegisterForm };
