import { Button, Input, Text, useNotify } from '@smartech/ui';
import { Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import Page from '@/layouts/container';
import { resetPassword } from '@/services/auth';
import { ResetPasswordRequestPayload } from '@/services/auth/resetPassword/resetPassword.schema';

import classes from './reset.module.scss';

import { useResetPasswordForm } from './form';

function ResetPassword() {
  const { t } = useTranslation();

  const navigate = useNavigate();

  const { handleSubmit, formState, control } = useResetPasswordForm();

  const notify = useNotify();

  const { mutate, isPending } = resetPassword.use({
    onSuccess(otpId, { userEmail }) {
      if (otpId) {
        notify.open({
          title: 'Reset password',
          description: `A code was sent to ${userEmail}`,
          type: 'success',
        });

        navigate('/account/passwordVerification', {
          state: { otpId, userEmail },
          viewTransition: true,
        });
      }
    },
  });

  const onSubmit = (data: ResetPasswordRequestPayload) => {
    mutate(data);
  };

  return (
    <Page className={classes.resetFormContainer}>
      <form className={classes.resetForm} onSubmit={handleSubmit(onSubmit)}>
        <Text size="2xl" variant="bold">
          {t('resetPassword.reset')}
        </Text>
        <div className={classes.resetFormInputs}>
          <Controller
            control={control}
            name="userEmail"
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
        <Button
          variant="primary"
          size="xl"
          className="w-full"
          spinning={formState.isSubmitting || isPending}
        >
          {t('resetPassword.sendVerificationCode')}
        </Button>
      </form>
    </Page>
  );
}

export default ResetPassword;
