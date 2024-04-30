import type { Children, Props } from 'core';
import type { Text } from '../text';

export interface MenuItemChildren extends Children {
  text: Text,
}

export interface MenuItemProps extends Props {
  icon: string,
  label: string,
  onClick: () => void,
}
