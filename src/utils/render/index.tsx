import isFunction from 'lodash-es/isFunction';
import { Fragment } from 'react';

interface RenderProps<T> {
  children: React.ReactNode | ((result: NonNullable<T>) => React.ReactNode);
  fallback?: React.ReactNode;
  when: T;
}

const Render = <T,>({ children, when, fallback = null }: RenderProps<T>) => {
  return (
    <Fragment>{when ? (isFunction(children) ? children(when) : children) : fallback}</Fragment>
  );
};

export { Render };
