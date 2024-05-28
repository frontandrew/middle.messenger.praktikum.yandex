import type { Children, Props } from 'core';

export interface DialogChildren extends Children {}

export interface DialogProps extends Props {
  isOpen?: boolean,
  onClick?: () => void,
}
