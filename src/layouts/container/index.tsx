import { motion } from 'motion/react';
import { memo } from 'react';

import { cn } from '$/common';

interface PageProps {
  children: React.ReactNode;
  className?: string;
}

const variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
};

const Page = ({ children, className }: PageProps) => {
  return (
    <motion.div
      initial="initial"
      animate="animate"
      variants={variants}
      className={cn('flex w-full flex-1 overflow-auto bg-gray-100', className)}
      transition={{ ease: 'easeInOut' }}
    >
      {children}
    </motion.div>
  );
};

export default memo(Page);
