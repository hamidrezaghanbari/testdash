import { UseMutationOptions } from '@tanstack/react-query';

type RequestOptions<Response, Error, Payload = void> = Omit<
  UseMutationOptions<Response, Error, Payload>,
  'mutationKey' | 'mutationFn'
>;

interface ErrorStack {
  key: string;
  message: string;
}

interface IntrackError {
  status: string;
  errors: ErrorStack[];
}

export type { IntrackError, RequestOptions };
