import { Button, Text, useNotify } from '@smartech/ui';
import { useTranslation } from 'react-i18next';

import { prettyError } from '@/common';
import { useTimer } from '@/hooks';
import { useResendPassword } from '@/services/auth/hooks';

interface VerificationCodeTimerProps {
  otpId: string;
}

const VerificationCodeTimer = ({ otpId }: VerificationCodeTimerProps) => {
  const { t } = useTranslation();

  const notify = useNotify();

  const { timer, isCounting, reset } = useTimer({
    immediate: true,
  });

  const { mutate, isPending } = useResendPassword({
    onSuccess() {
      reset(true);
    },
    onError(error) {
      notify.open({
        title: t('messages.resendCodeFailure'),
        description: prettyError(error),
        type: 'error',
      });
    },
  });

  if (isCounting) {
    return (
      <Text variant="regular" size="sm" className="text-gray-400">
        {timer}
      </Text>
    );
  }

  return (
    <Button
      variant="link"
      mode="color"
      size="sm"
      disabled={isPending}
      type="button"
      className="select-none"
      onClick={() => mutate({ otpId })}
    >
      {t('passwordVerification.resend')}
    </Button>
  );
};

export { VerificationCodeTimer };
