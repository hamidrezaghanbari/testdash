import { Button, Icon, Input, InputPassword, Text, useNotify } from '@smartech/ui';
import { useMemo } from 'react';
import { Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';

import { prettyError } from '@/common';
import Page from '@/layouts/container';
import { useRegister } from '@/services/auth/hooks';
import { RegisterRequestPayload } from '@/services/auth/schema';
import { Render } from '@/utils';

import classes from './register.module.scss';

import { useRegisterForm } from './form';

function Register() {
  const { t } = useTranslation();

  const { handleSubmit, formState, control } = useRegisterForm();

  const [searchParams] = useSearchParams();

  const notify = useNotify();

  const token = useMemo(() => searchParams.get('token'), [searchParams]);

  const { mutate, isPending } = useRegister(token, {
    onSuccess() {
      notify.open({
        title: 'Register succeed',
        description: `User registered successfully`,
        type: 'success',
      });
    },
    onError(error) {
      notify.open({ title: 'Register failed', description: prettyError(error), type: 'error' });
    },
  });

  const onSubmit = (data: RegisterRequestPayload) => {
    mutate(data);
  };

  return (
    <Page className={classes.registerFormContainer}>
      <form className={classes.registerForm} onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-2">
          <Text size="2xl" variant="bold">
            {t('register.signup')}
          </Text>
          <Render when={!token}>
            <div className="flex items-center gap-2 rounded-md border border-error-300 bg-error-100 p-2">
              <Icon name="alert-triangle" className="text-error-600" />
              <Text className="text-sm text-error-600">Member invitee token is not found.</Text>
            </div>
          </Render>
        </div>
        <div className={classes.registerFormInputs}>
          <Controller
            control={control}
            name="firstName"
            render={({ field, fieldState: { invalid, error } }) => (
              <Input
                required
                disabled={!token}
                label={t('register.firstName')}
                error={invalid}
                hint={error?.message}
                {...field}
              />
            )}
          />
          <Controller
            control={control}
            name="lastName"
            render={({ field, fieldState: { invalid, error } }) => (
              <Input
                required
                disabled={!token}
                label={t('register.lastName')}
                error={invalid}
                hint={error?.message}
                {...field}
              />
            )}
          />
          <Controller
            control={control}
            name="phone"
            render={({ field, fieldState: { invalid, error } }) => (
              <Input
                required
                disabled={!token}
                label={t('register.phoneNumber')}
                autoComplete="mobile tel"
                placeholder="989121000000"
                error={invalid}
                hint={error?.message}
                {...field}
              />
            )}
          />
          <Controller
            control={control}
            name="inputPassword"
            render={({ field, fieldState: { invalid, error } }) => (
              <InputPassword
                required
                disabled={!token}
                autoComplete="new-password"
                label={t('register.password')}
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
          disabled={!token}
          spinning={formState.isSubmitting || isPending}
        >
          {t('register.signup')}
        </Button>
      </form>
    </Page>
  );
}

export default Register;
