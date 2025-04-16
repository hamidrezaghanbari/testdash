import { IntrackError } from '@/services/helpers';

function prettyError(error: IntrackError) {
  return error.errors.map((err) => err.message.trim()).join('\n');
}

export { prettyError };
