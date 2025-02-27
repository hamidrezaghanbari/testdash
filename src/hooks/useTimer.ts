import { useEffect } from 'react';

import { CONSTANTS } from '$/constants';

import { useCounter } from './useCounter';

const DURATION = 15; /* 3 minutes */

interface UseTimerOptions {
  immediate?: boolean;
  onReset?: () => void;
}

const useTimer = ({ immediate, onReset }: UseTimerOptions = {}) => {
  const options = useCounter({
    duration: DURATION,
    local: CONSTANTS.OTP_TIME,
    onReset,
  });

  useEffect(() => {
    if (immediate) options.start();
  }, [immediate, options]);

  return options;
};

export { useTimer };
