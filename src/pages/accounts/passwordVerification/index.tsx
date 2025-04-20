import { Button, Input, InputPassword, Text, useNotify } from '@smartech/ui';
import { Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';

import { prettyError } from '@/common';
import { CONSTANTS } from '@/constants';
import Page from '@/layouts/container';
import { useChangePassword } from '@/services/auth/hooks';
import { Render } from '@/utils';

import classes from './verification.module.scss';

import { type PasswordVerificationPayload, usePasswordVerificationForm } from './form';
import { VerificationCodeTimer } from './timer';

interface PasswordLocationState {
  state: {
    otpId: string;
    userEmail: string;
  };
}

function PasswordVerification() {
  const { t } = useTranslation();

  const { handleSubmit, formState, control } = usePasswordVerificationForm();

  const { state } = useLocation() as PasswordLocationState;

  const navigate = useNavigate();

  const notify = useNotify();

  const { mutate, isPending } = useChangePassword({
    onSuccess() {
      sessionStorage.removeItem(CONSTANTS.OTP_TIME);

      notify.open({
        title: t('messages.passwordVerification.title'),
        description: t('messages.passwordVerification.description'),
        type: 'success',
      });

      navigate('/account/login', { viewTransition: true });
    },
    onError(error) {
      notify.open({
        title: t('messages.passwordVerification.failure'),
        description: prettyError(error),
        type: 'error',
      });
    },
  });

  const onSubmit = ({ newPassword, otpCode }: PasswordVerificationPayload) => {
    mutate({ newPassword, otpCode, ...state });
  };

  return (
    <Page className={classes.verificationFormContainer}>
      <form className={classes.verificationForm} onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-2">
          <Text size="2xl" variant="bold">
            {t('passwordVerification.resetPasswordVerification')}
          </Text>
          <Render when={state.userEmail}>
            <div className={classes.verificationEmailHint}>
              <Text size="sm" variant="regular">
                {t('passwordVerification.codeSentTo')}
              </Text>
              <Text size="sm" variant="medium">
                {state.userEmail}
              </Text>
            </div>
          </Render>
        </div>
        <div className={classes.verificationFormInputs}>
          <Controller
            control={control}
            name="otpCode"
            render={({ field, fieldState: { invalid, error } }) => (
              <Input
                required
                label={t('passwordVerification.verificationCode')}
                autoComplete="one-time-code"
                error={invalid}
                hint={error?.message}
                trailing={<VerificationCodeTimer otpId={state.otpId} />}
                {...field}
              />
            )}
          />
          <Controller
            control={control}
            name="newPassword"
            render={({ field, fieldState: { invalid, error } }) => (
              <InputPassword
                required
                autoComplete="new-password"
                label={t('passwordVerification.passwordLabel')}
                error={invalid}
                hint={error?.message}
                {...field}
              />
            )}
          />
          <Controller
            control={control}
            name="confirmPassword"
            render={({ field, fieldState: { invalid, error } }) => (
              <InputPassword
                required
                autoComplete="new-password"
                label={t('passwordVerification.confirmedPasswordLabel')}
                error={invalid}
                hint={error?.message}
                {...field}
              />
            )}
          />
        </div>

        <Button
          variant="primary"
          size="xl"
          className="w-full"
          spinning={formState.isSubmitting || isPending}
        >
          {t('passwordVerification.changePassword')}
        </Button>
      </form>
    </Page>
  );
}

export default PasswordVerification;
