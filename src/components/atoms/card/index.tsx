import { Spinner, Text } from '@smartech/ui';
import { memo } from 'react';

import { cn, prefix } from '@/common';
import { Render } from '@/utils';

import './card.scss';

interface CardProps {
  children: React.ReactNode;
  title?: string;
  headerElements?: React.ReactNode;
  layout?: 'fit' | 'fill' | 'stretch';
  loading?: boolean;
  className?: string;
  noStyle?: boolean;
}

type LoadingCardProps = Pick<CardProps, 'children' | 'loading'>;

const LoadingCard: React.FC<LoadingCardProps> = ({ children, loading }) => {
  const fallback = (
    <div className="cardLoading">
      <Spinner spinning size="md" />
    </div>
  );

  if (loading) return fallback;

  return children;
};

const Card: React.FC<CardProps> = ({
  children,
  title,
  loading,
  headerElements = null,
  layout = 'fit',
  className,
  noStyle,
}) => {
  const element = <LoadingCard loading={loading}>{children}</LoadingCard>;

  return (
    <div
      className={cn('card', className, prefix(layout, 'layout'), {
        titled: !!(title || headerElements),
        noStyle,
      })}
    >
      <Render when={title || headerElements} fallback={element}>
        <div className="cardHeader">
          <Render when={title}>
            <Text variant="bold" className="cardTitle">
              {title}
            </Text>
          </Render>
          <Render when={headerElements}>{headerElements}</Render>
        </div>
        <div className="cardBody">{element}</div>
      </Render>
    </div>
  );
};

const MemoizedCard = memo(Card);

export { MemoizedCard as Card };
