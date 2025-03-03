import { Text, TextProps } from '@smartech/ui';
import { memo, useId } from 'react';
import { useCountUp } from 'react-countup';

interface CounterProps extends TextProps {
  value: number;
}

const Counter: React.FC<CounterProps> = ({ value, ...props }) => {
  const id = useId();

  useCountUp({ ref: id, startOnMount: true, end: value });

  return <Text id={id} {...props} />;
};

const MemoizedCounter = memo(Counter);

export { MemoizedCounter as Counter };
