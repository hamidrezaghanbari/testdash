import { Button, Input, Text } from '@smartech/ui';
import { Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import Page from '$/layouts/container';

import './resetPassword.scss';

import { type ResetPasswordForm, useResetPasswordForm } from './form';

function ResetPassword() {
  const { t } = useTranslation();

  const navigate = useNavigate();

  const { handleSubmit, formState, control } = useResetPasswordForm();

  const onSubmit = (data: ResetPasswordForm) => {
    // api call
    console.info(data);

    navigate('/account/passwordVerification');
  };

  return (
    <Page className="resetPasswordFormContainer">
      <form className="resetPasswordForm" onSubmit={handleSubmit(onSubmit)}>
        <Text size="2xl" variant="bold">
          {t('resetPassword.reset')}
        </Text>
        <div className="resetPasswordFormInputs">
          <Controller
            control={control}
            name="email"
            render={({ field, fieldState: { invalid, error } }) => (
              <Input
                required
                label={t('resetPassword.email')}
                placeholder="example@example.com"
                autoComplete="email"
                error={invalid}
                hint={error?.message}
                {...field}
              />
            )}
          />
        </div>
        <Button variant="primary" size="xl" className="w-full" spinning={formState.isSubmitting}>
          {t('resetPassword.sendVerificationCode')}
        </Button>
      </form>
    </Page>
  );
}

export default ResetPassword;
