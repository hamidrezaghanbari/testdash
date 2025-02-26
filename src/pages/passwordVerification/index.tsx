import { Button, Input, InputPassword, Text } from '@smartech/ui';
import { Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import Page from '$/layouts/container';

import './passwordVerification.scss';

import { type PasswordVerificationForm, usePasswordVerificationForm } from './form';

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
                trailing={
                  <Text variant="regular" size="sm" className="text-gray-400">
                    3:00
                  </Text>
                }
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
