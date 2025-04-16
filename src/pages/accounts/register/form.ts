import { createFormHandler } from '@/common';
import { RegisterRequestPayload, registerRequestSchema } from '@/services/auth/schema';

const useRegisterForm = createFormHandler<RegisterRequestPayload>(
  { firstName: '', lastName: '', phone: '', inputPassword: '' },
  registerRequestSchema,
);

export { useRegisterForm };
