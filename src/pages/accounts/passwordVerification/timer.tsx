import { Button, Text, useNotify } from '@smartech/ui';
import { useTranslation } from 'react-i18next';

import { useTimer } from '@/hooks';
import { resendPassword } from '@/services/auth/resend';

interface VerificationCodeTimerProps {
  otpId: string;
}

const VerificationCodeTimer = ({ otpId }: VerificationCodeTimerProps) => {
  const { t } = useTranslation();

  const notify = useNotify();

  const { timer, isCounting, reset } = useTimer({
    immediate: true,
  });

  const { mutate, isPending } = resendPassword.use({
    onSuccess() {
      reset(true);
    },
    onError(error) {
      notify.open({
        title: 'Resend code failed',
        description: error.errors.map((err) => err.message).join('\n'),
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
