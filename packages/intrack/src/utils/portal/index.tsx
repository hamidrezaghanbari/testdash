import { useMemo } from 'react';
import { createPortal } from 'react-dom';

interface PortalProps {
  children: React.ReactNode;
  selector: string | HTMLElement;
}

const Portal = ({ children, selector }: PortalProps) => {
  const container = useMemo(() => {
    if (typeof selector === 'string') {
      return document.querySelector(selector);
    }

    return selector;
  }, [selector]);

  if (!container) return null;

  return createPortal(children, container);
};

export { Portal };
