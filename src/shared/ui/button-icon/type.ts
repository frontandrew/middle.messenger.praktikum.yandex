import type { Children, Props } from 'core';
import type { ButtonTypes } from '../button/type';

type ButtonIconVariants = 'filled' | 'transparent';

export interface ButtonIconChildren extends Children {}

export interface ButtonIconProps extends Props {
  tabindex?: number;
  autofocus?: boolean;
  pic?: string;
  classes?: string;
  variant?: ButtonIconVariants;
  disabled?: boolean;
  type?: ButtonTypes;

  onClick?: (({}: Event) => Event) | (() => void);
}
