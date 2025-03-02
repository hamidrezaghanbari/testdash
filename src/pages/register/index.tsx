import { Button, Input, InputPassword, Text } from '@smartech/ui';
import { Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import Page from '$/layouts/container';

import './register.scss';

import { type RegisterForm, useRegisterForm } from './form';

function Register() {
  const { t } = useTranslation();

  const { handleSubmit, formState, control } = useRegisterForm();

  const onSubmit = (data: RegisterForm) => {
    // api call
    console.log(data);
  };

  return (
    <Page className="registerFormContainer">
      <form className="registerForm" onSubmit={handleSubmit(onSubmit)}>
        <Text size="2xl" variant="bold">
          {t('register.signup')}
        </Text>
        <div className="registerFormInputs">
          <Controller
            control={control}
            name="firstName"
            render={({ field, fieldState: { invalid, error } }) => (
              <Input
                required
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
                label={t('register.lastName')}
                error={invalid}
                hint={error?.message}
                {...field}
              />
            )}
          />
          <Controller
            control={control}
            name="phoneNumber"
            render={({ field, fieldState: { invalid, error } }) => (
              <Input
                required
                label={t('register.phoneNumber')}
                placeholder="989121000000"
                error={invalid}
                hint={error?.message}
                {...field}
              />
            )}
          />
          <Controller
            control={control}
            name="password"
            render={({ field, fieldState: { invalid, error } }) => (
              <InputPassword
                required
                autoComplete="new-password"
                label={t('register.password')}
                error={invalid}
                hint={error?.message}
                {...field}
              />
            )}
          />
        </div>

        <Button variant="primary" size="xl" className="w-full" spinning={formState.isSubmitting}>
          {t('register.signup')}
        </Button>
      </form>
    </Page>
  );
}

export default Register;
