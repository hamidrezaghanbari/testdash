import { Button, Input, InputPassword, Text } from '@smartech/ui';
import { Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { useTimer } from '$/hooks';
import Page from '$/layouts/container';

import './passwordVerification.scss';

import { type PasswordVerificationForm, usePasswordVerificationForm } from './form';

const VerificationCodeTimer = () => {
  const { t } = useTranslation();

  const { timer, isCounting, reset } = useTimer({
    immediate: true,
    onReset() {
      // verification code api call
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
    <Button variant="link" mode="color" size="sm" onClick={() => reset(true)}>
      {t('passwordVerification.resend')}
    </Button>
  );
};

function PasswordVerification() {
  const { t } = useTranslation();

  const { handleSubmit, formState, control } = usePasswordVerificationForm();

  const onSubmit = (data: PasswordVerificationForm) => {
    // api call
    console.log(data);
  };

  return (
    <Page className="passwordVerificationFormContainer">
      <form className="passwordVerificationForm" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-2">
          <Text size="2xl" variant="bold">
            {t('passwordVerification.resetPasswordVerification')}
          </Text>
          <Text size="sm" variant="regular">
            {t('passwordVerification.codeSentTo', { email: 'alireza.h@smartech.ir' })}
          </Text>
        </div>
        <div className="passwordVerificationFormInputs">
          <Controller
            control={control}
            name="code"
            render={({ field, fieldState: { invalid, error } }) => (
              <Input
                required
                label={t('passwordVerification.verificationCode')}
                error={invalid}
                hint={error?.message}
                trailing={<VerificationCodeTimer />}
                {...field}
              />
            )}
          />
          <Controller
            control={control}
            name="password"
            render={({ field }) => (
              <InputPassword
                required
                autoComplete="new-password"
                label={t('passwordVerification.passwordLabel')}
                {...field}
              />
            )}
          />
          <Controller
            control={control}
            name="confirmPassword"
            render={({ field }) => (
              <InputPassword
                required
                autoComplete="new-password"
                label={t('passwordVerification.confirmedPasswordLabel')}
                {...field}
              />
            )}
          />
        </div>

        <Button variant="primary" size="xl" className="w-full" spinning={formState.isSubmitting}>
          {t('passwordVerification.changePassword')}
        </Button>
      </form>
    </Page>
  );
}

export default PasswordVerification;
