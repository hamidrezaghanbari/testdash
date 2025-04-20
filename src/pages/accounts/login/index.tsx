import { Button, Checkbox, Input, InputPassword, Text, useNotify } from '@smartech/ui';
import { Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { NavLink, useNavigate } from 'react-router-dom';

import { prettyError, trimObject } from '@/common';
import { useCheckCaptcha } from '@/hooks';
import Page from '@/layouts/container';
import { getCurrentUser } from '@/services/auth/handlers';
import { useLogin } from '@/services/auth/hooks';
import { LoginRequestInput } from '@/services/auth/schema';
import { useApplicationStore } from '@/store';
import { Render } from '@/utils';

import classes from './login.module.scss';

import { useLoginForm } from './form';

function Login() {
  const { t } = useTranslation();

  const { handleSubmit, formState, control } = useLoginForm();

  const navigate = useNavigate();

  const notify = useNotify();

  const { captchaToken, captchaEnabled, captchaImage } = useCheckCaptcha();

  const { mutate, isPending } = useLogin({
    async onSuccess() {
      const user = await getCurrentUser();
      if (user && user.login) {
        const { updateUser } = useApplicationStore.getState();

        updateUser(user);
        navigate('/', { viewTransition: true });
      }
    },
    onError(error) {
      notify.open({
        title: t('messages.unexpected'),
        description: prettyError(error),
        type: 'error',
      });
    },
  });

  const onSubmit = (data: Omit<LoginRequestInput, 'captchaToken'>) => {
    if (captchaEnabled && !captchaToken) {
      return notify.open({
        type: 'error',
        title: t('messages.captcha.title'),
        description: t('messages.captcha.description'),
      });
    }

    mutate(trimObject({ ...data, captchaToken }));
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
          <Render when={captchaEnabled && captchaImage}>
            <div className={classes.loginCaptchaContainer}>
              <div className={classes.loginCaptchaImage}>
                <img
                  src={captchaImage ?? ''}
                  alt="captcha code"
                  width="100%"
                  height="100%"
                  className={classes.loginCaptchaCode}
                />
              </div>
              <div className="flex h-full flex-1">
                <Controller
                  control={control}
                  name="captchaCode"
                  render={({ field, fieldState: { invalid } }) => (
                    <Input
                      placeholder="Enter captcha code"
                      required={captchaEnabled}
                      autoComplete="off"
                      error={invalid}
                      {...field}
                    />
                  )}
                />
              </div>
            </div>
          </Render>
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
