import { Variants } from 'motion/react';

const sidebarVariants: Variants = {
  initial: {
    opacity: 0,
    height: 0,
  },
  animate: {
    opacity: 1,
    height: 'auto',
    transition: {
      type: 'tween',
      duration: 0.25,
      ease: [0.4, 0, 0.2, 1],
    },
  },
  exit: {
    opacity: 0,
    height: 0,
    transition: {
      type: 'tween',
      duration: 0.25,
      ease: [0.4, 0, 0.2, 1],
    },
  },
};

export { sidebarVariants };
