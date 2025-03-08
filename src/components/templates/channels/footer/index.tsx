import { Button } from '@smartech/ui';
import { memo } from 'react';

import classes from './footer.module.scss';

interface ChannelFooterProps {
  index: number;
  next(): void;
  back(): void;
}

const ChannelFooter = ({ index, next, back }: ChannelFooterProps) => {
  return (
    <div className={classes.channelFooterContainer}>
      <Button
        variant="secondary"
        className={classes.channelFooterAction}
        disabled={index === 0}
        onClick={back}
      >
        Back
      </Button>
      <Button variant="primary" className={classes.channelFooterAction} onClick={next}>
        Continue
      </Button>
    </div>
  );
};

const MemoizedFooter = memo(ChannelFooter);

export { MemoizedFooter as ChannelFooter };
