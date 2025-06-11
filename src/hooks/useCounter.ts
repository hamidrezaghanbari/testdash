import { useCallback, useEffect, useRef, useState } from 'react';

interface UseCounterOptions {
  /**
   * in seconds
   */
  duration: number;
  local?: string;
  onReset?: () => void;
}

function pad(input: number) {
  return input.toString().padStart(2, '0');
}

function getTimer(milliseconds: number) {
  const totalSeconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  return `${pad(minutes)}:${pad(seconds)}`;
}

function useCounter({ duration, local, onReset }: UseCounterOptions) {
  const [count, setCount] = useState<number>(() => {
    const storedCount = local ? sessionStorage.getItem(local) : null;

    return storedCount ? Number(storedCount) : duration;
  });

  const [isCounting, setIsCounting] = useState<boolean>(() => {
    const storedCount = local ? sessionStorage.getItem(local) : null;

    return !!storedCount && Number(storedCount) > 0 && Number(storedCount) < duration;
  });

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const start = useCallback(() => {
    if (count > 0 && !isCounting) setIsCounting(true);
  }, [count, isCounting]);

  const reset = useCallback(
    (startAfterReset = true) => {
      if (isCounting) return;

      setCount(duration);

      setIsCounting(startAfterReset);

      if (local) sessionStorage.setItem(local, duration.toString());

      if (onReset) onReset();
    },
    [duration, local, isCounting, onReset],
  );

  useEffect(() => {
    if (isCounting && count > 0) {
      intervalRef.current = setInterval(() => {
        setCount((prevCount) => prevCount - 1);
      }, 1000);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isCounting, count]);

  useEffect(() => {
    if (count === 0) {
      setIsCounting(false);

      if (local) sessionStorage.removeItem(local);

      if (intervalRef.current) clearInterval(intervalRef.current);
    } else {
      if (local) sessionStorage.setItem(local, count.toString());
    }
  }, [count, local]);

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const timer = getTimer(count * 1000);

  return { count, timer, start, reset, isCounting };
}

export { useCounter };
