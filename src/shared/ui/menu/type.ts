import type { Children, Props } from 'core';
import type { MenuItem, MenuItemProps } from '../menu-item';

export interface MenuChildren extends Children {
  [key: string]: MenuItem,
}

export interface MenuProps extends Props {
  readonly keys: string,
  readonly position: {
    top?: number,
    right?: number,
    bottom?: number,
    left?:number,
  },

  itemsProps: MenuItemProps[],
  visible: boolean,
  onClick: () => void,
}
