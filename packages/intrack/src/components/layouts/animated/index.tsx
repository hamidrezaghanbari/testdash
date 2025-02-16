import { motion } from 'motion/react';

import { cn } from '$/common';

interface AnimatedPageProps {
  children: React.ReactNode;
  className?: string;
}

const variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
};

const AnimatedPage = ({ children, className }: AnimatedPageProps) => {
  return (
    <motion.div
      initial="initial"
      animate="animate"
      variants={variants}
      className={cn('bg-base-white flex w-full flex-1 overflow-auto', className)}
      transition={{ ease: 'easeInOut' }}
    >
      {children}
    </motion.div>
  );
};

export { AnimatedPage };
