import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Input, InputPassword, Text } from '@smartech/ui';
import { Controller, useForm } from 'react-hook-form';
import { NavLink } from 'react-router-dom';
import { z } from 'zod';

import Page from '$/layouts/container';

const loginSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'Email address is required.' })
    .email({ message: 'Please enter a valid email address.' }),
  password: z.string().min(1, { message: 'Password is required.' }),
});

type LoginForm = z.infer<typeof loginSchema>;

function Login() {
  const { control, handleSubmit } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  });

  const onSubmit = (data: LoginForm) => {
    console.log(data);
  };

  return (
    <Page className="items-center justify-center bg-gray-100 p-4">
      <div className="flex max-h-full w-[400px] max-w-full flex-col justify-between gap-8 rounded-md bg-base-white p-6">
        <Text size="2xl" variant="bold">
          Sign in
        </Text>
        <div className="flex flex-col gap-4">
          <Controller
            control={control}
            name="email"
            render={({ field, fieldState: { invalid, error } }) => (
              <Input label="Email" error={invalid} hint={error?.message} {...field} />
            )}
          />
          <Controller
            control={control}
            name="password"
            render={({ field }) => <InputPassword label="Password" {...field} />}
          />
        </div>
        <Button variant="primary" size="xl" className="w-full" onClick={handleSubmit(onSubmit)}>
          Sign in
        </Button>
        <div className="flex w-full justify-center gap-1">
          <Text variant="regular" size="sm" className="leading-sm">
            Don't have an account?
          </Text>
          <NavLink to="/account/register" tabIndex={-1}>
            <Button variant="link" mode="color" size="sm" className="!rounded-none">
              Sign up
            </Button>
          </NavLink>
        </div>
      </div>
    </Page>
  );
}

export default Login;
