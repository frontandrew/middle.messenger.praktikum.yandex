import type { Children, Props } from 'core';

export interface DialogChildren extends Children {}

export interface DialogProps extends Props {
  openHandler?: () => void;
  closeHandler?: () => void;
  isOpen?: boolean,
  onClick?: () => void,
}
