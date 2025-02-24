import { Button, Input, InputPassword, Text } from '@smartech/ui';
import { Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';

import Page from '$/layouts/container';

import './login.scss';

import { type LoginForm, useLoginForm } from './form';

function Login() {
  const { t } = useTranslation();

  const { handleSubmit, formState, control } = useLoginForm();

  const onSubmit = (data: LoginForm) => {
    // api call
    console.log(data);
  };

  return (
    <Page className="login-form-container">
      <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
        <Text size="2xl" variant="bold">
          {t('login.signin')}
        </Text>
        <div className="login-form-inputs">
          <Controller
            control={control}
            name="email"
            render={({ field, fieldState: { invalid, error } }) => (
              <Input
                label={t('login.email')}
                autoComplete="email"
                error={invalid}
                hint={error?.message}
                {...field}
              />
            )}
          />
          <Controller
            control={control}
            name="password"
            render={({ field }) => (
              <InputPassword
                label={t('login.password')}
                autoComplete="current-password"
                rules={{ min: 8 }}
                {...field}
              />
            )}
          />
        </div>
        <Button variant="primary" size="xl" className="w-full" spinning={formState.isSubmitting}>
          {t('login.signin')}
        </Button>
        <div className="login-form-register-hint">
          <Text variant="regular" size="sm" className="leading-sm">
            {t('login.hintAccount')}
          </Text>
          <NavLink to="/account/register" tabIndex={-1}>
            <Button variant="link" mode="color" size="sm" className="!rounded-none">
              {t('login.signup')}
            </Button>
          </NavLink>
        </div>
      </form>
    </Page>
  );
}

export default Login;
