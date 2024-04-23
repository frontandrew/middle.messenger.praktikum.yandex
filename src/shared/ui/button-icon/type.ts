import type { Children, Props } from 'core';

type ButtonIconVariants = 'filled' | 'transparent';

export interface ButtonIconChildren extends Children {}

export interface ButtonIconProps extends Props {
  pic?: string,
  page?: string,
  classes?: string,
  variant?: ButtonIconVariants,
  disabled?: boolean,

  onClick?: (({}: Event) => Event) | (() => void),
}
