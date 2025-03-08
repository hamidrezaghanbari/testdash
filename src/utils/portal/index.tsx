import { useLayoutEffect, useState } from 'react';
import { createPortal } from 'react-dom';

interface PortalProps {
  children: React.ReactNode;
  selector: string | HTMLElement | null;
}

const Portal = ({ children, selector }: PortalProps) => {
  const [container, setContainer] = useState<HTMLElement | null>(null);

  useLayoutEffect(() => {
    setContainer(
      typeof selector === 'string' ? document.querySelector<HTMLElement>(selector) : selector,
    );
  }, [selector]);

  if (!container) return null;

  return createPortal(children, container);
};

export { Portal };
