import { Button, Checkbox, Input, InputPassword, Text, useNotify } from '@smartech/ui';
import { Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { NavLink, useNavigate } from 'react-router-dom';

import Page from '@/layouts/container';
import { login } from '@/services/auth';
import { LoginRequestPayload } from '@/services/auth/login/login.schema';

import classes from './login.module.scss';

import { useLoginForm } from './form';

function Login() {
  const { t } = useTranslation();

  const { handleSubmit, formState, control } = useLoginForm();

  const navigate = useNavigate();

  const notify = useNotify();

  const { mutate, isPending } = login.use({
    async onSuccess() {
      login.onSuccess(() => {
        navigate('/', { viewTransition: true });
      });
    },
    onError(error) {
      notify.open({
        type: 'error',
        title: 'An unexpected error was occured',
        description: error.errors.map((err) => err.message).join('\n'),
      });
    },
  });

  const onSubmit = (data: LoginRequestPayload) => {
    mutate(data);
  };

  return (
    <Page className={classes.loginFormContainer}>
      <form className={classes.loginForm} onSubmit={handleSubmit(onSubmit)}>
        <Text size="2xl" variant="bold">
          {t('login.signin')}
        </Text>
        <div className={classes.loginFormInputs}>
          <Controller
            control={control}
            name="username"
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
          <div className={classes.loginFormActions}>
            <Controller
              control={control}
              name="rememberMe"
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
              <Button variant="link" mode="color" size="sm" type="button">
                {t('login.resetPassword')}
              </Button>
            </NavLink>
          </div>
        </div>

        <Button
          variant="primary"
          size="xl"
          className="w-full"
          spinning={formState.isSubmitting || isPending}
        >
          {t('login.signin')}
        </Button>
      </form>
    </Page>
  );
}

export default Login;
