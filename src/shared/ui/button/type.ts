import type { Children, Props } from 'core';

type ButtonTypes = 'submit' | 'reset' | 'button';
type ButtonVariants = 'filled' | 'link' | 'text';

export interface ButtonChildren extends Children {}

export interface ButtonProps extends Props {
  readonly label: string,

  classes?: string,
  disabled?: boolean,
  page?: string,
  type?: ButtonTypes,
  variant?: ButtonVariants,

  onClick?: (({}: Event) => Event) | (() => void),
}
