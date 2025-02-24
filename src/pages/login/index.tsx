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
    console.log(data);
  };

  return (
    <Page className="login-form-container">
      <div className="login-form">
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
                type="email"
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
              <InputPassword label={t('login.password')} rules={{ min: 8 }} {...field} />
            )}
          />
        </div>
        <Button
          variant="primary"
          size="xl"
          className="w-full"
          spinning={formState.isSubmitting}
          onClick={handleSubmit(onSubmit)}
        >
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
      </div>
    </Page>
  );
}

export default Login;
