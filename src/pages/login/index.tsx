import { Button, Checkbox, Input, InputPassword, Text } from '@smartech/ui';
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
    <Page className="loginFormContainer">
      <form className="loginForm" onSubmit={handleSubmit(onSubmit)}>
        <Text size="2xl" variant="bold">
          {t('login.signin')}
        </Text>
        <div className="loginFormInputs">
          <Controller
            control={control}
            name="email"
            render={({ field, fieldState: { invalid, error } }) => (
              <Input
                required
                label={t('login.email')}
                placeholder="example@example.com"
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
            render={({ field, fieldState: { invalid, error } }) => (
              <InputPassword
                required
                label={t('login.password')}
                autoComplete="current-password"
                error={invalid}
                hint={error?.message}
                {...field}
              />
            )}
          />
          <div className="loginFormActions">
            <Controller
              control={control}
              name="remember"
              render={({ field }) => (
                <Checkbox
                  label={t('login.remember')}
                  size="sm"
                  onChange={field.onChange}
                  checked={field.value}
                />
              )}
            />
            <NavLink to="/account/resetPassword" viewTransition tabIndex={-1}>
              <Button variant="link" mode="color" size="sm">
                {t('login.resetPassword')}
              </Button>
            </NavLink>
          </div>
        </div>

        <Button variant="primary" size="xl" className="w-full" spinning={formState.isSubmitting}>
          {t('login.signin')}
        </Button>
      </form>
    </Page>
  );
}

export default Login;
