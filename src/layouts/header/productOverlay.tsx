import { Button, Text } from '@smartech/ui';

import { cn } from '@/common';
import { useSetProductParams } from '@/hooks';
import { Product } from '@/services/auth/types';

import classes from './header.module.scss';

interface HeaderProductContentProps {
  products: Product[];
  onClose: () => void;
}

interface HeaderProductTitleProps {
  name: string;
  open: boolean;
}

export const HeaderProductTitle = ({ name, open }: HeaderProductTitleProps) => {
  return (
    <Button
      variant="tertiary"
      leading="icon"
      icons={{ end: 'chevron-down' }}
      iconClassNames={{
        end: `rotate-${open ? 180 : 0} transition-transform`,
      }}
    >
      {name}
    </Button>
  );
};

export const HeaderProductContent = ({ products, onClose }: HeaderProductContentProps) => {
  const { setProduct, selectedProductId } = useSetProductParams();

  return (
    <div className={classes.headerProductSelector}>
      {products.map(({ id, name }) => (
        <div
          key={id}
          className={cn(classes.headerProductItem, {
            [classes.selected]: selectedProductId === id,
          })}
          onClick={() => {
            if (selectedProductId !== id) {
              setProduct(id);
            }
            onClose();
          }}
        >
          <Text className={cn('text-sm', { [classes.selectedText]: selectedProductId === id })}>
            {name}
          </Text>
        </div>
      ))}
    </div>
  );
};
