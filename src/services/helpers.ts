import { UseMutationOptions } from '@tanstack/react-query';

interface ErrorStack {
  key: string;
  message: string;
}

interface IntrackError {
  status: string;
  errors: ErrorStack[];
}

type RequestOptions<Response, Error = IntrackError, Payload = void> = Omit<
  UseMutationOptions<Response, Error, Payload>,
  'mutationKey' | 'mutationFn'
>;

export type { IntrackError, RequestOptions };
